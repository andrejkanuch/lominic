import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
import { AuthResponse } from "./dto/auth-response";
import { Public } from "../../common/decorators/public.decorator";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args("registerInput") registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
