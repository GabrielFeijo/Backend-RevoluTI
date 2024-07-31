# RevoluTI - Backend

## Descrição do Projeto 📝

Este repositório contém o código backend para o projeto de CEP Finder, desenvolvido para um desafio técnico da empresa RevoluTI. A API gerencia endereços, valida CEPs e mantém um histórico de pesquisas por usuário.

## Tecnologias Utilizadas ⚙

- **NestJS**: Framework Node.js para construir aplicações server-side com TypeScript.
- **Prisma**: ORM para interagir com o banco de dados.
- **PostgreSQL**: Banco de dados relacional para armazenamento de dados.
- **TypeScript**: Linguagem de programação para garantir tipagem estática e segurança no desenvolvimento.

## Funcionalidades

- API para criação e gerenciamento de endereços.
- Validação de CEP e armazenamento de endereços.
- Manutenção do histórico de pesquisas por usuário.
- Documentação da API utilizando Swagger para facilitar o desenvolvimento e integração.

## 👾 Experimente

Para testar a aplicação, acesse os seguintes links:

- [Frontend - CEP Finder](https://frontendrevoluti.desafiotecnico.shop/).
- [Backend - Documentação](https://backendrevoluti.desafiotecnico.shop/api/v1/documentation).

<sub>PS: Optei por utilizar o domínio personalizado desafiotecnico.shop para padronizar o projeto. O frontend está hospedado no frontendrevoluti, enquanto o backend está hospedado no subdomínio backendrevoluti. Ambos os domínios possuem certificação SSL para garantir a segurança da comunicação.</sub>

## 🚀 Começo

Para iniciar o projeto localmente:

### Pré-requisitos

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Instalando e Executando

```bash
# Clone o repositório
$ git clone https://github.com/GabrielFeijo/Backend-RevoluTI

# Acesse a pasta do projeto
$ cd Backend-RevoluTI

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente no arquivo .env. Utilize o arquivo .env.example para ajudar na configuração

# Inicie o banco de dados PostgreSQL usando Docker Compose
$ docker compose up -d

# Execute as migrações do Prisma
$ npx prisma migrate dev

# Inicie a aplicação
$ npm run start:dev
```

### 🧪 Executando Testes

```bash
# Execute os testes unitários
$ npm run test
```

## 🛠️ Feito utilizando

### BackEnd

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="40" height="45" />

### Deploy

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" width="40" height="45" /> <img src="https://neon.tech/favicon/favicon-256x256.png" width="40" height="45" />
