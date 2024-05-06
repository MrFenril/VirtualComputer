import EventEmitter from "./EventEmitter"
import { MainTemplate, Window } from "./UIcomponents/Window/Window"

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
    process?: Window
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

    public LoadProcess(processName: string): IProcess {
        const processWindow = {
            template: MainTemplate,
            windowName: processName,
            x: 100,
            y: 100,
            width: 400,
            height: 400
        };

        const win: Window = new Window(processWindow);

        if (!this.processes[processName]) this.processes[processName] = {
            name: processName,
            icon: "",
            children: []
        }

        const process: IProcess = {
            name: processName,
            state: EProcessState.ACTIVE,
            index: this.processes[processName].children.length + 1 ?? 0,
            element: win.Context,
            process: win
        }

        this.processes[processName].children.push(process);
        this.emits("load", process, this.processes);

        return process;
    }

    public GetProcess(processName: string, index: number = 0): IProcess {
        return this.processes[processName].children[index];
    }
}

export default new TaskManager();