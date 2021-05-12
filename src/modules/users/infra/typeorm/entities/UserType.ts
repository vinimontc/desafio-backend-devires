import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("user_types")
class UserType {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserType };
