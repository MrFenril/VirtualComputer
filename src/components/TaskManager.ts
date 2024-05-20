import EventEmitter from "./EventEmitter"
import { BaseWindow } from "./UIcomponents/Window/BaseWindow"

export enum EProcessState {
    INACTIVE,
    ACTIVE,
    MINIMIZED,
    MAXIMIZED
}

export interface IProcess {
    name: string,
    state: EProcessState,
    index: number
    element?: HTMLElement,
    process?: BaseWindow
}

export interface IProcesses {
    [key: string]: {
        name: string,
        children: IProcess[]
        icon?: string
    }
}

class TaskManager extends EventEmitter {
    private processes: IProcesses = {};

    get Processes() {
        return this.processes;
    }

    public async LoadProcess(processName: string): Promise<IProcess> {
        const { MainTemplate, BaseWindow } = await import("./UIcomponents/Window/BaseWindow");
        const processWindow = {
            template: MainTemplate,
            windowName: processName,
            x: 100,
            y: 100,
            width: 400,
            height: 400
        };

        const win: BaseWindow = new BaseWindow(processWindow);

        if (!this.processes[processName]) this.processes[processName] = {
            name: processName,
            icon: "",
            children: []
        }

        const process: IProcess = {
            name: processName,
            state: EProcessState.ACTIVE,
            index: this.processes[processName].children.length + 1 || 0,
            element: win.Context,
            process: win
        }

        this.processes[processName].children.push(process);
        this.emits("load", process, this.processes);

        return process;
    }

    public async UnloadProcess(process: BaseWindow): Promise<void> {
        const idx = this.processes[process._windowName].children.findIndex((p) => p.process === process);
        this.processes[process._windowName].children.splice(idx, 1);
        this.emits("unload", process, this.processes[process._windowName].children, this.processes);
    }

    public GetProcess(processName: string, index: number = 0): IProcess {
        return this.processes[processName].children[index];
    }
}

export default new TaskManager();