import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .trim(),
  phone: z
    .string()
    .min(1, 'O telefone é obrigatório')
    .min(10, 'O telefone deve ter pelo menos 10 dígitos')
    .max(11, 'O telefone deve ter no máximo 11 dígitos')
    .regex(/^\d+$/, 'O telefone deve conter apenas números')
    .trim(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
