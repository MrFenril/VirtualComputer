import TaskManager from "../../TaskManager";
import "./desktop-icon.css";

export interface IDesktopIconOptions {
    parent: HTMLElement;
    name: string;
    icon?: string;
    x?: number;
    y?: number;
}

export default class DesktopIcon {
    private context: HTMLElement = null;
    private name: string = "";

    constructor({ parent, name, x = 0, y = 0 }: IDesktopIconOptions) {
        this.name = name;

        this.context = document.createElement("div");
        this.context.innerHTML = template;
        this.context.setAttribute("draggable", "true");
        this.context.setAttribute("class", "desktop-icon");

        this.context.style.top = y + "px";
        this.context.style.left = x + "px";

        this.context.querySelector<HTMLElement>(
            ".desktop-icon-name > span"
        ).innerText = name;

        if (parent) parent.appendChild(this.context);

        this.context.addEventListener("dblclick", () => {
            this.initNewProcess();
        });

        this.context.addEventListener("dragstart", (e) => {
            (e.target as HTMLElement).classList.add("dragged");
            (e.target as HTMLElement).classList.remove("focus");
        });

        this.context.addEventListener("dragend", (e: DragEvent) => {
            (e.target as HTMLElement).classList.add("focus");
            (e.target as HTMLElement).classList.remove("dragged");

            const x = e.clientX;
            const y = e.clientY;

            const xPos = (x / 120) * 120 - 60;
            const yPos = (y / 86) * 86 - 43;

            this.context.style.top = (yPos < 0 ? 0 : yPos) + "px";
            this.context.style.left = (xPos < 0 ? 0 : xPos) + "px";
        });

        this.context.addEventListener("click", (e) => {
            e.stopPropagation();
            this.context.classList.add("focus");
        });

        document.body.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            this.context.classList.remove("focus");
        });
    }

    private async initNewProcess() {
        await TaskManager.LoadProcess(this.name);
    }
}

const template = `
    <div class="desktop-icon-inner-icon">
        <img draggable="false" src="./icons8-windows-10-24.svg"/>
    </div>
    <div class="desktop-icon-name">
        <span> Name dzqdzqdzqdqzdzqdzq</span>
    </div>
`;
