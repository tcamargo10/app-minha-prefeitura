import { LoginFormData } from '@/screens/LoginScreen/schema';
import { RegisterFormData } from '@/screens/RegisterScreen/schema';
import { handleError, logError } from '@/utils/errorHandler';
import { supabase } from '@/utils/supabase';
import { citizenService, Citizen } from './citizenService';

export class AuthService {
  static async signIn(data: LoginFormData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      // Buscar dados completos do cidadão
      const citizen = await citizenService.getCitizenByEmail(
        authData.user.email
      );

      // Verificar se o usuário é um cidadão cadastrado
      if (!citizen) {
        // Fazer logout do usuário que não é cidadão
        await supabase.auth.signOut();
        return {
          user: null,
          session: null,
          citizen: null,
          error:
            'Este email não está cadastrado como cidadão. Apenas moradores podem acessar o app.',
        };
      }

      return {
        user: authData.user,
        session: authData.session,
        citizen,
        error: null,
      };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.signIn', error, appError);
      return {
        user: null,
        session: null,
        citizen: null,
        error: appError.message,
      };
    }
  }

  static async signUp(data: RegisterFormData) {
    try {
      // Usar o novo sistema de cidadãos
      const result = await citizenService.createCitizen(data);

      if (result.error) {
        console.error('Erro no cadastro de cidadão:', result.error);
        console.log('AuthService retornando erro:', result.error);
        return {
          user: null,
          session: null,
          citizen: null,
          error: result.error,
        };
      }

      if (!result.citizen) {
        return {
          user: null,
          session: null,
          citizen: null,
          error: 'Erro ao criar conta do cidadão',
        };
      }

      return {
        user: result.citizen,
        session: null, // Será confirmado por email
        citizen: result.citizen,
        error: null,
      };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.signUp', error, appError);
      return {
        user: null,
        session: null,
        citizen: null,
        error: appError.message,
      };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      // Mesmo se houver erro, tentamos limpar o estado local
      if (error) {
        // Não lançamos o erro, apenas retornamos
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.signOut', error, appError);
      return { error: appError.message };
    }
  }

  static async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      // Buscar dados completos do cidadão
      let citizen = null;
      if (user) {
        citizen = await citizenService.getCitizenByEmail(user.email);

        // Verificar se o usuário é um cidadão cadastrado
        if (!citizen) {
          // Fazer logout do usuário que não é cidadão
          await supabase.auth.signOut();
          return {
            user: null,
            citizen: null,
            error:
              'Este email não está cadastrado como cidadão. Apenas moradores podem acessar o app.',
          };
        }
      }

      return { user, citizen, error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.getCurrentUser', error, appError);
      return { user: null, citizen: null, error: appError.message };
    }
  }

  static async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      return { session, error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.getCurrentSession', error, appError);
      return { session: null, error: appError.message };
    }
  }
}
