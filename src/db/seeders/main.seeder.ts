// import { MySql2Database } from 'drizzle-orm/mysql2';
// import * as schema from '../schemas';
// import { users } from '../schemas/users';
// import { goals } from '../schemas/goals';
// import { tasks } from '../schemas/tasks';
// import { addDays } from 'src/db/utils/date';

// export async function seed(db: MySql2Database<typeof schema>) {
//   console.log('Iniciando seeder principal...');

//   // Create users
//   const usersData = [
//     {
//       id: 1,
//       name: 'Vitor Oliveira',
//       email: 'vitor.oliveira@example.com',
//       phone: '+5541984868643',
//       password: '123456',
//     },
//     {
//       id: 2,
//       name: 'Joao Silva',
//       email: 'joao.silva@example.com',
//       phone: '5541989999999',
//       password: '123123'
//     },
//   ];

//   console.log('Inserindo usuários...');
//   await db.insert(users).values(usersData);

//   // Create goals for each user
//   const goalsData = [];
//   const today = new Date();

//   // Metas do Usuário 1
//   goalsData.push(
//     {
//       id: 1,
//       user_id: 1,
//       period: 'weekly',
//       category: 'personal',
//       title: 'Aprender TypeScript',
//       description: 'Dominar os fundamentos do TypeScript',
//       status: 'in_progress',
//       priority: 'high',
//       start_date: today,
//       end_date: addDays(today, 7),
//     },
//     {
//       id: 2,
//       user_id: 1,
//       period: 'monthly',
//       category: 'professional',
//       title: 'Completar Projeto X',
//       description: 'Finalizar todas as tarefas do Projeto X',
//       status: 'not_started',
//       priority: 'high',
//       start_date: today,
//       end_date: addDays(today, 30),
//     },
//     {
//       id: 3,
//       user_id: 1,
//       period: 'daily',
//       category: 'personal',
//       title: 'Exercício',
//       description: 'Fazer 30 minutos de exercício',
//       status: 'in_progress',
//       priority: 'medium',
//       start_date: today,
//       end_date: addDays(today, 1),
//     },
//     {
//       id: 4,
//       user_id: 1,
//       period: 'yearly',
//       category: 'professional',
//       title: 'Desenvolvimento de Carreira',
//       description: 'Melhorar habilidades profissionais',
//       status: 'not_started',
//       priority: 'medium',
//       start_date: today,
//       end_date: addDays(today, 365),
//     }
//   );

//   // Metas do Usuário 2
//   goalsData.push(
//     {
//       id: 5,
//       user_id: 2,
//       period: 'weekly',
//       category: 'personal',
//       title: 'Ler um Livro',
//       description: 'Ler um livro por semana',
//       status: 'in_progress',
//       priority: 'medium',
//       start_date: today,
//       end_date: addDays(today, 7),
//     },
//     {
//       id: 6,
//       user_id: 2,
//       period: 'monthly',
//       category: 'professional',
//       title: 'Aprender Novo Framework',
//       description: 'Dominar um novo framework JavaScript',
//       status: 'not_started',
//       priority: 'high',
//       start_date: today,
//       end_date: addDays(today, 30),
//     },
//     {
//       id: 7,
//       user_id: 2,
//       period: 'daily',
//       category: 'personal',
//       title: 'Meditação',
//       description: 'Meditar por 15 minutos',
//       status: 'in_progress',
//       priority: 'low',
//       start_date: today,
//       end_date: addDays(today, 1),
//     },
//     {
//       id: 8,
//       user_id: 2,
//       period: 'yearly',
//       category: 'professional',
//       title: 'Certificação',
//       description: 'Obter uma certificação profissional',
//       status: 'not_started',
//       priority: 'high',
//       start_date: today,
//       end_date: addDays(today, 365),
//     }
//   );

//   console.log('Inserindo metas...');
//   await db.insert(goals).values(goalsData);

//   // Create tasks for each goal
//   const tasksData = [];

