import {
  BadRequestException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import {
  CTestUser1,
  MockUserService,
} from '../../../test/mocks/user.service.mock';
import { EUserRoles } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: UsersService,
          useValue: MockUserService,
        },
        AuthService,
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should have a session service defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user if email and password are given', async () => {
    expect.assertions(4);
    const newCredentials = {
      email: uuidv4(),
      password: CTestUser1.clearTxtPass,
    };
    const iUser = await authService.registerUser(newCredentials);
    expect(iUser).toEqual(
      expect.objectContaining({
        email: newCredentials.email,
        role: EUserRoles.USER,
      }),
    );
    expect(iUser).toHaveProperty('id');
    expect(iUser).toHaveProperty('password');
    expect(iUser.password).not.toBe(newCredentials.password);
  });

  it('should not register if email already exists', () => {
    expect.assertions(1);
    return expect(
      authService.registerUser({
        email: CTestUser1.email,
        password: CTestUser1.clearTxtPass,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should validate a user by email and password', () => {
    expect.assertions(1);
    return expect(
      authService.validateUserByCredentials({
        email: CTestUser1.email,
        password: CTestUser1.clearTxtPass,
      }),
    ).resolves.toEqual(expect.objectContaining(CTestUser1));
  });

  it('should not validate a user by email and wrong password', () => {
    expect.assertions(1);
    return expect(
      authService.validateUserByCredentials({
        email: CTestUser1.email,
        password: 'just wrong',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should not validate a user by wrong email', () => {
    expect.assertions(1);
    return expect(
      authService.validateUserByCredentials({
        email: CTestUser1.email + '.wrong',
        password: 'just wrong',
      }),
    ).rejects.toThrow(NotAcceptableException);
  });

  it('should return the logged in user', () => {
    expect.assertions(1);
    return expect(authService.login(CTestUser1)).toEqual(
      expect.objectContaining(CTestUser1),
    );
  });
});
