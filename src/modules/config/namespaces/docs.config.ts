import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';
import { __baseDir } from '../../../common/utils';
import { process_env } from '../config.utils';

const logger = new Logger('Documentation');

/** DocumentationOptions of the application */
export type TDocumentationOptions = ServeStaticModuleOptions[];

/** DocumentationOptions key in the confguration */
export const CCONFIG_KEY_DOCS = 'documentation';

/** Registers the DocumentationOptions in the confguration */
export default registerAs(CCONFIG_KEY_DOCS, (): TDocumentationOptions => {
  if (!!process_env('SERVE_DOC')) {
    const rootPath = process_env('SERVE_DOC_PATH') || '../documentation';
    const docRoot = process_env('SERVE_DOC_ROOT');
    const serveRoot = docRoot || '/docs';
    logger.log(`Serve Documentation from: ${rootPath} under: ${serveRoot}`);
    return [
      {
        serveRoot,
        exclude: ['/api*'],
        rootPath: join(__baseDir, rootPath),
      },
    ];
  }
  logger.log('Do Not Serve Documentation');
  return [];
});
