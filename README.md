# Desafio Devires - Backend

Este é um projeto de gerenciamento de usuários desenvolvido de acordo com o teste encaminhado pela Devires.

## Como rodar o projeto:

### 1. Instale as dependências do projeto:

`yarn install`

ou

`npm install`

### 2. Crie o container do projeto e do banco de dados utilizando o Docker Compose:

`docker-compose up -d`

### 3. Crie as tabelas e as informações estáticas do banco com o comando:

`yarn start:db`

ou

`npm run start:db`

## Documentação:

Para documentação da API foi utilizado o Swagger (https://swagger.io/) e disponibilizada na seguinte rota:

`http://localhost:3333/api-docs`

## Observações e informações importantes:

- O projeto e o banco de dados está configurado para rodar na porta "3333" e "5432" respectivamente.

- Os comandos de inicialização realizam a crição de um usuário do tipo root para que o resto das rotas possam ser utilizadas e testadas, segue abaixo as credenciais desse usuário:

E-mail: `master@root.com.br`

Senha: `root`

- Foi disponibilizado na raiz do projeto a collection utilizada no Imsomnia para a realização de testes durante o desenvolvimento.

## Principais dependências utilizadas:

-  BCrypt: Utilizada para criptografar as senhas do usuário.
-  Express: Framework responsável pela criação do servidor e rotas.
-  Json Web Token: Utilizado para gerar tokens JWT para a autenticação do usuário.
-  Tsyringe: Biblioteca utilizada para injeção de dependências.
-  Typeorm: ORM utilizado para consulta e manipulação de dados no banco de dados.
-  UUID: Utilizada para realizar a criação dos id's dos usuários.
-  Eslint e Prettier: Utilizados para a padronizaçào e organização do código.
