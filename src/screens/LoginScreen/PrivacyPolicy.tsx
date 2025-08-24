import React from 'react';

import { GenericModal } from '@/components/GenericModal';

interface PrivacyPolicyProps {
  visible: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  visible,
  onClose,
}) => {
  const content = `1. INFORMAÇÕES COLETADAS

Coletamos as seguintes informações quando você usa o aplicativo "Minha Cidade":

• Informações de identificação pessoal (nome, email, CPF)
• Dados de localização (endereços cadastrados)
• Informações de uso do aplicativo
• Comunicações com a prefeitura

2. COMO USAMOS SUAS INFORMAÇÕES

Utilizamos suas informações para:
• Fornecer e melhorar os serviços do aplicativo
• Processar suas solicitações e demandas
• Enviar comunicados oficiais relevantes
• Cumprir obrigações legais e regulamentares
• Garantir a segurança e integridade do sistema

3. COMPARTILHAMENTO DE INFORMAÇÕES

Suas informações pessoais podem ser compartilhadas com:
• Órgãos públicos quando exigido por lei
• Prestadores de serviços que nos auxiliam na operação
• Autoridades competentes em casos de investigação

Não vendemos, alugamos ou comercializamos suas informações pessoais.

4. SEGURANÇA DOS DADOS

Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra:
• Acesso não autorizado
• Alteração, divulgação ou destruição
• Perda acidental

5. RETENÇÃO DE DADOS

Mantemos suas informações pelo tempo necessário para:
• Fornecer os serviços solicitados
• Cumprir obrigações legais
• Resolver disputas
• Fazer cumprir nossos acordos

6. SEUS DIREITOS

Você tem o direito de:
• Acessar suas informações pessoais
• Corrigir dados imprecisos
• Solicitar a exclusão de seus dados
• Revogar consentimento para processamento
• Portabilidade de dados

7. COOKIES E TECNOLOGIAS SIMILARES

O aplicativo pode usar cookies e tecnologias similares para:
• Melhorar a experiência do usuário
• Analisar o uso do aplicativo
• Personalizar conteúdo

8. MENORES DE IDADE

O aplicativo não coleta intencionalmente informações de menores de 18 anos sem consentimento parental.

9. ALTERAÇÕES NA POLÍTICA

Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas.

10. CONTATO

Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato através dos canais oficiais da prefeitura.

Última atualização: ${new Date().toLocaleDateString('pt-BR')}`;

  return (
    <GenericModal
      visible={visible}
      onClose={onClose}
      title="Política de Privacidade"
      content={content}
      buttonText="Entendi"
    />
  );
};
