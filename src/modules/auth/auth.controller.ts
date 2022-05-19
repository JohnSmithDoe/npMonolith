import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm';
import { ApiSecuredOkResponse } from '../../common/decorators/swagger/api-secured-ok-response.decorator';
import { SerializeRespondInterceptor } from '../../common/interceptors/serialize-respond.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserResponseDto } from '../users/dtos/res/user-response.dto';
import {
  IUser,
  User,
} from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginGuard } from './guards/login.guard';

/**
 * The AuthController provides the routes for the /auth path and takes care
 * of User Authorization.
 *
 * Provides Public Routes for login/register
 */
@ApiTags('auth')
@Controller('auth')
@UseInterceptors(new SerializeRespondInterceptor(UserResponseDto))
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  /** If the login succeeded the user is attached to the request and a session is created */
  login(@Body() loginDto: LoginDto, @CurrentUser() user, @Request() req): any {
    return this.authService.login(user, req);
  }

  /** To prevent prefetching issues we use the POST method instead of GET */
  @Post('logout')
  @ApiSecuredOkResponse({
    description: 'Logs out the user by removing the session',
    type: null,
  })
  logout(@Request() req, @CurrentUser() user: IUser) {
    this.authService.logout(user, req);
  }

  // Todo: log in user after registration
  // Todo: check password strength
  /** Register a new User with a unused email and password */
  @Public()
  @Post('register')
  @ApiCreatedResponse({
    description: 'Returns the current user from the request',
    type: UserResponseDto,
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  // TODO: move to UserController?!
  @Get('whoami')
  @ApiSecuredOkResponse({
    description: 'Returns the current user from the request',
    type: UserResponseDto,
  })
  whoami(@CurrentUser() user: IUser) {
    return user;
  }
  // TODO: debug only
  @Public()
  @Get('whoamio')
  @ApiSecuredOkResponse({
    description: 'Returns the current user from the request',
    type: UserResponseDto,
  })
  whoamio(@CurrentUser() user: IUser) {
    throw new EntityNotFoundError(User, 'test');
  }
}
