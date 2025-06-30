import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CommentDto {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  created_at: string;
}
