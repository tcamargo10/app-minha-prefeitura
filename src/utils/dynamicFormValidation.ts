import { z } from 'zod';

export interface FormField {
  id: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'select'
    | 'address'
    | 'upload'
    | 'video'
    | 'imagem'
    | 'title'
    | 'subtitle'
    | 'description';
  required: boolean;
  options?: string[];
  youtubeId?: string;
  url?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Cria um esquema Zod dinâmico baseado nos campos do formulário
 */
export function createDynamicFormSchema(fields: FormField[]) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach(field => {
    // Ignora campos que não são de entrada (title, subtitle, description, video, imagem)
    if (
      ['title', 'subtitle', 'description', 'video', 'imagem'].includes(
        field.type
      )
    ) {
      return;
    }

    // Para campos de endereço, validamos cada parte
    if (field.type === 'address') {
      const addressRequired = field.required;

      schemaFields[`${field.id}_rua`] = addressRequired
        ? z.string().min(1, 'Campo obrigatório')
        : z.string().optional();

      schemaFields[`${field.id}_bairro`] = addressRequired
        ? z.string().min(1, 'Campo obrigatório')
        : z.string().optional();

      schemaFields[`${field.id}_numero`] = addressRequired
        ? z.string().min(1, 'Campo obrigatório')
        : z.string().optional();

      schemaFields[`${field.id}_complemento`] = z.string().optional();

      return;
    }

    // Para outros campos
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'upload':
        fieldSchema = field.required
          ? z.string().min(1, 'Campo obrigatório')
          : z.string().optional();
        break;

      case 'select':
        if (field.required) {
          fieldSchema = z.string().min(1, 'Campo obrigatório');
          if (field.options && field.options.length > 0) {
            fieldSchema = z.enum(field.options as [string, ...string[]], {
              message: 'Campo obrigatório',
            });
          }
        } else {
          fieldSchema = z.string().optional();
        }
        break;

      case 'text':
      case 'textarea':
      default:
        fieldSchema = field.required
          ? z.string().min(1, 'Campo obrigatório')
          : z.string().optional();
        break;
    }

    schemaFields[field.id] = fieldSchema;
  });

  return z.object(schemaFields);
}

/**
 * Valida os dados do formulário usando o esquema Zod
 */
export function validateFormData(
  formData: Record<string, string>,
  fields: FormField[]
): { isValid: boolean; errors: Record<string, string> } {
  const schema = createDynamicFormSchema(fields);

  // Normalizar dados: converter undefined para string vazia
  const normalizedData: Record<string, string> = {};

  // Primeiro, inicializar todos os campos esperados com string vazia
  fields.forEach(field => {
    if (
      ['title', 'subtitle', 'description', 'video', 'imagem'].includes(
        field.type
      )
    ) {
      return;
    }

    if (field.type === 'address') {
      normalizedData[`${field.id}_rua`] = formData[`${field.id}_rua`] || '';
      normalizedData[`${field.id}_bairro`] =
        formData[`${field.id}_bairro`] || '';
      normalizedData[`${field.id}_numero`] =
        formData[`${field.id}_numero`] || '';
      normalizedData[`${field.id}_complemento`] =
        formData[`${field.id}_complemento`] || '';
    } else {
      normalizedData[field.id] = formData[field.id] || '';
    }
  });

  try {
    schema.parse(normalizedData);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};

      error.issues.forEach((err: any) => {
        const fieldPath = err.path.join('.');
        errors[fieldPath] = err.message;
      });

      return { isValid: false, errors };
    }

    return {
      isValid: false,
      errors: { general: 'Erro de validação desconhecido' },
    };
  }
}

/**
 * Valida dados de agendamento
 */
export function validateSchedulingData(
  selectedLocation: string,
  selectedMonth: string,
  selectedDay: string,
  selectedTime: string
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!selectedLocation) {
    errors.location = 'Local é obrigatório';
  }

  if (!selectedMonth) {
    errors.month = 'Mês é obrigatório';
  }

  if (!selectedDay) {
    errors.day = 'Dia é obrigatório';
  }

  if (!selectedTime) {
    errors.time = 'Horário é obrigatório';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Função utilitária para obter a mensagem de erro de um campo específico
 */
export function getFieldError(
  fieldId: string,
  errors: Record<string, string>
): string | undefined {
  return errors[fieldId];
}
