import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Field, ObjectType, ID, registerEnumType } from "@nestjs/graphql";
import * as bcrypt from "bcryptjs";
import { Role } from "../common/enums/roles.enum";

registerEnumType(Role, {
  name: "Role",
  description: "User roles",
});

@ObjectType()
@Entity("users")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field(() => Role)
  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
