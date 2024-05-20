import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
import moment from "moment-timezone";
import { CommandHandler } from "../../../types";
import { FileType } from "../../../enum";
import {
    IWindowOption,
    IWindowTemplate,
    Template as BaseTemplate,
    BaseWindow
} from "../Window/BaseWindow";

import "./styles/shell-display.css";

export default class ShellDisplay extends BaseWindow {
    constructor(options: IWindowOption) {
        super({
            ...options,
            template: BaseTemplate
        });

        this.Context.querySelector(".modal-content").innerHTML =
            options.template.content;

        const terminalForm = this.Context.querySelector(
            "#terminal-prompt"
        ) as HTMLFormElement;
        const terminal = new SimpleBar(
            this.Context.querySelector("#line-container")
        );
        const promptLabel = this.Context.querySelector(
            'label[for="prompt"]'
        ) as HTMLElement;
        promptLabel.innerHTML = getPrompt("~");

        terminalForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const el = document.createElement("p");

            el.classList.add("terminal-line");

            //@ts-ignore
            const result = await window.electronAPI.shell.execute(
                terminalForm.prompt.value
            );

            const prompt = getPrompt(result.currentPath);
            el.innerHTML = promptLabel.innerHTML + terminalForm.prompt.value;
            promptLabel.innerHTML = prompt;

            terminal.getContentElement().appendChild(el);
            commandHandler[result.cmdName](result.cmdName, result.content);

            terminal.recalculate();

            const scroll = terminal.getScrollElement();
            scroll.scrollBy(0, scroll.scrollHeight);

            terminalForm.prompt.value = "";
        });

        function getPrompt(path: string) {
            const pathEl = document.createElement("span") as HTMLSpanElement;
            pathEl.innerText = path;
            pathEl.classList.add("folder-path");

            return (
                moment().format("HH:MM") + " | SR | " + pathEl.outerHTML + " > "
            );
        }

        const commandHandler: CommandHandler = {
            ls: lsCommand,
            cd: cdCommand,
            help: helpCommand,
            exec: execCommand
        };

        function lsCommand(cmd: string, content: any) {
            const elContainer = document.createElement("div");
            elContainer.classList.add("file-container");

            content.map(({ file, type }: any) => {
                const el = document.createElement("span");
                el.innerText = file;

                if (type === FileType.DIRECTORY) el.classList.add("folder");

                elContainer.appendChild(el);
            });

            terminal.getContentElement().appendChild(elContainer);
        }

        function cdCommand() {}

        function helpCommand() {}

        function execCommand() {}
    }
}

export const Template: IWindowTemplate = {
    name: "Shell",
    content: `
    <div class="terminal">
        <div id="line-container" class="terminal-line-container">
        </div>
        <form id="terminal-prompt" class="terminal-prompt">
            <label for="prompt"></label>
            <input type="text" name="prompt" class="prompt">
        </form>
    </div>
    `
};
