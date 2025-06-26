import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity('strava_accounts')
export class StravaAccount {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ID)
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.stravaAccounts, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'int' })
  expiresAt: number;

  @Column({ type: 'int' })
  athleteId: number;
}
