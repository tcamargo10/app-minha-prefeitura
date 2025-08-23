import { z } from 'zod';

// Função para validar CPF
const validateCPF = (cpf: string): boolean => {
  if (!cpf) return false;
  
  // Remove a máscara e verifica se tem 11 dígitos
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
};

// Função para validar se o usuário tem pelo menos 18 anos
const validateAge = (dateString: string): boolean => {
  if (!dateString) return false;
  
  // Remove a máscara e verifica se tem 8 dígitos
  const cleanDate = dateString.replace(/\D/g, '');
  if (cleanDate.length !== 8) return false;
  
  // Extrai dia, mês e ano
  const day = parseInt(cleanDate.slice(0, 2));
  const month = parseInt(cleanDate.slice(2, 4));
  const year = parseInt(cleanDate.slice(4, 8));
  
  // Valida se a data é válida
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    return false;
  }
  
  // Calcula a idade
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),
    dataNascimento: z
      .string()
      .min(1, 'Data de nascimento é obrigatória')
      .refine(
        (date) => {
          const cleanDate = date.replace(/\D/g, '');
          return cleanDate.length === 8;
        },
        { message: 'Data de nascimento deve ter formato DD/MM/AAAA' }
      )
      .refine(
        validateAge,
        { message: 'Você deve ter pelo menos 18 anos para se cadastrar' }
      ),
    telefone: z
      .string()
      .min(1, 'Telefone é obrigatório')
      .min(10, 'Telefone deve ter pelo menos 10 dígitos'),
    cpf: z
      .string()
      .min(1, 'CPF é obrigatório')
      .refine(
        (cpf) => {
          const cleanCPF = cpf.replace(/\D/g, '');
          return cleanCPF.length === 11;
        },
        { message: 'CPF deve ter 11 dígitos' }
      )
      .refine(
        validateCPF,
        { message: 'CPF inválido' }
      ),
    cep: z
      .string()
      .min(1, 'CEP é obrigatório')
      .min(8, 'CEP deve ter 8 dígitos'),
    logradouro: z
      .string()
      .min(1, 'Logradouro é obrigatório'),
    numero: z
      .string()
      .min(1, 'Número é obrigatório'),
    complemento: z
      .string()
      .optional(),
    bairro: z
      .string()
      .min(1, 'Bairro é obrigatório'),
    estado: z
      .string()
      .min(1, 'Estado é obrigatório'),
    cidade: z
      .string()
      .min(1, 'Cidade é obrigatória'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
