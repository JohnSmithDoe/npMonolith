import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { setupApplication } from '../../src/app.setup';
import { AuthenticatedGuard } from '../../src/modules/auth/guards/authenticated.guard';
import { EUserRoles } from '../../src/modules/users/entities/user.entity';
import { CTestUser1 } from '../mocks/user.service.mock';

class MockAuthGuard implements Partial<AuthenticatedGuard> {
  async canActivate(context): Promise<any> {
    console.log('MOCKING AUTH');
    return Promise.resolve(true);
  }
}

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let agent: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider(AuthenticatedGuard)
      .useValue(new MockAuthGuard())
      .compile();

    // app = moduleFixture.createNestApplication(undefined, {bufferLogs: true});
    app = moduleFixture.createNestApplication();
    setupApplication(app);
    await app.init();
    agent = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', () => {
    const { clearTxtPass, password, ...newUser } = CTestUser1;
    return agent
      .post('/users')
      .send({
        email: newUser.email,
        password: clearTxtPass,
        role: EUserRoles.USER,
      })
      .expect(201);
  });
});
