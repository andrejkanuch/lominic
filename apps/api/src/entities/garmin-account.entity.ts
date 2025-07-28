import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ObjectType, ID } from '@nestjs/graphql'
import { User } from './user.entity'

@ObjectType()
@Entity('garmin_accounts')
export class GarminAccount {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => ID)
  @Column()
  userId: string

  @ManyToOne(() => User, user => user.garminAccounts, { onDelete: 'CASCADE' })
  user: User

  @Field()
  @Column()
  accessToken: string

  @Field()
  @Column()
  refreshToken: string

  @Field()
  @Column()
  expiresAt: Date

  @Field()
  @Column()
  refreshTokenExpiresAt: Date

  @Field(() => [String])
  @Column({ type: 'json' })
  scope: string[]

  @Field()
  @Column()
  garminUserId: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  lastSyncAt: Date

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  dataRetentionExpiresAt: Date

  @Field()
  @Column({ default: false })
  isMarkedForDeletion: boolean

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  markedForDeletionAt: Date
}
