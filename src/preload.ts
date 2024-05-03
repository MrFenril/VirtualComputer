// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    login: () => {
        console.log("HERE");

        ipcRenderer.send('login');
    },
    shell: {
        execute: (cmd: string) => ipcRenderer.invoke("execute", cmd)
    }
    // move: (input) => ipcRenderer.send('move', input),
    // btnPressed: (btn) => ipcRenderer.send('controller-input', btn),
    // onInputRelease: (callback) => ipcRenderer.on('dpad', (e, value) => callback(e, value)),
    // onInput: (callback) => ipcRenderer.on('update', (e, value) => callback(e, value)),
    // scrollableKeyboardIPC: {

    // }
  })