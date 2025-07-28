import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { StravaAccount } from '../entities/strava-account.entity'
import { GarminAccount } from '../entities/garmin-account.entity'

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('🗄️ Configuring database connection...')

    const host = this.configService.get('DB_HOST', 'localhost')
    const port = this.configService.get('DB_PORT', 5432)
    const username = this.configService.get('DB_USERNAME', 'lominic_user')
    const database = this.configService.get('DB_NAME', 'lominic_dev')
    const nodeEnv = this.configService.get('NODE_ENV', 'development')

    console.log('📊 Database config:', {
      host,
      port,
      username,
      database,
      nodeEnv,
      synchronize: nodeEnv !== 'production',
      logging: nodeEnv === 'development',
    })

    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host,
      port,
      username,
      password: this.configService.get('DB_PASSWORD', 'lominic_password'),
      database,
      entities: [User, StravaAccount, GarminAccount],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: nodeEnv !== 'production',
      logging: nodeEnv === 'development',
      ssl:
        nodeEnv === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    }

    console.log('✅ Database configuration created')
    return config
  }
}
