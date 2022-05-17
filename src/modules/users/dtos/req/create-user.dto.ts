import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EUserRoles, IUser } from '../../entities/user.entity';

export class CreateUserDto implements IUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(EUserRoles)
  role: EUserRoles;
}
