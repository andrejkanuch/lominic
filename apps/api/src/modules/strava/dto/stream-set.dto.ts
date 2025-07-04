import { ObjectType, Field, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class BaseStreamDto {
  @Field(() => String)
  type: string

  @Field(() => [Float])
  data: number[]

  @Field(() => String)
  series_type: string

  @Field(() => Int)
  original_size: number

  @Field(() => String)
  resolution: string
}

@ObjectType()
export class AltitudeStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class CadenceStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class DistanceStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class HeartrateStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class LatLngStreamDto {
  @Field(() => String)
  type: string

  @Field(() => [LatLngDto])
  data: LatLngDto[]

  @Field(() => String)
  series_type: string

  @Field(() => Int)
  original_size: number

  @Field(() => String)
  resolution: string
}

@ObjectType()
export class LatLngDto {
  @Field(() => Float, { nullable: true })
  lat: number

  @Field(() => Float, { nullable: true })
  lng: number
}

@ObjectType()
export class MovingStreamDto {
  @Field(() => String)
  type: string

  @Field(() => [Boolean])
  data: boolean[]

  @Field(() => String)
  series_type: string

  @Field(() => Int)
  original_size: number

  @Field(() => String)
  resolution: string
}

@ObjectType()
export class PowerStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class SmoothGradeStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class SmoothVelocityStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class TemperatureStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class TimeStreamDto extends BaseStreamDto {
  @Field(() => String)
  type: string
}

@ObjectType()
export class StreamSetDto {
  @Field(() => AltitudeStreamDto, { nullable: true })
  altitude?: AltitudeStreamDto

  @Field(() => CadenceStreamDto, { nullable: true })
  cadence?: CadenceStreamDto

  @Field(() => DistanceStreamDto, { nullable: true })
  distance?: DistanceStreamDto

  @Field(() => HeartrateStreamDto, { nullable: true })
  heartrate?: HeartrateStreamDto

  @Field(() => LatLngStreamDto, { nullable: true })
  latlng?: LatLngStreamDto

  @Field(() => MovingStreamDto, { nullable: true })
  moving?: MovingStreamDto

  @Field(() => PowerStreamDto, { nullable: true })
  power?: PowerStreamDto

  @Field(() => SmoothGradeStreamDto, { nullable: true })
  smooth_grade?: SmoothGradeStreamDto

  @Field(() => SmoothVelocityStreamDto, { nullable: true })
  smooth_velocity?: SmoothVelocityStreamDto

  @Field(() => TemperatureStreamDto, { nullable: true })
  temperature?: TemperatureStreamDto

  @Field(() => TimeStreamDto, { nullable: true })
  time?: TimeStreamDto
}
