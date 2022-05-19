import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

/**
 * Serializes the user for the session storage
 *
 * Given User is serialized to its id attribute only
 * Given the id the User is restored via the UserService
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, userId: number) => void): any {
    done(null, user.id);
  }

  async deserializeUser(
    userId: number,
    done: (err: Error, user: User) => void,
  ): Promise<any> {
    try {
      const user = await this.userService.findOne(userId);
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  }
}
