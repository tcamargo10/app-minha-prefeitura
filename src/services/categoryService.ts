import { supabase } from '@/utils/supabase';

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  type_categories: string;
  highlight?: boolean;
  municipality_id?: string; // UUID no Supabase
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const categoryService = {
  // Buscar todas as categorias ativas por cidade
  async getCategories(cityId?: string): Promise<Category[]> {
    try {
      let query = supabase.from('categories').select('*').eq('active', true);

      // Só aplicar filtro se cityId for um UUID válido
      if (cityId && cityId.length > 10) {
        query = query.eq('municipality_id', cityId);
      }

      const { data, error } = await query.order('type_categories, name');

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        // Retornar array vazio em vez de throw error
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço de categorias:', error);
      return [];
    }
  },

  // Buscar categorias em destaque por município
  async getHighlightCategories(municipalityId?: string): Promise<Category[]> {
    try {
      let query = supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .eq('highlight', true);

      // Só aplicar filtro se municipalityId for um UUID válido
      if (municipalityId && municipalityId.length > 10) {
        query = query.eq('municipality_id', municipalityId);
      }

      const { data, error } = await query.order('name');

      if (error) {
        console.error('Erro ao buscar categorias em destaque:', error);
        // Retornar array vazio em vez de throw error
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço de categorias em destaque:', error);
      return [];
    }
  },

  // Buscar categoria por ID
  async getCategoryById(id: number): Promise<Category | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error) {
        console.error('Erro ao buscar categoria:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar categoria por ID:', error);
      return null;
    }
  },

  // Buscar categorias por nome (busca parcial)
  async searchCategories(searchTerm: string): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .ilike('name', `%${searchTerm}%`)
        .order('name');

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro na busca de categorias:', error);
      return [];
    }
  },
};
