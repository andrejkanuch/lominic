import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class StravaActivity {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  distance: number;

  @Field(() => Int)
  movingTime: number;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  description?: string;
}
