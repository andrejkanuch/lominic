import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SummaryGearDto } from './summary-gear.dto'

@ObjectType()
export class DetailedAthlete {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  resource_state: number

  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  profile_medium: string

  @Field()
  profile: string

  @Field()
  city: string

  @Field()
  state: string

  @Field()
  country: string

  @Field()
  sex: string

  @Field()
  premium: boolean

  @Field()
  created_at: string

  @Field()
  updated_at: string

  @Field(() => Int)
  badge_type_id: number

  @Field(() => Int)
  follower_count: number

  @Field(() => Int)
  friend_count: number

  @Field(() => Int)
  mutual_friend_count: number

  @Field(() => Int)
  athlete_type: number

  @Field()
  date_preference: string

  @Field()
  measurement_preference: string

  @Field(() => [String], { nullable: true }) // clubs can be an empty array or null
  clubs: unknown[]

  @Field(() => Int, { nullable: true })
  ftp: number | null

  @Field(() => Int)
  weight: number

  @Field(() => [SummaryGearDto])
  bikes: SummaryGearDto[]

  @Field(() => [SummaryGearDto])
  shoes: SummaryGearDto[]

  @Field({ nullable: true })
  username: string | null
}
