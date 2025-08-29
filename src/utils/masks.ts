/**
 * Utilitários para máscaras de campos de input
 */

export const formatCPF = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');

  // Aplica a máscara XXX.XXX.XXX-XX
  if (cleanValue.length <= 11) {
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }

  return cleanValue
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCEP = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');

  // Aplica a máscara XXXXX-XXX
  if (cleanValue.length <= 8) {
    return cleanValue.replace(/(\d{5})(\d)/, '$1-$2');
  }

  return cleanValue.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatPhone = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');

  // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanValue
      .slice(0, 11)
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

export const formatDate = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');

  // Aplica a máscara DD/MM/AAAA
  if (cleanValue.length <= 8) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  }

  return cleanValue.slice(0, 8).replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
};

// Funções para remover máscaras (obter apenas números)
export const removeCPFMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const removeCEPMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const removeDateMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

// Função para ocultar parte do CPF para privacidade
export const formatCPFPrivate = (value: string): string => {
  // Remove tudo que não é dígito
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length >= 11) {
    // Oculta os primeiros 3 e últimos 2 dígitos
    // Formato: ***.XXX.XXX-**
    const middlePart = cleanValue.slice(3, 9);
    return `***.${middlePart.slice(0, 3)}.${middlePart.slice(3)}-**`;
  }

  // Se não tiver 11 dígitos, aplica a máscara normal
  return formatCPF(value);
};
