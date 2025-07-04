import { ObjectType, Field, Float } from '@nestjs/graphql'
import { ZoneBucket } from './zones.dto'

@ObjectType()
export class ActivityZoneDto {
  @Field(() => Float)
  score: number

  @Field()
  type: string

  @Field()
  sensor_based: boolean

  @Field(() => Float)
  points: number

  @Field()
  custom_zones: boolean

  @Field(() => Float)
  max: number

  @Field(() => [ZoneBucket], { nullable: true })
  distribution_buckets?: ZoneBucket[]
}
