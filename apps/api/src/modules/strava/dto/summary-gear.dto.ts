import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SummaryGearDto {
  @Field()
  id: string

  @Field()
  primary: boolean

  @Field()
  name: string

  @Field(() => Int)
  resource_state: number

  @Field(() => Int)
  distance: number
}
