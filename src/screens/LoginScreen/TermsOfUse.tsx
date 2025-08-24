import React from 'react';

import { GenericModal } from '@/components/GenericModal';

interface TermsOfUseProps {
  visible: boolean;
  onClose: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ visible, onClose }) => {
  const content = `1. ACEITAÇÃO DOS TERMOS

Ao acessar e usar o aplicativo "Minha Cidade", você concorda em cumprir e estar vinculado a estes Termos de Uso.

2. DESCRIÇÃO DO SERVIÇO

O aplicativo "Minha Cidade" é uma plataforma digital que permite aos cidadãos:
• Acessar informações sobre serviços municipais
• Realizar solicitações e acompanhar demandas
• Receber comunicados oficiais da prefeitura
• Interagir com a administração pública local

3. USO ACEITÁVEL

Você concorda em usar o aplicativo apenas para fins legais e de acordo com estes termos. É proibido:
• Usar o aplicativo para atividades ilegais
• Tentar acessar sistemas ou dados não autorizados
• Interferir no funcionamento do aplicativo
• Transmitir conteúdo ofensivo ou inadequado

4. CONTA DO USUÁRIO

Para usar certos recursos do aplicativo, você deve criar uma conta fornecendo informações precisas e atualizadas. Você é responsável por:
• Manter a confidencialidade de suas credenciais
• Todas as atividades que ocorrem em sua conta
• Notificar imediatamente sobre uso não autorizado

5. PRIVACIDADE

O uso de suas informações pessoais é regido pela nossa Política de Privacidade, que faz parte destes termos.

6. MODIFICAÇÕES

Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação.

7. RESCISÃO

Podemos encerrar ou suspender sua conta a qualquer momento, sem aviso prévio, por violação destes termos.

8. LIMITAÇÃO DE RESPONSABILIDADE

O aplicativo é fornecido "como está" e não garantimos que estará sempre disponível ou livre de erros.

9. CONTATO

Para dúvidas sobre estes termos, entre em contato através dos canais oficiais da prefeitura.

Data de vigência: ${new Date().toLocaleDateString('pt-BR')}`;

  return (
    <GenericModal
      visible={visible}
      onClose={onClose}
      title="Termos de Uso"
      content={content}
      buttonText="Aceitar"
    />
  );
};
