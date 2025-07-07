import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'
import { Role } from '../common/enums/roles.enum'
import { StravaAccount } from './strava-account.entity'

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles',
})

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Column({ select: false })
  password: string

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  dataRetentionExpiresAt: Date

  @Field()
  @Column({ default: false })
  isMarkedForDeletion: boolean

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  markedForDeletionAt: Date

  @OneToMany(() => StravaAccount, account => account.user)
  stravaAccounts: StravaAccount[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12)
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
