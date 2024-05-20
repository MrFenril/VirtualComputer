import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import moment from 'moment-timezone';
import { CommandHandler } from '../types';
import { FileType } from '../enum';


const terminalForm = document.getElementById("terminal-prompt") as HTMLFormElement;
const terminal = new SimpleBar(document.querySelector("#line-container"));
const promptLabel = document.querySelector('label[for="prompt"]') as HTMLElement;
promptLabel.innerHTML = getPrompt("~");

terminalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const el = document.createElement('p');

    el.classList.add('terminal-line');

    const result: any = await window.electronAPI.shell.execute(terminalForm.prompt.value);

    const prompt = getPrompt(result.currentPath);
    el.innerHTML = promptLabel.innerHTML + terminalForm.prompt.value;
    promptLabel.innerHTML = prompt;

    terminal.getContentElement().appendChild(el)
    commandHandler[result.cmdName](result.cmdName, result.content);

    terminal.recalculate();

    const scroll = terminal.getScrollElement();
    scroll.scrollBy(0, scroll.scrollHeight);

    terminalForm.prompt.value = "";
});

function getPrompt(path: string) {
    const pathEl = document.createElement('span') as HTMLSpanElement;
    pathEl.innerText = path
    pathEl.classList.add('folder-path');

    return moment().format('HH:MM') + " | SR | " + pathEl.outerHTML + " > ";
}

const commandHandler: CommandHandler = {
    "ls": lsCommand,
    "cd": cdCommand,
    "help": helpCommand,
    "exec": execCommand
}

function lsCommand(cmd: string, content: any) {
    const elContainer = document.createElement('div');
    elContainer.classList.add('file-container')

    content.map(({ file, type }: any) => {
        const el = document.createElement('span');
        el.innerText = file;

        if (type === FileType.DIRECTORY) el.classList.add('folder')

        elContainer.appendChild(el);
    })

    terminal.getContentElement().appendChild(elContainer);
}

function cdCommand() {

}

function helpCommand() {

}

function execCommand() {

}