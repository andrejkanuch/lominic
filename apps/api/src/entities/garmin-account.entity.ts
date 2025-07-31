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
  @Column({
    type: 'json',
    transformer: {
      to: (value: string[]) => value,
      from: (value: any) => {
        if (Array.isArray(value)) {
          return value
        }
        if (typeof value === 'string') {
          return [value]
        }
        // Handle case where value is {"permissions":["ACTIVITY_EXPORT","HEALTH_EXPORT"]}
        if (value && typeof value === 'object' && value.permissions) {
          return Array.isArray(value.permissions)
            ? value.permissions
            : [value.permissions]
        }
        return []
      },
    },
  })
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

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  lastSyncAt: Date

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dataRetentionExpiresAt: Date

  @Field()
  @Column({ default: false })
  isMarkedForDeletion: boolean

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  markedForDeletionAt: Date
}
