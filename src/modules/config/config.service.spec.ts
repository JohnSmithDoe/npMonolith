import { Test, TestingModule } from '@nestjs/testing';
import { ENODE_ENV } from '../../common/consts';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';
import { ESupportedDBTypes, IEnvironmentVariables } from './config.types';
import { validate } from './config.validator';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService],
    }).compile();

    configService = module.get(ConfigService);
  });

  it('should have a config service defined', () => {
    expect(configService).toBeDefined();
  });
  it('should have loaded all configurations', () => {
    expect.assertions(9);
    expect(configService.ormConfigiguration).toBeDefined();
    expect(configService.loggerConfiguration).toBeDefined();
    expect(configService.httpConfiguration).toBeDefined();
    expect(configService.authConfiguration).toBeDefined();
    expect(configService.authModuleOptions).toBeDefined();
    expect(configService.authSessionOptions).toBeDefined();
    expect(configService.authStratgyOptions).toBeDefined();
    expect(configService.docsConfiguration).toBeDefined();
    expect(configService.APP_PORT).toBeDefined();
  });

  it('should not validate a wrong config', () => {
    expect(() => validate({ some: 'thing' })).toThrowError(
      /An instance of EnvironmentVariables has failed the validation/g,
    );
  });

  it('should validate a correct config', () => {
    const config: IEnvironmentVariables = {
      APP_PORT: 1234,
      DB_NAME: 'db',
      APP_SECRET: 'sadfa',
      APP_SESSION_SECRET: 'asdfasdf',
      DB_TYPE: ESupportedDBTypes.sqlite,
      NODE_ENV: ENODE_ENV.Test,
      SERVE_DOC_PATH: 'documentation',
    };
    expect(() => validate(<any>config)).not.toThrow(
      /An instance of EnvironmentVariables has failed the validation/g,
    );
  });
});
