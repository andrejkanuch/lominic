import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GarminAuthUrlData {
  @Field()
  url: string

  @Field()
  state: string

  @Field()
  verifier: string

  @Field()
  userId: string
} 