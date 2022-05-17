import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CTestUser1 } from '../../../test/mocks/user.service.mock';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

export const MockUserRepositoryFactory: () => Partial<Repository<User>> =
  jest.fn(() => ({
    findOne: async (id: any) => CTestUser1 as unknown as User,

    // ...
  }));

describe('UserService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(User),
          useFactory: MockUserRepositoryFactory,
        },

        UsersService,
        ConfigService,
      ],
    }).compile();

    userService = module.get(UsersService);
  });

  it('should have a users service defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find a user by id', async () => {
    return expect(userService.findOne(1234)).resolves.toEqual(
      expect.objectContaining(CTestUser1),
    );
  });
});
