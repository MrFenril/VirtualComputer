import fs from 'fs';
import os from 'os';

class VirtualEnvironment {
    constructor() {
        console.log("------Env initialisation------");
        const usr = os.userInfo().username;
        if (!fs.existsSync('./root')) {
            fs.mkdirSync(`./root/usr/${usr}/Desktop`, { recursive: true });
            fs.mkdirSync(`./root/bin`, { recursive: true });

            fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file1.txt`, '');
            fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file2.txt`, '');
            fs.writeFileSync(`./root/usr/${usr}/Desktop/test_file3.txt`, '');

            fs.mkdirSync(`./root/usr/${usr}/Desktop/test_folder1`, { recursive: true });
            fs.mkdirSync(`./root/usr/${usr}/Desktop/test_folder2`, { recursive: true });
        }
    }

    public unload() {
        console.log("------Unloading envinronment------");
        fs.rmSync('./root', { recursive: true, force: true })
    }
}

export default new VirtualEnvironment();