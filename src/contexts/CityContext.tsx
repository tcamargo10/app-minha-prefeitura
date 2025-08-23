import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface City {
  id: string;
  name: string;
  state: string;
  code: string;
}

interface CityContextType {
  currentCity: City;
  setCurrentCity: (city: City) => void;
  availableCities: City[];
}

// Mock: Cidades onde o usuário tem endereços cadastrados
const userCities: City[] = [
  {
    id: '1',
    name: 'São Paulo',
    state: 'SP',
    code: 'SPO',
  },
  {
    id: '2',
    name: 'Iguape',
    state: 'SP',
    code: 'IGU',
  },
];

const CityContext = createContext<CityContextType | undefined>(undefined);

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [currentCity, setCurrentCity] = useState<City>(userCities[0]);

  const value: CityContextType = {
    currentCity,
    setCurrentCity,
    availableCities: userCities,
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
