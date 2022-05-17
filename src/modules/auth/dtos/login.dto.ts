import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('auth')
export class LoginDto {
  @ApiProperty({ description: 'User email address', example: 'mstaerk@gmx.de' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password in clear text',
    example: 'hello world',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
