import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { setupApplication } from '../../src/app.setup';
import { CTestUser1 } from '../mocks/user.service.mock';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let agent: request.SuperTest<request.Test>;
  let cookies;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // app = moduleFixture.createNestApplication(undefined, {bufferLogs: true});
    app = moduleFixture.createNestApplication();
    setupApplication(app);
    await app.init();
    agent = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST)', () => {
    const { clearTxtPass, password, ...newUser } = CTestUser1;
    return agent
      .post('/auth/register')
      .send({ email: newUser.email, password: clearTxtPass })
      .expect(201);
  });

  it('/auth/login (POST)', (done) => {
    agent
      .post('/auth/login')
      .send({ email: CTestUser1.email, password: CTestUser1.clearTxtPass })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        cookies = res.header['set-cookie'];
        return done();
      });
  });

  it('/auth/whoami (GET)', () => {
    return agent.get('/auth/whoami').set('Cookie', cookies).expect(200);
  });

  it('/auth/logout (GET)', () => {
    return agent.get('/auth/logout').set('Cookie', cookies).expect(200);
  });

  it('/auth/whoami (GET) - not logged in', () => {
    return agent.get('/auth/whoami').set('Cookie', cookies).expect(401);
  });
});
