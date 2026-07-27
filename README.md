# 📚 API de Gerenciamento de Livros

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

API REST desenvolvida com **Node.js**, **Express** e **MongoDB** para gerenciamento de livros.

Cada usuário possui sua própria coleção de livros. Antes de cadastrar um livro, é necessário criar um usuário e fazer login. A partir do login, um **token JWT** é utilizado para autenticar e autorizar todas as operações envolvendo livros — garantindo que cada usuário só acesse os próprios dados.

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
- [Rotas — Usuários](#rotas--usuários)
- [Rotas — Livros](#rotas--livros)
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
| Autenticação | JSON Web Token (jsonwebtoken) |
| Hash de senha | bcryptjs |
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

### Dependências de autenticação

```bash
npm install jsonwebtoken bcryptjs
```

---

# Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

```env
MONGODB_URI=sua_string_de_conexao
PORT=3939
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d
```

| Variável | Descrição |
|----------|-----------|
| MONGODB_URI | String de conexão com o MongoDB |
| PORT | Porta da aplicação |
| JWT_SECRET | Chave secreta usada para assinar e validar os tokens JWT |
| JWT_EXPIRES_IN | Tempo de expiração do token (ex: `7d`, `1h`) |

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
├── node_modules/
│
├── src/
│   ├── database/
│   │   └── db.js
│   │
│   ├── features/
│   │   ├── search/
│   │   └── user/
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   ├── safeBook.js
│   │   └── safeUser.js
│   │
│   ├── app.js
│   ├── index.js
│   └── index.route.js
│
├── .env
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

---

# Modelos de dados

## Usuário

| Campo | Tipo | Obrigatório |
|--------|------|-------------|
| firstName | String | Sim |
| lastName | String | Sim |
| email | String | Sim |
| password | String (hash) | Sim |

Exemplo (requisição):

```json
{
    "firstName":"Matheus",
    "lastName":"Nascimento",
    "email":"matheus@email.com",
    "password":"12345678"
}
```

> A senha é armazenada como hash (bcrypt), nunca em texto puro.

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
| userId | ObjectId | Sim (obtido do token) |

Exemplo:

```json
{
    "title":"Clean Code",
    "author":"Robert C. Martin",
    "bookGenre":"Programação",
    "year":2008,
    "pages":464,
    "read":true,
    "score":10
}
```

---

# Fluxo de utilização

A utilização da API segue os seguintes passos:

1. Criar um usuário (`POST /api/user`).
2. Fazer login (`POST /api/user/login`) e obter o **token JWT**.
3. Enviar o token no header `Authorization` em todas as requisições protegidas.
4. Cadastrar, consultar, atualizar ou remover livros — o `userId` é extraído automaticamente do token, sem precisar informá-lo na URL.

---

# Autenticação

A API utiliza **JSON Web Token (JWT)** para autenticação. O fluxo funciona assim:

1. O usuário faz login com `email` e `password`.
2. O servidor valida as credenciais (comparando o hash da senha com bcrypt).
3. Se válidas, o servidor gera um token JWT contendo o `id` do usuário, assinado com `JWT_SECRET`.
4. O cliente deve enviar esse token em todas as rotas protegidas, no header:

```
Authorization: Bearer <token>
```

5. Um middleware (`src/middleware/auth.middleware.js`) intercepta a requisição, valida o token e injeta o `userId` autenticado em `req.userId`.
6. As rotas de livro usam `req.userId` (e não mais um `:userId` vindo da URL), garantindo que cada usuário só acesse os próprios livros.

### Bibliotecas utilizadas

| Biblioteca | Finalidade |
|------------|------------|
| `jsonwebtoken` | Geração e verificação dos tokens JWT |
| `bcryptjs` | Hash e comparação segura de senhas |

### Exemplo de middleware

```js
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = auth;
```

---

# Rotas — Usuários

Base URL:

```
/api/user
```

| Método | Rota | Protegida | Descrição |
|---------|------|:---:|-----------|
| POST | / | Não | Cria um usuário |
| POST | /login | Não | Autentica o usuário e retorna o token JWT |
| GET | /:id | Sim | Busca um usuário |
| PATCH | /:id | Sim | Atualiza um usuário |
| DELETE | /:id | Sim | Remove um usuário |

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

### POST /api/user/login

```json
{
    "email":"matheus@email.com",
    "password":"12345678"
}
```

Resposta:

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

# Rotas — Livros

Base URL:

```
/api/book
```

> Todas as rotas abaixo exigem o header `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | / | Cadastra um livro para o usuário autenticado |
| GET | / | Lista os livros do usuário autenticado |
| GET | /:bookId | Busca um livro do usuário autenticado |
| PATCH | /:bookId | Atualiza um livro do usuário autenticado |
| DELETE | /:bookId | Remove um livro do usuário autenticado |

### POST /api/book

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "description": "Um guia de boas práticas para escrita de código limpo e manutenível",
  "bookGenre": "Programação",
  "year": 2008,
  "totalPages": 464,
  "readPages": 464,
  "read": "true",
  "score": 10
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

# Formato de erros de validação

```json
{
    "message":"Dados inválidos",
    "errors":[
        {
            "field":"email",
            "message":"E-mail inválido"
        }
    ]
}
```

---

# Códigos de resposta

| Código | Significado |
|---------|-------------|
| 200 | Sucesso |
| 201 | Recurso criado |
| 400 | Dados inválidos |
| 401 | Não autenticado / token inválido ou ausente |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

# Licença

Projeto desenvolvido para fins de estudo utilizando **Node.js**, **Express**, **MongoDB** e **JWT**.