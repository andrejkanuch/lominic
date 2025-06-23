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
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Query(() => User, { name: "user" })
  findOneUser(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.findOneUser(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.removeUser(id);
  }
}
