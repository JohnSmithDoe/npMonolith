import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { EUserRoles, IUser } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(protected readonly usersService: UsersService) {}

  login(user: IUser, req?: Express.Request) {
    this.logger.log('login to logger');
    return user;
  }

  logout(user: IUser, req?: Express.Request) {
    // console.log('End Session');
    this.logger.warn('End Session');
    req?.logout();
  }

  async registerUser({ email, password }: RegisterDto): Promise<IUser> {
    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }
    const hashedPwd = await hash(password, 10);
    user = await this.usersService.create({
      email,
      password: hashedPwd,
      role: EUserRoles.USER,
    });
    return user;
  }

  async validateUserByCredentials({
    email,
    password,
  }: LoginDto): Promise<IUser> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
