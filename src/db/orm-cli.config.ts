import { ConfigModule } from '@nestjs/config';
import { CENV_FILE_PATH } from '../common/consts';
import dbConfiguration from '../modules/config/namespaces/orm.config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: CENV_FILE_PATH,
  load: [dbConfiguration],
});

export default dbConfiguration();
