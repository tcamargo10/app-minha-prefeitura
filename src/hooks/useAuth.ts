import { useState, useEffect } from 'react';

import { LoginFormData } from '@/screens/LoginScreen/schema';
import { RegisterFormData } from '@/screens/RegisterScreen/schema';
import { AuthService } from '@/services/authService';
import { AuthState } from '@/types/auth';
import { Citizen } from '@/services/citizenService';

export const useAuth = () => {
  const [authState, setAuthState] = useState<
    AuthState & { citizen: Citizen | null }
  >({
    user: null,
    session: null,
    citizen: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const {
        user,
        citizen,
        error: userError,
      } = await AuthService.getCurrentUser();
      const { session, error: sessionError } =
        await AuthService.getCurrentSession();

      // Se houver erro de rede, não consideramos como erro crítico
      // apenas logamos e continuamos com o estado atual
      if (userError && userError.includes('Erro de conexão')) {
        console.warn(
          'Erro de rede ao verificar estado de autenticação:',
          userError
        );
      }

      setAuthState({
        user: userError ? null : user,
        session: sessionError ? null : session,
        citizen: userError ? null : citizen,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error(
        'Erro inesperado ao verificar estado de autenticação:',
        error
      );
      setAuthState({
        user: null,
        session: null,
        citizen: null,
        loading: false,
        error: 'Erro ao verificar autenticação. Tente novamente.',
      });
    }
  };

  const signIn = async (data: LoginFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await AuthService.signIn(data);

      setAuthState({
        user: result.user,
        session: result.session,
        citizen: result.citizen,
        loading: false,
        error: result.error,
      });

      return result;
    } catch (error: any) {
      console.error('Erro inesperado no login:', error);
      const errorMessage = 'Erro inesperado durante o login. Tente novamente.';

      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return { user: null, session: null, citizen: null, error: errorMessage };
    }
  };

  const signUp = async (data: RegisterFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await AuthService.signUp(data);

      setAuthState({
        user: result.user,
        session: result.session,
        citizen: result.citizen,
        loading: false,
        error: result.error,
      });

      return result;
    } catch (error: any) {
      console.error('Erro inesperado no cadastro:', error);
      const errorMessage =
        'Erro inesperado durante o cadastro. Tente novamente.';

      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return { user: null, session: null, citizen: null, error: errorMessage };
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await AuthService.signOut();

      // Sempre limpar o estado, mesmo se houver erro
      setAuthState({
        user: null,
        session: null,
        citizen: null,
        loading: false,
        error: result.error,
      });

      return result;
    } catch (error: any) {
      console.error('Erro inesperado no logout:', error);
      const errorMessage = 'Erro inesperado durante o logout. Tente novamente.';

      // Sempre limpar o estado, mesmo se houver erro
      setAuthState({
        user: null,
        session: null,
        citizen: null,
        loading: false,
        error: errorMessage,
      });

      return { error: errorMessage };
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
};
