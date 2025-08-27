import { supabase } from '@/utils/supabase';

export interface Communication {
  id: string;
  type: 'news' | 'information' | 'alert' | 'event';
  title: string;
  summary: string;
  content: string;
  published_at: string;
  expires_at?: string;
  image_url?: string;
  video_url?: string;
  featured: boolean;
  author?: string;
  location?: string;
  schedule?: string;
  municipality_id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
}

export interface CommunicationLink {
  id: string;
  communication_id: string;
  title: string;
  url: string;
  type: 'document' | 'website' | 'form';
  order_index: number;
  created_at: string;
}

export interface CommunicationWithLinks extends Communication {
  links: CommunicationLink[];
}

export const communicationService = {
  // Buscar comunicações por município
  async getCommunicationsByMunicipality(
    municipalityId: string
  ): Promise<CommunicationWithLinks[]> {
    try {
      const { data, error } = await supabase
        .from('communications')
        .select(
          `
          *,
          communication_links (
            id,
            communication_id,
            title,
            url,
            type,
            order_index,
            created_at
          )
        `
        )
        .eq('municipality_id', municipalityId)
        .eq('active', true)
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar comunicações:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço de comunicação:', error);
      throw error;
    }
  },

  // Buscar comunicação específica por ID
  async getCommunicationById(
    id: string
  ): Promise<CommunicationWithLinks | null> {
    try {
      const { data, error } = await supabase
        .from('communications')
        .select(
          `
          *,
          communication_links (
            id,
            communication_id,
            title,
            url,
            type,
            order_index,
            created_at
          )
        `
        )
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error) {
        console.error('Erro ao buscar comunicação:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro no serviço de comunicação:', error);
      throw error;
    }
  },

  // Marcar comunicação como lida
  async markAsRead(communicationId: string, citizenId: string): Promise<void> {
    try {
      // Primeiro verificar se já existe um registro
      const { data: existingRead, error: checkError } = await supabase
        .from('communication_reads')
        .select('id')
        .eq('communication_id', communicationId)
        .eq('citizen_id', citizenId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 = no rows returned (não é um erro real)
        console.error('Erro ao verificar leitura existente:', checkError);
        throw checkError;
      }

      if (existingRead) {
        // Já foi marcada como lida, apenas atualizar o timestamp
        const { error: updateError } = await supabase
          .from('communication_reads')
          .update({ read_at: new Date().toISOString() })
          .eq('communication_id', communicationId)
          .eq('citizen_id', citizenId);

        if (updateError) {
          console.error('Erro ao atualizar timestamp de leitura:', updateError);
          throw updateError;
        }
      } else {
        // Inserir novo registro
        const { error: insertError } = await supabase
          .from('communication_reads')
          .insert({
            communication_id: communicationId,
            citizen_id: citizenId,
            read_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error('Erro ao inserir registro de leitura:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Erro ao marcar comunicação como lida:', error);
      throw error;
    }
  },

  // Verificar se comunicação foi lida
  async isRead(communicationId: string, citizenId: string): Promise<boolean> {
    try {
      // Verificar se o citizen_id existe na tabela citizens
      const { data: citizen, error: citizenError } = await supabase
        .from('citizens')
        .select('id')
        .eq('id', citizenId)
        .single();

      if (citizenError || !citizen) {
        return false; // Se o cidadão não existe, considerar como não lida
      }

      const { data, error } = await supabase
        .from('communication_reads')
        .select('id')
        .eq('communication_id', communicationId)
        .eq('citizen_id', citizenId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Erro ao verificar se foi lida:', error);
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Erro ao verificar se comunicação foi lida:', error);
      return false;
    }
  },
};
