# Documentação da Aplicação

## App

task.flow API

## Visão Geral

O task.flow é um projeto baseado no método Kanban, desenvolvido para oferecer uma solução simplificada e eficaz para o gerenciamento de tarefas e fluxos de trabalho. Com foco na praticidade e na transparência, o task.flow visa proporcionar uma experiência intuitiva para indivíduos e equipes, permitindo uma melhor organização e acompanhamento de suas atividades.

## Finalidade

O principal objetivo do task.flow é fornecer uma plataforma flexível e acessível para:

Gerenciamento de Tarefas: Permitir que os usuários criem, atribuam e acompanhem tarefas de forma visual, utilizando o método Kanban para representar o fluxo de trabalho.

Status das Tarefas: Oferecer uma visão clara do status atual de cada tarefa, incluindo opções como "Em Andamento", "Concluída" e "Cancelada", facilitando o acompanhamento do progresso.

## Requisitos Funcionais

- [x] Deve ser possível registrar um usuário;
- [x] Deve ser possível cadastar uma organização;
- [x] Deve ser possível deletar uma organização;
- [x] Deve ser possível cadastrar uma tarefa;
- [x] Deve ser possível deletar uma tarefa;
- [x] Deve ser possível atualizar uma tarefa;
- [x] Deve ser possível designar quem irá fazer a tarefa;
- [x] Deve ser possível listar tarefas por usuário;
- [x] Deve ser possível listar tarefas por organização;
- [x] Deve ser possível listar todas organizações;
- [x] Deve ser possível filtrar as tarefas por status;
- [x] Deve ser possível que uma organização tenha vários usuários;
- [x] Deve ser possível que um usuário tenha várias organizações;
- [x] Deve ser possível filtrar as tarefas por data;
- [x] Deve ser possível adicionar notas para cada tarefa;
- [x] Deve ser possível remover notas;
- [x] Deve ser possível atualizar notas;
- [x] Deve ser possível fazer upload de anexos para tarefas;
- [x] Deve ser possível fazer upload de anexos para notas;
- [x] Deve ser possível filtrar ;

## Regras de negócio

- [x] O usuário poderá criar tarefas mesmo sem uma organização;
- [x] Ao criar uma nova tarefa, não será obrigatório o envio de um anexo;
- [x] O usuário poderá convidar outros usuários para sua organização;

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
