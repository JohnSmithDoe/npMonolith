import { registerAs } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';
import { __baseDir } from '../../../common/utils';
import { typedProcessEnv } from '../config.types';

export type TDocumentationOptions = ServeStaticModuleOptions[];

export const CCONFIG_KEY_DOCS = 'documentation';
//TODO look into transformation to 'undefined'....
export default registerAs(CCONFIG_KEY_DOCS, (): TDocumentationOptions => {
  if (typedProcessEnv().DOC_PATH !== 'undefined') {
    return [
      {
        serveRoot:
          typedProcessEnv().DOC_ROOT !== 'undefined'
            ? typedProcessEnv().DOC_ROOT
            : '/docs',
        exclude: ['/api*'],
        rootPath: join(__baseDir, typedProcessEnv().DOC_PATH),
      },
    ];
  }
  return [];
});
