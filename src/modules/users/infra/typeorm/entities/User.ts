import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UserStatus } from "@modules/users/enums/UserStatus";

import { UserType } from "./UserType";

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
  type_id: string;

  @ManyToOne(() => UserType, (userType) => userType.id)
  @JoinColumn({ name: "type_id" })
  type: UserType;

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
