import { bootstrap } from '../app.setup';
import { connectClient, startUpClient } from './utils.electron';

startUpClient().then(() => {
  // then create the server and start the main process
  // connect to the created server and show main renderer
  bootstrap().then(() =>
    connectClient({
      stop: () => {
        console.log('Stopped Electron');
        return Promise.resolve();
      },
    }),
  );
});
