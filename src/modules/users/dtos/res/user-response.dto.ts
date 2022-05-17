import { Expose } from 'class-transformer';
import { EUserRoles, IUser } from '../../entities/user.entity';

export class UserResponseDto implements Partial<IUser> {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: EUserRoles;
}
