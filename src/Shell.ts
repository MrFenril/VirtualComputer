import path from 'path';
import fs from 'fs';
import {
    getExtension,
    getMIMEType,
} from 'node-mime-types';
import { ShellCommands, ShellEnvironment } from './types';
import { FileType } from './enum';
// import { Command, createCommand } from '@commander-js/extra-typings';
// import { createCommand } from 'commander';


export default class Shell {
    private basePath: string = path.resolve('./root');
    private commands: ShellCommands = {};

    environment: ShellEnvironment = {
        currentPath: path.resolve('./root'),
        usr: 'RS'
    };

    constructor() {
        this.commands.ls = (args: string[]) => {
            try {
                console.log(args);

                const currentPath = args.length > 1
                    ? path.resolve(this.environment.currentPath + "\\" + args[1])
                    : path.resolve(this.environment.currentPath);

                const directoryContent = fs.readdirSync(currentPath);
                debugger
                return directoryContent.map(file => {
                    const p = path.resolve(currentPath, file);
                    console.log("File: ", p);

                    const mime = getMIMEType(p);
                    const extension = path.extname(p)

                    return {
                        file,
                        mime,
                        extension,
                        type: getFileType(extension, p)
                    };
                })
            } catch (error) {
                console.error(error);
                return []
            }
        }

        this.commands.cd = (arg: string[]) => {
            const newPath = this.environment.currentPath + '\\'+ arg[1];
            const p = path.resolve(newPath)
            if (!fs.existsSync(p) || !fs.lstatSync(p).isDirectory()) return [];
            this.environment.currentPath = newPath;
            return [];
        }
        this.commands.help = () => {}
    }

    get Path(): string {
        return path.resolve(this.environment.currentPath).split(path.sep).join(` ${path.posix.sep} `).replace("E: / Lab / CV_interactif / portfolio / root", "~");
    }

    Parse(cmdLine: string) {
        const cmdParsed = cmdLine.split(' ');
        const [ cmd ] = cmdParsed.slice(0, 1)

        return {
            cmd: this.commands[cmd],
            cmdName: cmd,
            args: cmdParsed
        }
    }

    Execute(cmd: Function, args: string[]) {

        if (!cmd) return { currentPath: this.Path, content: [] }

        const content = cmd(args);

        return {
            content,
            currentPath: this.Path,
        }
    }
}

function getFileType(ext:string, filePath: string): FileType {

    if (ext === '' && fs.lstatSync(filePath).isDirectory()) return FileType.DIRECTORY
    else if ([".json", ".ts", ".lock"].includes(ext)) return FileType.TEXT
    else return FileType.UNKNOWN;
}