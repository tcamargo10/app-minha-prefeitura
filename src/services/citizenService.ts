import { supabase } from '@/utils/supabase';
import { RegisterFormData } from '@/screens/RegisterScreen/schema';

export interface Citizen {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  phone: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CitizenAddress {
  id: string;
  citizen_id: string;
  municipality_id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postal_code: string;
  is_primary: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const citizenService = {
  // Criar novo cidadão
  async createCitizen(data: RegisterFormData): Promise<{
    citizen: Citizen | null;
    address: CitizenAddress | null;
    error: string | null;
  }> {
    try {
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          return {
            citizen: null,
            address: null,
            error: 'Este email já está cadastrado',
          };
        }

        if (authError.message.includes('Database error')) {
          return {
            citizen: null,
            address: null,
            error:
              'Erro na configuração do banco de dados. Verifique as configurações do Supabase.',
          };
        }

        return { citizen: null, address: null, error: authError.message };
      }

      if (!authData.user) {
        return { citizen: null, address: null, error: 'Erro ao criar usuário' };
      }

      // 2. Criar registro na tabela citizens
      const dataNascimentoISO = data.dataNascimento
        ? new Date(
            data.dataNascimento.split('/').reverse().join('-')
          ).toISOString()
        : null;

      const cpfLimpo = data.cpf.replace(/[.-]/g, '');
      const telefoneLimpo = data.telefone.replace(/[()\s-]/g, '');

      const citizenData = {
        name: data.name,
        email: data.email,
        cpf: cpfLimpo,
        birth_date: dataNascimentoISO,
        phone: telefoneLimpo,
        active: true,
      };

      const { data: citizen, error: citizenError } = await supabase
        .from('citizens')
        .insert(citizenData)
        .select()
        .single();

      if (citizenError) {
        return {
          citizen: null,
          address: null,
          error: citizenError.message || 'Erro ao criar cidadão',
        };
      }

      // 3. Criar endereço na tabela citizen_addresses
      const { data: municipality, error: municipalityError } = await supabase
        .from('municipalities')
        .select('id')
        .eq('state', data.estado)
        .eq('city', data.cidade)
        .eq('active', true)
        .single();

      if (municipalityError || !municipality) {
        // Rollback: deletar cidadão criado
        await supabase.from('citizens').delete().eq('id', citizen.id);

        return {
          citizen: null,
          address: null,
          error: 'Estado ou cidade não encontrados',
        };
      }

      const addressData = {
        citizen_id: citizen.id,
        municipality_id: municipality.id,
        street: data.logradouro,
        number: data.numero,
        complement: data.complemento || null,
        neighborhood: data.bairro,
        postal_code: data.cep,
        is_primary: true,
        active: true,
      };

      const { data: address, error: addressError } = await supabase
        .from('citizen_addresses')
        .insert(addressData)
        .select()
        .single();

      if (addressError) {
        // Rollback: deletar cidadão criado
        await supabase.from('citizens').delete().eq('id', citizen.id);

        return {
          citizen: null,
          address: null,
          error: addressError.message || 'Erro ao criar endereço',
        };
      }

      return { citizen, address, error: null };
    } catch (error: any) {
      return {
        citizen: null,
        address: null,
        error: error?.message || 'Erro interno do servidor',
      };
    }
  },

  // Buscar cidadão por email
  async getCitizenByEmail(email: string): Promise<Citizen | null> {
    try {
      const { data, error } = await supabase
        .from('citizens')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      return null;
    }
  },

  // Buscar endereços de um cidadão
  async getCitizenAddresses(citizenId: string): Promise<CitizenAddress[]> {
    try {
      const { data, error } = await supabase
        .from('citizen_addresses')
        .select('*')
        .eq('citizen_id', citizenId)
        .eq('active', true)
        .order('is_primary', { ascending: false });

      if (error) return [];
      return data || [];
    } catch (error) {
      return [];
    }
  },

  // Atualizar dados do cidadão
  async updateCitizen(
    citizenId: string,
    data: Partial<Citizen>
  ): Promise<Citizen | null> {
    try {
      const { data: updatedCitizen, error } = await supabase
        .from('citizens')
        .update(data)
        .eq('id', citizenId)
        .select()
        .single();

      if (error) return null;
      return updatedCitizen;
    } catch (error) {
      return null;
    }
  },

  // Adicionar novo endereço
  async addCitizenAddress(
    data: Omit<CitizenAddress, 'id' | 'created_at' | 'updated_at'>
  ): Promise<CitizenAddress | null> {
    try {
      const { data: newAddress, error } = await supabase
        .from('citizen_addresses')
        .insert(data)
        .select()
        .single();

      if (error) return null;
      return newAddress;
    } catch (error) {
      return null;
    }
  },

  // Atualizar endereço
  async updateCitizenAddress(
    addressId: string,
    data: Partial<CitizenAddress>
  ): Promise<CitizenAddress | null> {
    try {
      const { data: updatedAddress, error } = await supabase
        .from('citizen_addresses')
        .update(data)
        .eq('id', addressId)
        .select()
        .single();

      if (error) return null;
      return updatedAddress;
    } catch (error) {
      return null;
    }
  },

  // Deletar endereço (soft delete)
  async deleteCitizenAddress(addressId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('citizen_addresses')
        .update({ active: false })
        .eq('id', addressId);

      return !error;
    } catch (error) {
      return false;
    }
  },
};
