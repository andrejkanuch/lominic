import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "../../entities/test.entity";
import { User } from "../../entities/user.entity";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { TestResolver } from "./users.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Test, User])],
  providers: [UsersService, UsersResolver, TestResolver],
  exports: [UsersService],
})
export class UsersModule {
  constructor() {
    console.log("👥 UsersModule initialized");
  }
}
