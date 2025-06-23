import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
@Entity("test")
export class Test {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;
}
