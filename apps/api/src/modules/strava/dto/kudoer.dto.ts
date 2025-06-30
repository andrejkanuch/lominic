import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class KudoerDto {
  @Field()
  firstname: string;

  @Field()
  lastname: string;
}
