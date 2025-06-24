import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PermissionsGuard } from "../../common/guards/permissions.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Role } from "../../common/enums/roles.enum";
import { Permission } from "../../common/enums/permissions.enum";

@Resolver(() => User)
@UseGuards(RolesGuard, PermissionsGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
    console.log("👥 UsersResolver initialized");
  }

  @Mutation(() => User)
  async signUp(
    @Args("createUserInput") createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.signUp(createUserInput);
  }

  @Mutation(() => User)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @RequirePermissions(Permission.CREATE_USER)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  @RequirePermissions(Permission.READ_ALL_USERS)
  async users(@CurrentUser() currentUser: User): Promise<User[]> {
    return this.usersService.findAllUsers(currentUser);
  }

  @Query(() => User, { name: "user" })
  async user(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.findOneUser(id, currentUser);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserInput, currentUser);
  }

  @Mutation(() => User)
  @RequirePermissions(Permission.DELETE_USER)
  async removeUser(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.removeUser(id, currentUser);
  }

  @Mutation(() => User)
  @RequirePermissions(Permission.UPDATE_OWN_PROFILE)
  async updateOwnProfile(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.updateOwnProfile(currentUser.id, updateUserInput);
  }

  @Query(() => User, { name: "me" })
  @RequirePermissions(Permission.READ_OWN_PROFILE)
  async getCurrentUser(@CurrentUser() currentUser: User): Promise<User> {
    return this.usersService.findOneUser(currentUser.id, currentUser);
  }
}
