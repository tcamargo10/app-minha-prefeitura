import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { citizenService } from '@/services/citizenService';
import { supabase } from '@/utils/supabase';

export interface City {
  id: string;
  name: string;
  state: string;
  code: string;
}

interface CityContextType {
  currentCity: City | null;
  setCurrentCity: (city: City) => void;
  availableCities: City[];
  loading: boolean;
  error: string | null;
  refreshCities: () => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar cidades do usuário baseadas nos endereços cadastrados
  const loadUserCities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se há usuário logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Se não há usuário logado, usar cidades padrão ou vazio
        setAvailableCities([]);
        setCurrentCity(null);
        return;
      }

      // Buscar cidadão pelo email
      const citizen = await citizenService.getCitizenByEmail(user.email);

      if (!citizen) {
        setAvailableCities([]);
        setCurrentCity(null);
        return;
      }

      // Buscar endereços do cidadão
      const addresses = await citizenService.getCitizenAddresses(citizen.id);

      if (!addresses || addresses.length === 0) {
        setAvailableCities([]);
        setCurrentCity(null);
        return;
      }

      // Buscar informações das cidades/municípios
      const cityPromises = addresses.map(async address => {
        const { data: municipality, error } = await supabase
          .from('municipalities')
          .select('id, city, state')
          .eq('id', address.municipality_id)
          .eq('active', true)
          .single();

        if (error || !municipality) {
          return null;
        }

        return {
          id: municipality.id,
          name: municipality.city,
          state: municipality.state,
          code:
            municipality.state +
            municipality.city.substring(0, 3).toUpperCase(),
        };
      });

      const cities = (await Promise.all(cityPromises)).filter(
        Boolean
      ) as City[];

      setAvailableCities(cities);

      // Definir cidade atual (priorizar endereço principal, senão primeira da lista)
      if (cities.length > 0) {
        // Buscar endereço principal do usuário
        const primaryAddress = addresses.find(addr => addr.is_primary);

        if (primaryAddress) {
          // Encontrar a cidade correspondente ao endereço principal
          const primaryCity = cities.find(
            city => city.id === primaryAddress.municipality_id
          );
          if (primaryCity) {
            setCurrentCity(primaryCity);
            return;
          }
        }

        // Se não encontrou endereço principal ou cidade correspondente, usar primeira da lista
        if (!currentCity || !cities.find(city => city.id === currentCity.id)) {
          setCurrentCity(cities[0]);
        }
      } else {
        setCurrentCity(null);
      }
    } catch (error) {
      console.error('Erro ao carregar cidades do usuário:', error);
      setError('Erro ao carregar suas cidades');
      setAvailableCities([]);
      setCurrentCity(null);
    } finally {
      setLoading(false);
    }
  };

  // Carregar cidades quando o componente montar
  useEffect(() => {
    loadUserCities();
  }, []);

  // Função para atualizar as cidades (útil após cadastro de novo endereço)
  const refreshCities = async () => {
    await loadUserCities();
  };

  const value: CityContextType = {
    currentCity,
    setCurrentCity,
    availableCities,
    loading,
    error,
    refreshCities,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
