import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class HttpExceptionDto {
  @ApiProperty({ description: 'The provided http status code', example: 401 })
  @IsInt()
  statusCode: number;

  @ApiProperty({
    description: 'The provided error message',
    example: 'Please log in first',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The http error as text',
    example: 'Unauthorized',
  })
  @IsEnum(HttpStatus)
  error: HttpStatus;
}
