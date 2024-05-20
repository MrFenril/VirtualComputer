export interface CommandHandler {
    [key: string]: (...param: unknown[]) => unknown
}

export interface ShellCommands {
    [key: string]: (...param: unknown[]) => unknown,
}

export interface ShellEnvironment {
    currentPath: string,
    usr: string
}

export interface ISystemInitObj {
    initPath: string,
    usr: string,
    executables: any[]
}
