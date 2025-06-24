import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { Request } from "express";
import { APP_GUARD } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RolesGuard } from "./common/guards/roles.guard";
import { PermissionsGuard } from "./common/guards/permissions.guard";
import { JwtAuthGuard } from "./common/guards/jwt.guard";

export interface GraphQLContext {
  req: Request;
  user?: any;
}

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: process.env.NODE_ENV !== "production",
      introspection: process.env.NODE_ENV !== "production",
      context: ({ req }): GraphQLContext => ({
        req,
        user: req.user,
      }),
    }),

    // Feature modules
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log("📦 AppModule initialized");
    console.log("🔧 Environment:", process.env.NODE_ENV || "development");
    console.log("📁 Current directory:", process.cwd());
  }
}
