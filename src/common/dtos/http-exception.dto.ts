import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

/**
 * HttpException Dto is returned if a http exception occurs
 * TODO: exception handling
 */
export class HttpExceptionDto {
  @ApiProperty({ description: 'The provided http status code', example: 401 })
  @IsEnum(HttpStatus)
  statusCode: number;

  @ApiProperty({
    description: 'The http error as text',
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    description: 'The provided error message',
    example: 'Please log in first',
  })
  @IsString()
  message: string;
}
