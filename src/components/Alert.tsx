import { Alert as RNAlert, AlertButton } from 'react-native';

import { ErrorType } from '@/utils/errorHandler';

export enum AlertType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  errorType?: ErrorType;
  onRetry?: () => void;
  onDismiss?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  retryText?: string;
}

const getDefaultTitle = (type: AlertType): string => {
  switch (type) {
    case AlertType.SUCCESS:
      return 'Sucesso';
    case AlertType.ERROR:
      return 'Erro';
    case AlertType.WARNING:
      return 'Atenção';
    case AlertType.INFO:
      return 'Informação';
    default:
      return 'Alerta';
  }
};

const getDefaultConfirmText = (type: AlertType): string => {
  switch (type) {
    case AlertType.SUCCESS:
    case AlertType.INFO:
      return 'OK';
    case AlertType.ERROR:
    case AlertType.WARNING:
      return 'Entendi';
    default:
      return 'OK';
  }
};

const getDefaultCancelText = (): string => {
  return 'Ok';
};

const getDefaultRetryText = (): string => {
  return 'Tentar Novamente';
};

export const showAlert = ({
  type = AlertType.INFO,
  title,
  message,
  onRetry,
  onDismiss,
  onConfirm,
  confirmText,
  cancelText,
  retryText,
}: AlertProps) => {
  const buttons: AlertButton[] = [];
  const defaultTitle = title || getDefaultTitle(type);
  const defaultConfirmText = confirmText || getDefaultConfirmText(type);
  const defaultCancelText = cancelText || getDefaultCancelText();
  const defaultRetryText = retryText || getDefaultRetryText();

  // Adiciona botão de tentar novamente se fornecido
  if (onRetry) {
    buttons.push({
      text: defaultRetryText,
      onPress: onRetry,
      style: 'default',
    });
  }

  // Adiciona botão de confirmação se fornecido
  if (onConfirm) {
    buttons.push({
      text: defaultConfirmText,
      onPress: onConfirm,
      style: type === AlertType.ERROR ? 'destructive' : 'default',
    });
  }

  // Adiciona botão de cancelar/fechar
  buttons.push({
    text: defaultCancelText,
    onPress: onDismiss,
    style: 'cancel',
  });

  RNAlert.alert(defaultTitle, message, buttons);
};

// Funções específicas para cada tipo de alerta
export const showSuccessAlert = (props: Omit<AlertProps, 'type'>) => {
  showAlert({ ...props, type: AlertType.SUCCESS });
};

export const showErrorAlert = (props: Omit<AlertProps, 'type'>) => {
  showAlert({ ...props, type: AlertType.ERROR });
};

export const showWarningAlert = (props: Omit<AlertProps, 'type'>) => {
  showAlert({ ...props, type: AlertType.WARNING });
};

export const showInfoAlert = (props: Omit<AlertProps, 'type'>) => {
  showAlert({ ...props, type: AlertType.INFO });
};

// Hook para facilitar o uso dos alertas
export const useAlert = () => {
  const showAlertFn = (props: AlertProps) => {
    showAlert(props);
  };

  const showSuccess = (props: Omit<AlertProps, 'type'>) => {
    showSuccessAlert(props);
  };

  const showError = (props: Omit<AlertProps, 'type'>) => {
    showErrorAlert(props);
  };

  const showWarning = (props: Omit<AlertProps, 'type'>) => {
    showWarningAlert(props);
  };

  const showInfo = (props: Omit<AlertProps, 'type'>) => {
    showInfoAlert(props);
  };

  return {
    showAlert: showAlertFn,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
