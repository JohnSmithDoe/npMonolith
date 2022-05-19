import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/** Request Dto for a user update operation */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
