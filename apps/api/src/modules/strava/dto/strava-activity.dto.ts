import { Field, Float, Int, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class StravaActivityDto {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  movingTime: number

  @Field()
  startDate: string

  @Field({ nullable: true })
  description?: string
}
