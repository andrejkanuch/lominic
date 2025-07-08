import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Role } from '../../common/enums/roles.enum'
import { Permission } from '../../common/enums/permissions.enum'
import { ROLE_PERMISSIONS } from '../../common/constants/role-permissions'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    console.log('🔧 UsersService initialized')
  }

  // Sign up method for public registration
  async signUp(createUserInput: CreateUserInput): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(createUserInput.email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    // Create user with default USER role
    const userData = { ...createUserInput, role: Role.USER }
    const user = this.usersRepository.create(userData)
    return this.usersRepository.save(user)
  }

  // User entity methods
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput)
    return this.usersRepository.save(user)
  }

  async findAllUsers(currentUser: User): Promise<User[]> {
    // Check if user has permission to read all users
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || []
    if (!userPermissions.includes(Permission.READ_ALL_USERS)) {
      throw new ForbiddenException('Insufficient permissions to view all users')
    }

    return this.usersRepository.find()
  }

  async findOneUser(id: string, currentUser: User): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    // Users can only read their own profile unless they have READ_USER permission
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || []
    if (
      currentUser.id !== id &&
      !userPermissions.includes(Permission.READ_USER)
    ) {
      throw new ForbiddenException('Insufficient permissions to view this user')
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'password',
        'role',
        'isEmailVerified',
        'createdAt',
        'updatedAt',
      ],
    })
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
    currentUser: User
  ): Promise<User> {
    const user = await this.findOneUser(id, currentUser)

    // Check permissions for updating user
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || []

    // Users can only update their own profile unless they have UPDATE_USER permission
    if (
      currentUser.id !== id &&
      !userPermissions.includes(Permission.UPDATE_USER)
    ) {
      throw new ForbiddenException(
        'Insufficient permissions to update this user'
      )
    }

    // Only super admins can change roles
    if (updateUserInput.role && currentUser.role !== Role.SUPER_ADMIN) {
      throw new ForbiddenException('Only super admins can change user roles')
    }

    Object.assign(user, updateUserInput)
    return this.usersRepository.save(user)
  }

  async removeUser(id: string, currentUser: User): Promise<User> {
    const user = await this.findOneUser(id, currentUser)

    // Check permissions for deleting user
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || []
    if (!userPermissions.includes(Permission.DELETE_USER)) {
      throw new ForbiddenException('Insufficient permissions to delete users')
    }

    // Prevent users from deleting themselves
    if (currentUser.id === id) {
      throw new ForbiddenException('Cannot delete your own account')
    }

    return this.usersRepository.remove(user)
  }

  async updateOwnProfile(
    userId: string,
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    const user = await this.findOneUser(userId, {
      id: userId,
      role: Role.USER,
    } as User)

    // Remove role from update input for own profile updates
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...safeUpdateInput } = updateUserInput

    Object.assign(user, safeUpdateInput)
    return this.usersRepository.save(user)
  }
}
