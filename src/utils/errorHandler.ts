// Tipos de erro comuns

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

// Interface para erros tratados
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: any;
  retryable: boolean;
}

// Função para classificar o tipo de erro
export const classifyError = (error: any): ErrorType => {
  const message = error.message?.toLowerCase() || '';
  const code = error.code?.toLowerCase() || '';
  const name = error.name?.toLowerCase() || '';

  // Erros de rede - melhorado para capturar mais variações
  if (
    message.includes('network request failed') ||
    message.includes('fetch') ||
    message.includes('network') ||
    message.includes('connection') ||
    message.includes('internet') ||
    code === 'network_error' ||
    code === 'net::err_internet_disconnected' ||
    code === 'net::err_connection_refused' ||
    code === 'net::err_connection_timed_out' ||
    code === 'net::err_name_not_resolved' ||
    name.includes('network') ||
    name.includes('fetch') ||
    name.includes('connection')
  ) {
    return ErrorType.NETWORK;
  }

  // Erros de timeout
  if (
    message.includes('timeout') ||
    message.includes('timed out') ||
    code === 'timeout' ||
    code === 'net::err_timed_out' ||
    name.includes('timeout')
  ) {
    return ErrorType.TIMEOUT;
  }

  // Erros de autenticação
  if (
    message.includes('invalid login credentials') ||
    message.includes('email not confirmed') ||
    message.includes('user already registered') ||
    message.includes('unauthorized') ||
    message.includes('invalid credentials') ||
    message.includes('wrong password') ||
    message.includes('user not found') ||
    error.status === 401 ||
    error.status === 403
  ) {
    return ErrorType.AUTHENTICATION;
  }

  // Erros de validação
  if (
    message.includes('password should be at least') ||
    message.includes('unable to validate email') ||
    message.includes('invalid email') ||
    message.includes('invalid') ||
    message.includes('validation') ||
    (error.status >= 400 && error.status < 500)
  ) {
    return ErrorType.VALIDATION;
  }

  // Erros de servidor
  if (error.status >= 500) {
    return ErrorType.SERVER;
  }

  return ErrorType.UNKNOWN;
};

// Função para determinar se o erro é recuperável
export const isRetryableError = (errorType: ErrorType): boolean => {
  return [ErrorType.NETWORK, ErrorType.TIMEOUT, ErrorType.SERVER].includes(
    errorType
  );
};

// Função principal para tratar erros
export const handleError = (error: any): AppError => {
  const errorType = classifyError(error);
  const retryable = isRetryableError(errorType);

  let message = 'Ocorreu um erro inesperado. Tente novamente.';

  switch (errorType) {
    case ErrorType.NETWORK:
      message = 'Erro de conexão. Verifique sua internet e tente novamente.';
      break;
    case ErrorType.TIMEOUT:
      message =
        'Tempo limite excedido. Verifique sua conexão e tente novamente.';
      break;
    case ErrorType.AUTHENTICATION:
      if (
        error.message?.includes('Invalid login credentials') ||
        error.message?.includes('invalid credentials') ||
        error.message?.includes('wrong password')
      ) {
        message = 'Email ou senha incorretos. Tente novamente.';
      } else if (error.message?.includes('Email not confirmed')) {
        message =
          'Email não confirmado. Verifique sua caixa de entrada e confirme o email.';
      } else if (error.message?.includes('User already registered')) {
        message =
          'Este email já está cadastrado. Tente fazer login ou use outro email.';
      } else if (error.message?.includes('user not found')) {
        message = 'Usuário não encontrado. Verifique seu email.';
      } else {
        message = 'Erro de autenticação. Verifique suas credenciais.';
      }
      break;
    case ErrorType.VALIDATION:
      if (error.message?.includes('Password should be at least')) {
        message = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (
        error.message?.includes('Unable to validate email address') ||
        error.message?.includes('invalid email')
      ) {
        message = 'Email inválido. Verifique o formato do email.';
      } else {
        message =
          'Dados inválidos. Verifique as informações e tente novamente.';
      }
      break;
    case ErrorType.SERVER:
      message = 'Erro no servidor. Tente novamente em alguns minutos.';
      break;
    default:
      message = error.message || 'Ocorreu um erro inesperado. Tente novamente.';
  }

  return {
    type: errorType,
    message,
    originalError: error,
    retryable,
  };
};

// Função para log de erros
export const logError = (context: string, error: any, appError?: AppError) => {
  const errorInfo = appError || handleError(error);

  console.log(`[${context}] Erro:`, {
    type: errorInfo.type,
    message: errorInfo.message,
    originalError: errorInfo.originalError,
    timestamp: new Date().toISOString(),
  });
};
