import { BadRequestException, Injectable, Logger, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { EUserRoles, IUser } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

/** Handles the authorization logic together with passport and the session */
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(protected readonly usersService: UsersService) {}

  /** Login Guard should have handled the session creation so nothing to do for now */
  login(user: IUser, req?: Express.Request) {
    return user;
  }

  /** Destroy the session here...
   * TODO: create a LogOutGuard or bring the session creation into the service but dont do both */
  logout(user: IUser, req?: Express.Request) {
    // console.log('End Session');
    this.logger.warn('End Session');
    req?.logout();
  }

  /** Checks if the email is unique and hashes the password with bcrypt for 10 rounds
   * todo: check password strength */
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

  /** Used by the local strategy to validate given credentials against the database */
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
