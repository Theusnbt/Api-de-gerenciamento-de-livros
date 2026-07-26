# 📚 API de Gerenciamento de Livros

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)
![License](https://img.shields.io/badge/license-ISC-blue)

API REST desenvolvida com **Node.js**, **Express** e **MongoDB** para gerenciamento de livros.

Cada usuário possui sua própria coleção de livros. Antes de cadastrar um livro, é necessário criar um usuário. Todas as operações envolvendo livros são realizadas utilizando o identificador do usuário.

---

# Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Executando o projeto](#executando-o-projeto)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Modelos de dados](#modelos-de-dados)
- [Autenticação](#autenticação)
- [Rotas — Usuários](#rotas--usuários-users)
- [Rotas — Tarefas](#rotas--tarefas-tarefas)
- [Rotas — Administração](#rotas--administração-adm)
- [Formato de erros de validação](#formato-de-erros-de-validação)
- [Códigos de resposta](#códigos-de-resposta)
- [Licença](#licença)

---

# Tecnologias

| Camada | Tecnologia |
|---------|------------|
| Runtime | Node.js |
| Framework | Express |
| Banco de Dados | MongoDB |
| ODM | Mongoose |
| Validação | Validator |
| Configuração | Dotenv |
| Desenvolvimento | Nodemon |

---

# Pré-requisitos

- Node.js 18+
- npm
- MongoDB Atlas ou MongoDB local

---

# Instalação

```bash
git clone <url-do-repositorio>

cd APIdeLivros

npm install
```

---

# Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

```env
MONGODB_URI=sua_string_de_conexao
PORT=3939
```

| Variável | Descrição |
|----------|-----------|
| MONGODB_URI | String de conexão com o MongoDB |
| PORT | Porta da aplicação |

---

# Executando o projeto

```bash
npm run start:dev
```

Servidor iniciado na porta **3939**.

---

# Estrutura do projeto

```
APIdeLivros/
│
├── src/
│   ├── database/
│   │   └── db.js
│   │
│   ├── features/
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   └── user.route.js
│   │   │
│   │   └── book/
│   │       ├── book.controller.js
│   │       ├── book.model.js
│   │       └── book.route.js
│   │
│   ├── utils/
│   │   └── safeUser.js
│   │
│   ├── app.js
│   ├── index.js
│   └── index.route.js
```

---

# Modelos de dados

## Usuário

| Campo | Tipo | Obrigatório |
|--------|------|-------------|
| firstName | String | Sim |
| lastName | String | Sim |
| email | String | Sim |
| password | String | Sim |

Exemplo:

```json
{
    "firstName":"Matheus",
    "lastName":"Nascimento",
    "email":"matheus@email.com",
    "password":"12345678"
}
```

---

## Livro

| Campo | Tipo | Obrigatório |
|--------|------|-------------|
| titulo | String | Sim |
| autor | String | Sim |
| genero | String | Sim |
| ano | Number | Sim |
| paginas | Number | Sim |
| lido | Boolean | Não |
| nota | Number | Não |
| userId | ObjectId | Sim |

Exemplo:

```json
{
    "titulo":"Clean Code",
    "autor":"Robert C. Martin",
    "genero":"Programação",
    "ano":2008,
    "paginas":464,
    "lido":true,
    "nota":10
}
```

---

# Fluxo de utilização

A utilização da API segue os seguintes passos:

1. Criar um usuário.
2. Salvar o **ID** retornado.
3. Utilizar esse ID para cadastrar livros.
4. Consultar, atualizar ou remover apenas os livros pertencentes ao usuário.

---

# Rotas — Usuários

Base URL:

```
/api/user
```

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | / | Cria um usuário |
| GET | /:id | Busca um usuário |
| PATCH | /:id | Atualiza um usuário |
| DELETE | /:id | Remove um usuário |

### POST /api/user

```json
{
    "firstName":"Matheus",
    "lastName":"Nascimento",
    "email":"matheus@email.com",
    "password":"12345678"
}
```

Resposta:

```json
{
    "message":"Usuário criado",
    "user":{
        "_id":"...",
        "firstName":"Matheus",
        "lastName":"Nascimento",
        "email":"matheus@email.com"
    }
}
```

---

# Rotas — Livros

Base URL:

```
/api/book
```

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | /:userId | Cadastra um livro |
| GET | /:userId | Lista os livros do usuário |
| GET | /:userId/:bookId | Busca um livro |
| PATCH | /:userId/:bookId | Atualiza um livro |
| DELETE | /:userId/:bookId | Remove um livro |

### POST /api/book/:userId

```json
{
    "titulo":"Clean Code",
    "autor":"Robert C. Martin",
    "genero":"Programação",
    "ano":2008,
    "paginas":464,
    "lido":false,
    "nota":10
}
```

Resposta:

```json
{
    "message":"Livro criado",
    "book":{
        ...
    }
}
```

---

# Códigos de resposta

| Código | Significado |
|---------|-------------|
| 200 | Sucesso |
| 201 | Recurso criado |
| 400 | Dados inválidos |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Autor

Projeto desenvolvido para fins de estudo utilizando **Node.js**, **Express** e **MongoDB**.