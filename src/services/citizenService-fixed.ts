import { supabase } from '@/lib/supabase';
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
      // 1. Teste simples de criação de usuário
      console.log('Iniciando criação de cidadão...');
      console.log('Tentando criar usuário com email:', data.email);

      // Teste mais básico possível
      console.log('Chamando supabase.auth.signUp...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      console.log('Resposta do Auth:', { authData, authError });

      if (authError) {
        console.error('Erro ao criar usuário:', authError);
        console.error('Detalhes completos do erro:', {
          message: authError.message,
          status: authError.status,
          name: authError.name,
          stack: authError.stack,
        });

        // Verificar se é erro de email já existente
        if (authError.message.includes('already registered')) {
          return {
            citizen: null,
            address: null,
            error: 'Este email já está cadastrado',
          };
        }

        // Verificar se é erro de configuração do Supabase
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

      // Por enquanto, vamos pular a atualização do metadata para testar se o problema é esse
      console.log(
        'Usuário criado com sucesso, pulando atualização de metadata por enquanto'
      );

      // 2. Criar registro na tabela citizen
      // Converter data de nascimento para formato ISO
      const dataNascimentoISO = data.dataNascimento
        ? new Date(
            data.dataNascimento.split('/').reverse().join('-')
          ).toISOString()
        : null;

      // Limpar CPF (remover pontos e traços)
      const cpfLimpo = data.cpf.replace(/[.-]/g, '');

      // Limpar telefone (remover parênteses, espaços e traços)
      const telefoneLimpo = data.telefone.replace(/[()\s-]/g, '');

      const citizenData = {
        name: data.name,
        email: data.email,
        cpf: cpfLimpo,
        birth_date: dataNascimentoISO,
        phone: telefoneLimpo,
        active: true,
      };

      console.log('Tentando criar cidadão com dados:', citizenData);

      // Verificar se a tabela existe primeiro
      const { data: tableCheck, error: tableError } = await supabase
        .from('citizens')
        .select('count')
        .limit(1);

      console.log('Verificação da tabela citizen:', { tableCheck, tableError });

      const { data: citizen, error: citizenError } = await supabase
        .from('citizens')
        .insert(citizenData)
        .select()
        .single();

      console.log('Resposta da criação do cidadão:', { citizen, citizenError });

      if (citizenError) {
        console.error('Erro ao criar cidadão:', citizenError);
        console.error('Detalhes do erro:', {
          message: citizenError.message,
          code: citizenError.code,
          details: citizenError.details,
          hint: citizenError.hint,
        });

        // Rollback: deletar usuário criado (temporariamente desabilitado)
        console.log(
          '🔄 Rollback do Auth temporariamente desabilitado (sem permissões de admin)'
        );

        const errorMessage = citizenError.message || 'Erro ao criar cidadão';
        console.log('Retornando erro:', errorMessage);
        return {
          citizen: null,
          address: null,
          error: errorMessage,
        };
      }

      // 3. Criar endereço na tabela citizen_addresses
      // Primeiro, buscar o municipality_id baseado no estado e cidade
      const { data: municipality, error: municipalityError } = await supabase
        .from('municipalities')
        .select('id')
        .eq('state', data.estado)
        .eq('city', data.cidade)
        .eq('active', true)
        .single();

      if (municipalityError || !municipality) {
        console.error('Erro ao buscar municipality:', municipalityError);

        // Rollback: deletar cidadão criado
        console.log('🔄 Iniciando rollback - deletando cidadão...');
        try {
          // Deletar cidadão primeiro
          const { error: deleteCitizenError } = await supabase
            .from('citizens')
            .delete()
            .eq('id', citizen.id);
          if (deleteCitizenError) {
            console.error(
              '❌ Erro ao deletar cidadão no rollback:',
              deleteCitizenError
            );
          } else {
            console.log('✅ Cidadão deletado com sucesso');
          }

          // Rollback do Auth temporariamente desabilitado
          console.log(
            '🔄 Rollback do Auth temporariamente desabilitado (sem permissões de admin)'
          );
        } catch (rollbackError) {
          console.error('❌ Erro no rollback:', rollbackError);
        }

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

      console.log('Tentando criar endereço com dados:', addressData);

      // Verificar se a tabela citizen_addresses existe
      const { data: addressTableCheck, error: addressTableError } =
        await supabase.from('citizen_addresses').select('count').limit(1);

      console.log('Verificação da tabela citizen_addresses:', {
        addressTableCheck,
        addressTableError,
      });

      const { data: address, error: addressError } = await supabase
        .from('citizen_addresses')
        .insert(addressData)
        .select()
        .single();

      console.log('Resposta da criação do endereço:', {
        address,
        addressError,
      });

      if (addressError) {
        console.error('Erro ao criar endereço:', addressError);

        // Rollback: deletar cidadão criado
        console.log('🔄 Iniciando rollback - deletando cidadão...');
        try {
          // Deletar cidadão primeiro
          const { error: deleteCitizenError } = await supabase
            .from('citizens')
            .delete()
            .eq('id', citizen.id);
          if (deleteCitizenError) {
            console.error(
              '❌ Erro ao deletar cidadão no rollback:',
              deleteCitizenError
            );
          } else {
            console.log('✅ Cidadão deletado com sucesso');
          }

          // Rollback do Auth temporariamente desabilitado
          console.log(
            '🔄 Rollback do Auth temporariamente desabilitado (sem permissões de admin)'
          );
        } catch (rollbackError) {
          console.error('❌ Erro no rollback:', rollbackError);
        }

        return {
          citizen: null,
          address: null,
          error: addressError.message || 'Erro ao criar endereço',
        };
      }

      return { citizen, address, error: null };
    } catch (error: any) {
      console.error('Erro no serviço de cidadão:', error);
      console.error('Detalhes do erro:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        stack: error?.stack,
        name: error?.name,
      });

      // Tentar fazer rollback se houver um usuário criado
      if (authData?.user?.id) {
        console.log('🔄 Tentando rollback no catch geral...');
        try {
          // Rollback do Auth temporariamente desabilitado
          console.log(
            '🔄 Rollback do Auth temporariamente desabilitado (sem permissões de admin)'
          );
        } catch (rollbackError) {
          console.error('❌ Erro no rollback geral:', rollbackError);
        }
      }

      // Se for um erro do Supabase, retornar a mensagem específica
      if (error?.message) {
        console.log('Retornando erro com mensagem:', error.message);
        return {
          citizen: null,
          address: null,
          error: error.message,
        };
      }

      console.log('Retornando erro genérico');
      return {
        citizen: null,
        address: null,
        error: 'Erro interno do servidor',
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

      if (error) {
        console.error('Erro ao buscar cidadão:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar cidadão por user_id:', error);
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

      if (error) {
        console.error('Erro ao buscar endereços:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar endereços do cidadão:', error);
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

      if (error) {
        console.error('Erro ao atualizar cidadão:', error);
        return null;
      }

      return updatedCitizen;
    } catch (error) {
      console.error('Erro ao atualizar cidadão:', error);
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

      if (error) {
        console.error('Erro ao adicionar endereço:', error);
        return null;
      }

      return newAddress;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
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

      if (error) {
        console.error('Erro ao atualizar endereço:', error);
        return null;
      }

      return updatedAddress;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
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

      if (error) {
        console.error('Erro ao deletar endereço:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar endereço:', error);
      return false;
    }
  },
};
