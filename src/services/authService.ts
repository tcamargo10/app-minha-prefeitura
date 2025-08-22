import { LoginFormData } from '@/screens/LoginScreen/schema';
import { RegisterFormData } from '@/screens/RegisterScreen/schema';
import { handleError, logError } from '@/utils/errorHandler';
import { supabase } from '@/utils/supabase';

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

      return { user: authData.user, session: authData.session, error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.signIn', error, appError);
      return { user: null, session: null, error: appError.message };
    }
  }

  static async signUp(data: RegisterFormData) {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        throw error;
      }

      return { user: authData.user, session: authData.session, error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.signUp', error, appError);
      return { user: null, session: null, error: appError.message };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
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

      return { user, error: null };
    } catch (error: any) {
      const appError = handleError(error);
      logError('AuthService.getCurrentUser', error, appError);
      return { user: null, error: appError.message };
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
