import { supabase } from '@/utils/supabase';

export interface Municipality {
  id: number;
  state: string;
  city: string;
  created_at?: string;
  updated_at?: string;
}

export interface State {
  state: string;
}

export interface City {
  city: string;
}

export const municipalityService = {
  // Buscar todos os estados únicos
  async getStates(): Promise<State[]> {
    try {
      const { data, error } = await supabase
        .from('municipalities')
        .select('state')
        .eq('active', true)
        .order('state');

      if (error) {
        console.error('Erro ao buscar estados:', error);
        throw error;
      }

      // Remover duplicatas e retornar estados únicos
      const uniqueStates =
        data?.filter(
          (item, index, self) =>
            index === self.findIndex(t => t.state === item.state)
        ) || [];

      return uniqueStates;
    } catch (error) {
      console.error('Erro no serviço de estados:', error);
      throw error;
    }
  },

  // Buscar cidades por estado
  async getCitiesByState(state: string): Promise<City[]> {
    try {
      const { data, error } = await supabase
        .from('municipalities')
        .select('city')
        .eq('state', state)
        .eq('active', true)
        .order('city');

      if (error) {
        console.error('Erro ao buscar cidades:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço de cidades:', error);
      throw error;
    }
  },

  // Buscar todas as cidades (para debug/teste)
  async getAllMunicipalities(): Promise<Municipality[]> {
    try {
      const { data, error } = await supabase
        .from('municipalities')
        .select('*')
        .eq('active', true)
        .order('state')
        .order('city');

      if (error) {
        console.error('Erro ao buscar municípios:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço de municípios:', error);
      throw error;
    }
  },
};
