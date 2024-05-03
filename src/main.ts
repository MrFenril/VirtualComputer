import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Shell from './Shell';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

const shell = new Shell();

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    },
    // titleBarOverlay: false
  });

  mainWindow.setAlwaysOnTop(true);
  // mainWindow.setMenu(null)

  ipcMain.handle('execute', execute);

  let test = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    },
    // titleBarOverlay: false
  });

  test.setAlwaysOnTop(true);
  // test.setMenu(null);
  test.loadURL(COMPUTER_WINDOW_VITE_DEV_SERVER_URL)

  if (SHELL_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(SHELL_WINDOW_VITE_DEV_SERVER_URL);
  else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
};

function execute(event: Electron.IpcMainInvokeEvent, cmd: string) {
  const command = shell.Parse(cmd);
  const commandExecution = shell.Execute(command.cmd, command.args);

  delete command.cmd;

  return {
    ...command,
    ...commandExecution
  }
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});