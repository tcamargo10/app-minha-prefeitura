export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface AuthState {
  user: any | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}
