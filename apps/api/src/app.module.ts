import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { Request } from "express";


import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { StravaModule } from "./modules/strava/strava.module";




export interface GraphQLContext {
  req: Request;
  user?: unknown;
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
      context: ({ req }): GraphQLContext => {
        console.log("🔍 GraphQL Context - req.user:", req.user);
        console.log("🔍 GraphQL Context - req.headers:", req.headers);
        return {
          req,
          user: req.user,
        };
      },
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    StravaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log("📦 AppModule initialized");
    console.log("🔧 Environment:", process.env.NODE_ENV || "development");
    console.log("📁 Current directory:", process.cwd());
  }
}
