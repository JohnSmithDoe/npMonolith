import { Expose } from 'class-transformer';
import { EUserRoles, IUser } from '../../entities/user.entity';

/** Response Dto for a returned User Entity */
export class UserResponseDto implements Partial<IUser> {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: EUserRoles;
}
