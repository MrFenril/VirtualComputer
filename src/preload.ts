// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

declare global {
    interface Window {
        electronAPI: {
            login: () => unknown
            shell: {
                execute: (cmd: string) => unknown
            },
            environment: {
                init: () => unknown
            }
        }
    }
}

contextBridge.exposeInMainWorld("electronAPI", {
    login: () => {
        console.log("HERE");
        ipcRenderer.send("login");
    },
    shell: {
        execute: (cmd: string) => ipcRenderer.invoke("execute", cmd)
    },
    environment: {
        init: () => ipcRenderer.invoke("init")
    }
});
