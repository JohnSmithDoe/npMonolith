import { Repository, SaveOptions, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../src/modules/users/dtos/req/create-user.dto';
import {
  EUserRoles,
  IUser,
  User,
} from '../../src/modules/users/entities/user.entity';
import { UsersService } from '../../src/modules/users/users.service';

export const CTestUser1: IUser & { clearTxtPass: string } = {
  id: 1,
  password: '$2b$10$iKZNgNHtBvnkJG8SWXOhTeZRijlVrTBwzkc3VoxyOQUQN4J910GD.',
  email: 'test1@test.de',
  role: EUserRoles.USER,
  clearTxtPass: 'password1',
};
export const CTestUser2: IUser & { clearTxtPass: string } = {
  id: 2,
  password: '$2b$10$ylUjrUW.KmECB6heIc2hb.BVTmWqXFGStBAJKnxTLwKqJs5ykF1PS',
  email: 'test2@test.de',
  role: EUserRoles.USER,
  clearTxtPass: 'password2',
};
export const CTestUser3: IUser & { clearTxtPass: string } = {
  id: 3,
  password: '$2b$10$Ni4Pem716N9XpPCZ7qtkXehB3EqGMrUSoHuUea3aSB0ET.0HVue7q',
  email: 'test3@test.de',
  role: EUserRoles.USER,
  clearTxtPass: 'password3',
};
const users: IUser[] = [CTestUser1, CTestUser2, CTestUser3];

export const MockUserRepository: Partial<Repository<User>> = {
  findOne(id?, options?): Promise<User | undefined> {
    return Promise.resolve(undefined);
  },
  findOneOrFail(id?, options?): Promise<User> {
    return Promise.resolve(undefined);
  },
  remove(entity, options?): Promise<any> {
    return Promise.resolve(undefined);
  },
  save<User>(entities: User[], options?: SaveOptions): Promise<User[]> {
    return Promise.resolve([]);
  },
  update(
    criteria: string | string[] | number | number[] | Date | Date[],
  ): Promise<UpdateResult> {
    return Promise.resolve(undefined);
  },
};

export const MockUserService: Partial<UsersService> = {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: IUser = { id: users.length + 1, ...createUserDto };
    users.push(newUser);
    return Promise.resolve(newUser as User);
  },
  findOne(id: number): Promise<User | undefined> {
    return Promise.resolve(users.find((value) => value.id === id) as User);
  },
  findOneByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(
      users.find((value) => value.email === email) as User,
    );
  },
};
