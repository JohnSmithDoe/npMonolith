import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeAll(async () => {
  const database = join(__dirname, '..', 'data', 'db', 'test.sqlite');
  try {
    await rm(database);
  } catch (e) {}
});
