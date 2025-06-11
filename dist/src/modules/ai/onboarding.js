"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingSteps = void 0;
exports.onboardingSteps = [
    {
        instruction: 'Introduza-se de forma amigável e respeitosa. SE, o "nome" OU "email" do usuário não tiverem sido informados, pergunte ao usuário nome e email e execute a função updateContact, para salvar as informações do usuário.',
    },
    {
        instruction: 'SE O USUARIO TIVER INFORMADO O NOME E O EMAIL, diga que o app Sopro fornece acesso à plataforma para gestão de produtividade no link {app_url}, que pode ser acessado usando o email: {email} e a {password}',
        condition: (contact) => !!contact.name && !!contact.email,
        unmetInstruction: 'O usuário deve completar as informações do perfil para prosseguir, em seguida execute a função updateContact, para salvar as informações do usuário.'
    },
    {
        instruction: 'Pergunte sobre os objetivos dele, fazendo uma ligação com o funcionamento do método e explique sobre como é essencial dividir os objetivos em metas e tarefas.'
    }
];
//# sourceMappingURL=onboarding.js.map