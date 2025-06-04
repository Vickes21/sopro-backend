import { TUser } from "src/db/schemas";

export const onboardingSteps = [
  {//0
    instruction: 'Introduza-se de forma amigável e respeitosa e pergunte ao usuário: nome e email e execute a função updateContact, para salvar as informações do usuário.',
  },
  {//1
    instruction: 'Por fim, diga que o app Sopro fornece acesso à plataforma para gestão de produtividade no link {app_url}, que pode ser acessado usando o email: {email} e a seguinte senha de acesso temporário: {temp_password}. Peça que o usuario troque a senha temporária.',
    condition: (contact: TUser): boolean => !!contact.name && !!contact.email, //condicção para avançar
    unmetInstruction: 'O usuário deve completar as informações do perfil para prosseguir, em seguida execute a função updateContact, para salvar as informações do usuário.'
  },
  {
    instruction: 'Pergunte sobre os objetivos dele, fazendo uma ligação com o funcionamento do método e explique sobre como é essencial dividir os objetivos em metas e tarefas.'
  }
]

export type TOnboardingStep = {
  instruction: string;
  condition?: (contact: TUser) => boolean;
  unmetInstruction?: string;
}