import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = 2;

  await connection.query(
    `INSERT INTO USER_TYPES(id, title, description, created_at)
      values('${id}', 'admin',  'Usuário com permissão de criação e update de usuário.', 'now()')`
  );

  await connection.close();
}

create().then();
