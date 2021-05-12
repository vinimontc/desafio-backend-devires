import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = 1;

  await connection.query(
    `INSERT INTO USER_TYPES(id, title, description, created_at)
      values('${id}', 'root',  'Usuário com permissões completas na aplicação.', 'now()')`
  );

  await connection.close();
}

create().then();
