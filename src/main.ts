import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import Shell from './Shell';
import os from 'os';
import VirtualEnvironment from './Main_process/VirtualEnvironment';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

const shell = new Shell();

const createWindow = () => {
  VirtualEnvironment;

  // const mainWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js'),
  //     nodeIntegration: false
  //   },
  //   // titleBarOverlay: false
  // });

  // mainWindow.setAlwaysOnTop(true);
  // mainWindow.setMenu(null)

  SystemInitialisation();
  ipcMain.handle('execute', execute);

  const test = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    },
    // titleBarOverlay: false
  });

  // test.setAlwaysOnTop(true);
  // test.setMenu(null);
  // console.log("URL: ", COMPUTER_WINDOW_VITE_DEV_SERVER_URL);

  test.loadURL(COMPUTER_WINDOW_VITE_DEV_SERVER_URL)

  // if (SHELL_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(SHELL_WINDOW_VITE_DEV_SERVER_URL);
  // else mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
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

//#region System handling

function SystemInitialisation() {
  ipcMain.handle('init', () => {
    const initPath = path.resolve("./root")
    const usr = os.userInfo().username;

    const executablesFolder = fs.readdirSync('./root/bin');

    const executables = executablesFolder.reduce((acc: any, file: string) => {
      const executablePath = path.resolve('./root/bin', file);
      const parsedContent = JSON.parse(fs.readFileSync(executablePath, 'utf-8'));

      acc[parsedContent.name] = parsedContent;
      return acc
    }, {});

    return {
      usr,
      initPath,
      executables
    }
  });
}

//#endregion

//#region Electron events

app.on('ready', createWindow);
// app.whenReady().then(() => {
//   process.on('SIGINT', () => {
//     console.log("lol");

//     VirtualEnvironment.unload();
//   });
// })

app.on('before-quit', () => {
  // console.log("here");
  VirtualEnvironment.unload();
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

//#endregion
