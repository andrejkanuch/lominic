import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
    console.log("👥 UsersResolver initialized");
  }

  @Mutation(() => User)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  async users(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Query(() => User, { name: "user" })
  async user(@Args("id", { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOneUser(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args("id", { type: () => ID }) id: string): Promise<User> {
    return this.usersService.removeUser(id);
  }
}
