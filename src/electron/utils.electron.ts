import { app, BrowserWindow, dialog } from 'electron';
import { join } from 'path';
import { __baseDir } from '../common/utils';
import { process_env } from '../modules/config/config.utils';

const MAIN_WINDOW_WEBPACK_ENTRY = `http://localhost:${process_env(
  'APP_PORT',
)}/api/#`;
const SPLASH_WINDOW_WEBPACK_ENTRY = join(__baseDir, '/splash/index.html');
let npApp: { stop(): Promise<void> };
let splash: BrowserWindow | undefined;
let mainWindow: BrowserWindow | undefined;

const createSplash = (): void => {
  splash = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#000000',
    center: true,
    focusable: false,
    frame: false,
    show: false,
    fullscreenable: false,
    hasShadow: true,
    maximizable: false,
    minimizable: false,
    modal: true,
    thickFrame: true,
    movable: false,
    title: undefined,
    titleBarStyle: 'hidden',
    opacity: 0.85,
  });
  splash.webContents.once('did-finish-load', () => {
    // console.log('DID FINISH');
    splash?.show();
  });
  splash.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY).then();
};

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,

    darkTheme: true,
    backgroundColor: 'black',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      devTools: true,
    },
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // mainWindow.once('ready-to-show', () => {});
  mainWindow.menuBarVisible = false;
  mainWindow.on('maximize', () => {
    // console.log('Maximize');
    if (splash) {
      splash.close();
      splash = undefined;
    }
    mainWindow?.show();
  });
  mainWindow.on('ready-to-show', () => {
    // console.log('READY TO SHOW');
  });
  mainWindow.webContents.once('did-finish-load', () => {
    // console.log('DID FINISH');
    mainWindow?.maximize();
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then();
};

async function startUpElectron() {
  // Notify on quit and stop the framework
  app.on('will-quit', () => {
    npApp.stop().catch();
  });
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');
  app.commandLine.appendSwitch('auth-server-whitelist', 'localhost');
  app.commandLine.appendSwitch('app', MAIN_WINDOW_WEBPACK_ENTRY);

  await app.whenReady();
  createSplash();
}

export async function startUpClient() {
  // console.log('SHOW ELECTRON SPLASH');
  // STARTUP Electron -> display splash
  // if (!(!APP_AS_SERVER || !app)) {
  if (app) {
    await startUpElectron();
  } else {
    throw new Error('Misconfiguration in startup client');
  }
}

export function connectClient(connection: { stop(): Promise<void> }) {
  // console.log('SHOW ELECTRON MAIN WINDOW');
  // Server is Ready to serve the renderer
  npApp = connection;
  // if (!(!APP_AS_SERVER || !app)) {
  if (app) {
    // STARTUP Renderer -> display main window
    createWindow();
  } else {
    throw new Error('Misconfiguration in startup client');
  }
}

export function terminateClient() {
  if (app) {
    app.exit(-1);
  }
}

export function getClientWindow() {
  return mainWindow;
}

export function showDirectoryPicker(
  defaultPath?: string,
  message?: string,
): string | null {
  let result = null;
  message = message || 'Choose a folder';
  defaultPath = defaultPath || '';

  if (mainWindow) {
    const paths = dialog.showOpenDialogSync(mainWindow, {
      defaultPath,
      properties: ['openDirectory'],
      buttonLabel: message,
      title: message,
      message,
    });
    result = paths?.pop() || null;
  }
  return result;
}

export function showImagePicker(
  defaultPath?: string,
  message?: string,
): string | null {
  let result = null;
  message = message || 'Choose an image';
  defaultPath = defaultPath || '';
  if (mainWindow) {
    const filename = dialog.showOpenDialogSync(mainWindow, {
      defaultPath,
      properties: ['openFile'],
      buttonLabel: message,
      message,
      title: message,
      filters: [
        {
          name: 'Images',
          extensions: ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'webp', 'bmp'],
        },
      ],
    });
    result = filename?.pop() || null;
  }
  return result;
}

export function showFolderImagePicker(
  defaultPath?: string,
  message?: string,
): string | null {
  let result = null;
  message = message || 'Choose a folder image jpg';
  defaultPath = defaultPath || '';

  if (mainWindow) {
    const filename = dialog.showOpenDialogSync(mainWindow, {
      defaultPath,
      properties: ['openFile'],
      buttonLabel: message,
      message,
      title: message,
      filters: [{ name: 'Jpg-Images', extensions: ['jpg'] }],
    });
    result = filename?.pop() || null;
  }
  return result;
}
