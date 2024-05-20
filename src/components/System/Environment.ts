import { ISystemInitObj } from "../../types";

export interface IEnvironmentVariable {
    [key: string]: string,
    USR: string;
    PATH: string
}

export interface ShellEnvironment {
    currentPath: string,
    usr: string
}

export default class Environment {
    private location: string
    private baseLocation: string
    private executables: any[]

    private variables: IEnvironmentVariable = {
        USR: "",
        PATH: ""
    }

    get Variables() { return this.variables }
    get CurrentPath() { return this.location }
    get Executable(): any { return this.executables }

    constructor({ path, usr, executables }: ISystemInitObj) {
        this.variables.USR = usr;

        this.baseLocation = path
        this.location = this.baseLocation;
        this.executables = executables;
    }

    addEnv(key: string, value: string, replace: boolean = true) {
        if (replace) {
            this.variables[key] = value;
            return;
        }

        this.variables[key] += `;${value}`;
    }
}