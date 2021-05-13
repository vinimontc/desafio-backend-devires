# Desafio Devires - Backend

Projeto de gerenciamento de usuários desenvolvido para atender aos requisitos propostos no desafio da Devires.

API desenvolvida com NodeJS + TypeScript.

## Como rodar o projeto:

### 1. Instale as dependências do projeto:

`yarn install`

ou

`npm install`

### 2. Crie o container do projeto e do banco de dados utilizando o Docker Compose:

`docker-compose up -d`

### 3. Crie as tabelas e as informações do banco com o comando:

`yarn start:db`

ou

`npm run start:db`

## Documentação:

Para realizar a documentação da API foi utilizado a ferramenta Swagger (https://swagger.io/). 

Para a consulta da documentação acessar a seguinte rota:

`http://localhost:3333/api-docs`

## Observações e informações importantes:

- O projeto e o banco de dados está configurado para rodar na porta "3333" e "5432" respectivamente.

- Os comandos de inicialização realizam a crição de um usuário do tipo root para que o resto das rotas possam ser utilizadas e testadas, segue abaixo as credenciais desse usuário:

E-mail: `master@root.com.br`

Senha: `root`

- Foi disponibilizado na raiz do projeto a collection utilizada no Insomnia para a realização de testes durante o desenvolvimento.

## Principais dependências utilizadas:

-  BCrypt: Utilizada para criptografar as senhas do usuário.
-  Express: Framework responsável pela criação do servidor e rotas.
-  Json Web Token: Utilizado para gerar tokens JWT para a autenticação do usuário.
-  Tsyringe: Biblioteca utilizada para injeção de dependências.
-  Typeorm: ORM utilizado para consulta e manipulação de dados no banco de dados.
-  UUID: Utilizada para realizar a criação dos id's dos usuários.
-  Eslint e Prettier: Utilizados para a padronizaçào e organização do código.
