# Documentação da Aplicação

## App

task.flow API

## Visão Geral

O task.flow é um projeto baseado no método Kanban, desenvolvido para oferecer uma solução simplificada e eficaz para o gerenciamento de tarefas e fluxos de trabalho. Com foco na praticidade e na transparência, o task.flow visa proporcionar uma experiência intuitiva para indivíduos e equipes, permitindo uma melhor organização e acompanhamento de suas atividades.

## Finalidade

O principal objetivo do task.flow é fornecer uma plataforma flexível e acessível para:

Gerenciamento de Tarefas: Permitir que os usuários criem, atribuam e acompanhem tarefas de forma visual, utilizando o método Kanban para representar o fluxo de trabalho.

Status das Tarefas: Oferecer uma visão clara do status atual de cada tarefa, incluindo opções como "Em Andamento", "Concluída" e "Cancelada", facilitando o acompanhamento do progresso.

## Regras da aplicação

- [ ] Deve ser possível registrar um usuário;
- [ ] Deve ser possível cadastar uma organização;
- [ ] O usuário poderá convidar outros usuários para sua organização;
- [ ] Deve ser possível cadastrar uma tarefa;
- [ ] Deve ser possível filtrar as tarefas por status;
- [ ] Deve ser possível filtrar as tarefas finalizadas na semana atual;

## Regras de negócio

## Instalação

```bash
npm install
```

ou

```bash
pnpm install
```

ou

```bash
yarn install
```

- Olhe o arquivo '.env-example' e crie um '.env' com as mesma informações;
- Rode o comando para subir o banco de dados:
  ```bash
  npm run docker
  ```
- Por fim rode o comando para rodar a aplicação:
  ```bash
  npm run dev
  ```
