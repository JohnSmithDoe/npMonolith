import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecuredOkResponse } from '../../common/decorators/swagger/api-secured-ok-response.decorator';
import { SerializeRespondInterceptor } from '../../common/interceptors/serialize-respond.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserResponseDto } from '../users/dtos/res/user-response.dto';
import { IUser } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginGuard } from './guards/login.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(new SerializeRespondInterceptor(UserResponseDto))
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LoginGuard)
  login(@Body() loginDto: LoginDto, @CurrentUser() user, @Request() req): any {
    return this.authService.login(user, req);
  }

  @Get('logout')
  @ApiSecuredOkResponse({
    description: 'Returns status 200 on success',
    type: null,
  })
  /**
   * This is what it looks like
   */
  logout(@Request() req, @CurrentUser() user: IUser) {
    return this.authService.logout(user, req);
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({
    description: 'Returns the current user from the request',
    type: UserResponseDto,
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Get('whoami')
  @ApiSecuredOkResponse({
    description: 'Returns the current user from the request',
    type: UserResponseDto,
  })
  whoami(@CurrentUser() user: IUser) {
    return user;
  }
}
