import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = 3;

  await connection.query(
    `INSERT INTO USER_TYPES(id, title, description, created_at)
      values('${id}', 'geral',  'Usuário comum, apenas possui permissão para edição dos seus próprios dados com excessão do tipo e status.', 'now()')`
  );

  await connection.close();
}

create().then();
