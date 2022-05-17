import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, userId: number) => void): any {
    // console.log('serialize user to session');
    done(null, user.id);
  }

  async deserializeUser(
    userId: number,
    done: (err: Error, user: User) => void,
  ): Promise<any> {
    // console.log('deserialize user from session');

    try {
      const user = await this.userService.findOne(userId);
      // console.log('deserialized user from session ', user);
      done(null, user);
    } catch (e) {
      // console.log('error on find one....');
      done(e, null);
    }

    // const user = await this.userService.findOne(userId).then(user => {
    //   console.log('deserialized user from session ', user);
    //   done(null, user);
    // }).catch(err => done(err, null));
  }
}
