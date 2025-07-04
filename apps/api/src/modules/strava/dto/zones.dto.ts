import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ZoneBucket {
  @Field(() => Int)
  max: number

  @Field(() => Int)
  min: number

  @Field(() => Int)
  time: number
}

@ObjectType()
export class HeartRateZone {
  @Field(() => Int)
  min: number

  @Field(() => Int)
  max: number

  @Field(() => Boolean, { nullable: true })
  custom_zones?: boolean

  @Field(() => [ZoneBucket], { nullable: true })
  zones?: ZoneBucket[]
}

@ObjectType()
export class PowerZone {
  @Field(() => HeartRateZone) // Re-using HeartRateZone for min/max structure
  zone: HeartRateZone

  @Field(() => [ZoneBucket])
  distribution_buckets: ZoneBucket[]

  @Field()
  type: string

  @Field(() => Int)
  resource_state: number

  @Field()
  sensor_based: boolean

  @Field(() => [ZoneBucket], { nullable: true })
  zones?: ZoneBucket[]
}

@ObjectType()
export class Zones {
  @Field(() => HeartRateZone, { nullable: true })
  heart_rate?: HeartRateZone

  @Field(() => PowerZone, { nullable: true })
  power?: PowerZone
}
