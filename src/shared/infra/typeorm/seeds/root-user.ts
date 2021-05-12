import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("root", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, type_id, status, created_at)
      values('${id}', 'master', 'master@root.com.br', '${password}', '1', 'ativo', 'now()')  
    `
  );

  await connection.close();
}

create().then();
