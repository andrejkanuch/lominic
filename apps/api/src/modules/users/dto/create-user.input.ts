import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from "class-validator";
import { Role } from "../../../common/enums/roles.enum";

registerEnumType(Role, {
  name: "Role",
  description: "User roles",
});

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  role?: Role;
}
