"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingSteps = void 0;
exports.onboardingSteps = [
    {
        instruction: 'Introduza-se de forma amigável e respeitosa e pergunte ao usuário: nome e email e execute a função updateContact, para salvar as informações do usuário.',
    },
    {
        instruction: 'Pergunte sobre os objetivos dele, fazendo uma ligação com o funcionamento do método e explique sobre como é essencial dividir os objetivos em metas e tarefas.',
    },
    {
        instruction: 'Por fim, diga que o app Sopro fornece acesso à plataforma para gestão de produtividade no link {app_url}, que pode ser acessado usando o email: {email} e a seguinte senha de acesso temporário: {temp_password}. Peça que o usuario troque a senha temporária.',
        condition: (contact) => !!contact.name && !!contact.email,
        unmetInstruction: 'O usuário deve completar as informações do perfil para prosseguir.'
    },
];
//# sourceMappingURL=onboaring.js.map