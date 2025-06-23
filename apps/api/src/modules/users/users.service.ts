import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    console.log("🔧 UsersService initialized");
  }

  // User entity methods
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "password",
        "role",
        "isEmailVerified",
      ],
    });
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    const user = await this.findOneUser(id);
    Object.assign(user, updateUserInput);
    return this.usersRepository.save(user);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.findOneUser(id);
    return this.usersRepository.remove(user);
  }
}
