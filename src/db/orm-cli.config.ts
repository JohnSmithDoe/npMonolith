import { ConfigModule } from '@nestjs/config';
import { CENV_FILE_PATH } from '../common/consts';
import dbConfiguration from '../modules/config/namespaces/orm.config';

/**
 * This file gets read from the CLI
 * We create the config service to load the environment and the
 * database configuration (read file, validate)
 * This way we can keep the configuration in the environment
 */
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: CENV_FILE_PATH,
  load: [dbConfiguration],
});

/** return the loaded configuration to the cli */
export default dbConfiguration();
