import fs from 'fs';
import os from 'os';

interface IDefaultBinaries {
    filename: string,
    content: {
        name: string,
        ui_path: string
    }
}

const defaultBinaries: IDefaultBinaries[] = [
    {
        filename: 'shell.json',
        content: {
            "name": "ShellDisplay",
            "ui_path": "ShellDisplay.ts"
        }
    },
    {
        filename: 'explorer.json',
        content: {
            name: "BaseWindow",
            ui_path: "BaseWindow.ts"
        }
    }
];

class VirtualEnvironment {
    public InitEnvironnement() {
        console.log("------Env initialisation------");
        const usr = os.userInfo().username;
        if (!fs.existsSync('./root')) {
            fs.mkdirSync(`./root/usr/${usr}/Desktop`, { recursive: true });
            fs.mkdirSync(`./root/bin`, { recursive: true });

            this.initUsrFolder(usr);
            this.initBinariesFolder();
        }
    }

    private initUsrFolder(usr: string) {
        fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file1.txt`, '');
        fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file2.txt`, '');
        fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file3.txt`, '');

        fs.mkdirSync(`./root/usr/${usr}/Desktop/test_folder1`, { recursive: true });
        fs.mkdirSync(`./root/usr/${usr}/Desktop/test_folder2`, { recursive: true });
    }

    private initBinariesFolder() {
        defaultBinaries.forEach((file) => {
            fs.writeFileSync(`./root/bin/${file.filename}`, JSON.stringify(file.content, null, 4));
        })
    }

    public unload() {
        console.log("------Unloading env------");
        fs.rmSync('./root', { recursive: true, force: true })
    }
}

export default new VirtualEnvironment();