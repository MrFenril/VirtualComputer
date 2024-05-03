export interface CommandHandler {
    [key: string]: Function
}

export interface ShellCommands {
    [key: string]: Function,
}

export interface ShellEnvironment {
    currentPath: string,
    usr: string
}

