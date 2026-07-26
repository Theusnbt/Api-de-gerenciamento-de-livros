# 📚 API de Gerenciamento de Livros

Uma API REST desenvolvida com **Node.js**, **Express** e **MongoDB** para realizar o gerenciamento de livros. O projeto permite criar, consultar, atualizar e remover livros de forma simples.

## Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose

## Funcionalidades

- Cadastrar um livro
- Listar todos os livros
- Buscar um livro por ID
- Atualizar informações de um livro
- Remover um livro

## Estrutura do Livro

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "genero": "Programação",
  "ano": 2008,
  "paginas": 464,
  "lido": true,
  "nota": 10
}
```

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/books` | Lista todos os livros |
| GET | `/books/:id` | Busca um livro por ID |
| POST | `/books` | Cadastra um novo livro |
| PUT | `/books/:id` | Atualiza um livro |
| DELETE | `/books/:id` | Remove um livro |

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com a variável de conexão:

```env
MONGODB_URI=sua_string_de_conexao
PORT=3000
```

Inicie a aplicação:

```bash
npm run start:dev
```

## Autor

Desenvolvido para fins de estudo utilizando Node.js, Express e MongoDB.