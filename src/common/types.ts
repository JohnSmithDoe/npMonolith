import { IUser } from '../modules/users/entities/user.entity';

/** Override Express Typings */
declare global {
  namespace Express {
    /** Set Express's Request User to our own IUser interface */
    export interface User extends IUser {}
  }
}