//   // Tarefas para Meta 1 (Usuário 1)
//   tasksData.push(
//     {
//       goal_id: 1,
//       title: 'Aprender Conceitos Básicos de TypeScript',
//       description: 'Estudar conceitos básicos de TypeScript',
//       priority: 'high',
//       status: 'in_progress',
//       last_status_at: today,
//     },
//     {
//       goal_id: 1,
//       title: 'Praticar TypeScript',
//       description: 'Construir um pequeno projeto usando TypeScript',
//       priority: 'medium',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 2 (Usuário 1)
//   tasksData.push(
//     {
//       goal_id: 2,
//       title: 'Planejar Projeto X',
//       description: 'Criar um plano detalhado para o Projeto X',
//       priority: 'high',
//       status: 'completed',
//       last_status_at: today,
//     },
//     {
//       goal_id: 2,
//       title: 'Executar Projeto X',
//       description: 'Implementar o plano para o Projeto X',
//       priority: 'high',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 3 (Usuário 1)
//   tasksData.push(
//     {
//       goal_id: 3,
//       title: 'Exercício Matinal',
//       description: 'Fazer 15 minutos de exercício pela manhã',
//       priority: 'medium',
//       status: 'in_progress',
//       last_status_at: today,
//     },
//     {
//       goal_id: 3,
//       title: 'Exercício Noturno',
//       description: 'Fazer 15 minutos de exercício à noite',
//       priority: 'medium',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 4 (Usuário 1)
//   tasksData.push(
//     {
//       goal_id: 4,
//       title: 'Identificar Habilidades',
//       description: 'Identificar habilidades para melhorar',
//       priority: 'medium',
//       status: 'completed',
//       last_status_at: today,
//     },
//     {
//       goal_id: 4,
//       title: 'Criar Plano de Aprendizado',
//       description: 'Criar um plano para aprender novas habilidades',
//       priority: 'medium',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 5 (Usuário 2)
//   tasksData.push(
//     {
//       goal_id: 5,
//       title: 'Selecionar Livro',
//       description: 'Escolher um livro para ler',
//       priority: 'medium',
//       status: 'completed',
//       last_status_at: today,
//     },
//     {
//       goal_id: 5,
//       title: 'Ler Livro',
//       description: 'Ler o livro selecionado',
//       priority: 'medium',
//       status: 'in_progress',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 6 (Usuário 2)
//   tasksData.push(
//     {
//       goal_id: 6,
//       title: 'Pesquisar Frameworks',
//       description: 'Pesquisar frameworks JavaScript populares',
//       priority: 'high',
//       status: 'completed',
//       last_status_at: today,
//     },
//     {
//       goal_id: 6,
//       title: 'Começar Aprendizado',
//       description: 'Começar a aprender o framework selecionado',
//       priority: 'high',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 7 (Usuário 2)
//   tasksData.push(
//     {
//       goal_id: 7,
//       title: 'Meditação Matinal',
//       description: 'Meditar por 10 minutos pela manhã',
//       priority: 'low',
//       status: 'in_progress',
//       last_status_at: today,
//     },
//     {
//       goal_id: 7,
//       title: 'Meditação Noturna',
//       description: 'Meditar por 5 minutos à noite',
//       priority: 'low',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   // Tarefas para Meta 8 (Usuário 2)
//   tasksData.push(
//     {
//       goal_id: 8,
//       title: 'Pesquisar Certificações',
//       description: 'Pesquisar certificações profissionais relevantes',
//       priority: 'high',
//       status: 'in_progress',
//       last_status_at: today,
//     },
//     {
//       goal_id: 8,
//       title: 'Inscrever-se no Curso',
//       description: 'Inscrever-se em um curso de certificação',
//       priority: 'high',
//       status: 'pending',
//       last_status_at: today,
//     }
//   );

//   console.log('Inserindo tarefas...');
//   await db.insert(tasks).values(tasksData);

//   console.log('Seeder principal concluído com sucesso!');
// }
