import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UserStatus } from "@modules/users/enums/UserStatus";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column({ type: "enum", enum: UserStatus })
  status: UserStatus;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
