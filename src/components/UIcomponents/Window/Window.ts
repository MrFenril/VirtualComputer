// import Link from "./WindowLink";

import "./draggable_element.css";

export interface IWindowTemplate {
    name: string;
    content: string;
}

export interface IWindowOption {
    template: IWindowTemplate;
    windowName?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    parent?: HTMLElement;
    availableBtns?: string[];
}

type MoveListenerCallback = (x: number, y: number) => void;
export class Window {
    protected _context: HTMLElement;
    protected _parent: HTMLElement;
    //   protected _data: any = {};
    // protected _links:     any = { next: [], prev: null};
    protected _order: number = 0;

    private _pos1: number = 0;
    private _pos2: number = 0;
    private _pos3: number = 0;
    private _pos4: number = 0;

    private _onMoveListener: MoveListenerCallback[] = [];

    private _onElementDragClose: any;
    private _onElementDrag: any;
    private _onElementLeave: any;

    constructor({
        template,
        windowName,
        x,
        y,
        width = 300,
        height = 200,
        availableBtns = []
    }: IWindowOption) {
        this._context = document.createElement("div");
        this.Context.id = template.name;
        this.Context.className = "draggable";
        this.Context.style.width = `${width}px`;
        this.Context.style.height = `${height}px`;

        const divContent = template.content;
        this.Context.innerHTML = divContent;

        const modalName: HTMLElement = this.Context.querySelector(
            ".modal-header > span"
        );
        modalName.innerText = windowName || template.name;

        this._parent = document.getElementById("content")!;
        this._parent.append(this.Context);

        this.initDragElement(x, y);
        this.bindBtns(availableBtns);

        this._onElementDragClose = this.closeDragElement.bind(this);
        this._onElementDrag = this.elementDrag.bind(this);
        this._onElementLeave = this.mouseLeaveScreen.bind(this);

        this.Context.addEventListener("click", () =>
            this.Context.classList.add("focus")
        );

        this.Context.querySelector("#close").addEventListener(
            "click",
            this.CloseWindow.bind(this)
        );
        this.Context.querySelector("#maximize").addEventListener(
            "click",
            this.MaximizeWindow.bind(this)
        );
        this.Context.querySelector("#minimize").addEventListener(
            "click",
            this.MinimizeWindow.bind(this)
        );
    }

    public get Context() {
        return this._context;
    }

    public MinimizeWindow(): boolean {
        this.Context.classList.toggle("minimized");
        return this.Context.classList.contains("minimized");
    }

    public MaximizeWindow(e: MouseEvent | null): boolean {
        if (e) {
            e.stopPropagation();
        }
        this.Context.classList.toggle("maximized");
        return this.Context.classList.contains("maximized");
    }

    public CloseWindow() {
        this.closeDragElement();
        this.Context.remove();
    }

    private async bindBtns(btnsNames: string[]) {
        for (const name of btnsNames) {
            const field = this.Context.querySelector(
                `#add-${name.toLowerCase()}`
            );
            // field!.addEventListener('click', (await this.addWindow(name)).bind(this) /*() => this._addLink(Fieldthis(_offsetX, offsetY, parent))*/);
        }
    }

    // private async addWindow(elementName: string) {
    //   return async () => {
    //     const x = this.Context.offsetLeft + this.Context.clientWidth + 50;
    //     const y = this.Context.offsetTop;

    //     const component = await import(/* @vite-ignore */`../Window components/${elementName}.ts`)

    //     const draggable = new component.default(x, y, parent);

    //     // new Link(this, draggable);

    //     // this._links.next.push(draggable);
    //   }
    // }

    public getData(): any {
        const data = {
            name: this.Context.id,
            order: this._order
            // children: this._links.next.map((link: Window) => link.getData())
        };

        return data;
    }

    public onMoveEvent(callback: MoveListenerCallback) {
        this._onMoveListener.push(callback);
    }

    // public getLinks() {
    //   return this._links;
    // }

    protected initDragElement(x: number, y: number) {
        this.Context.style.top = `${y}px`;
        this.Context.style.left = `${x}px`;

        console.log(this.Context.id + "header", x, y);

        if (this.Context.querySelector("#" + this.Context.id + "header")) {
            // if present, the header is where you move the DIV from:
            this.Context.querySelector(
                "#" + this.Context.id + "header"
            )!.addEventListener("mousedown", this.dragMouseDown.bind(this));
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            this.Context.addEventListener(
                "mousedown",
                this.dragMouseDown.bind(this)
            );
        }
    }

    private dragMouseDown(e: any) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this._pos3 = e.clientX;
        this._pos4 = e.clientY;

        this.Context.addEventListener("mouseup", this._onElementDragClose);
        // call a function whenever the cursor moves:
        document.addEventListener("mousemove", this._onElementDrag);
        document.body.addEventListener("mouseleave", this._onElementLeave);
    }

    private elementDrag(e: any) {
        e = e || window.event;
        e.preventDefault();
console.log("lol");

        this.Context.classList.add("focus");
        this.Context.classList.remove("maximized");
        // calculate the new cursor position:
        this._pos1 = this._pos3 - e.clientX;
        this._pos2 = this._pos4 - e.clientY;

        this._pos3 = e.clientX;
        this._pos4 = e.clientY;

        const x: number = this.Context.offsetTop - this._pos1;
        const y: number = this.Context.offsetTop - this._pos2;
        // set the element's new position:
        this.Context.style.top = this.Context.offsetTop - this._pos2 + "px";
        this.Context.style.left = this.Context.offsetLeft - this._pos1 + "px";

        // if (this.Context.offsetLeft < 0) this.Context.style.left = "0px";
        // if (this.Context.offsetTop < 0) this.Context.style.top = "0px";

        this._onMoveListener.forEach((fn) => {
            fn(x, y);
        });
        // this._links.next.forEach(link => link.update());
        // this._links.prev.forEach(link => link.update());
    }

    private closeDragElement() {

        // stop moving when mouse button is released:
        // if (this.Context.offsetLeft < 0) this.Context.style.left = "0px";
        if (this.Context.offsetTop < 0) this.Context.style.top = "0px";

        this.Context.classList.remove('focus')

        this.Context.removeEventListener("mouseup", this._onElementDragClose);
        document.removeEventListener("mousemove", this._onElementDrag);
        document.removeEventListener("mouseleave", this._onElementLeave);
    }

    private mouseLeaveScreen(e) {
        e.stopPropagation();
        e.preventDefault();
        this.closeDragElement();
    }
}

export const MainTemplate: IWindowTemplate = {
    name: "MainModal",
    content: `
  <div id="MainModalheader" class="modal-header" tabindex="0">
      <span>Base window</span>
      <div class="header-overlay">
        <button id="minimize">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2339_62)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.08301 10C2.08301 9.66848 2.2147 9.35054 2.44912 9.11612C2.68354 8.8817 3.00149 8.75 3.33301 8.75H16.6663C16.9979 8.75 17.3158 8.8817 17.5502 9.11612C17.7846 9.35054 17.9163 9.66848 17.9163 10C17.9163 10.3315 17.7846 10.6495 17.5502 10.8839C17.3158 11.1183 16.9979 11.25 16.6663 11.25H3.33301C3.00149 11.25 2.68354 11.1183 2.44912 10.8839C2.2147 10.6495 2.08301 10.3315 2.08301 10Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_2339_62">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
        <button id="maximize">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 2.5H4.16667C3.24167 2.5 2.5 3.24167 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5ZM15.8333 4.16667V15.8333H4.16667V4.16667H15.8333Z" fill="white"/>
          </svg>
        </button>
        <button id="close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2339_68)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0003 11.7682L14.4195 16.1873C14.654 16.4218 14.972 16.5536 15.3037 16.5536C15.6353 16.5536 15.9533 16.4218 16.1878 16.1873C16.4223 15.9529 16.5541 15.6348 16.5541 15.3032C16.5541 14.9716 16.4223 14.6535 16.1878 14.419L11.767 9.99985L16.187 5.58068C16.303 5.46457 16.3951 5.32674 16.4579 5.17505C16.5207 5.02337 16.553 4.8608 16.5529 4.69664C16.5529 4.53247 16.5205 4.36992 16.4577 4.21826C16.3948 4.06661 16.3027 3.92882 16.1866 3.81276C16.0705 3.69671 15.9326 3.60466 15.7809 3.54187C15.6293 3.47908 15.4667 3.44679 15.3025 3.44683C15.1384 3.44686 14.9758 3.47924 14.8242 3.5421C14.6725 3.60496 14.5347 3.69707 14.4187 3.81318L10.0003 8.23235L5.58115 3.81318C5.4659 3.69374 5.32802 3.59845 5.17554 3.53287C5.02307 3.46728 4.85906 3.43272 4.69309 3.4312C4.52711 3.42968 4.3625 3.46123 4.20885 3.52401C4.0552 3.58679 3.91559 3.67954 3.79817 3.79685C3.68075 3.91416 3.58787 4.05368 3.52495 4.20727C3.46202 4.36086 3.43032 4.52545 3.43168 4.69142C3.43305 4.8574 3.46745 5.02144 3.53289 5.17397C3.59833 5.32651 3.69349 5.46448 3.81282 5.57985L8.23365 9.99985L3.81365 14.4198C3.69432 14.5352 3.59916 14.6732 3.53372 14.8257C3.46828 14.9783 3.43388 15.1423 3.43252 15.3083C3.43115 15.4742 3.46286 15.6388 3.52578 15.7924C3.5887 15.946 3.68159 16.0855 3.79901 16.2028C3.91643 16.3202 4.05604 16.4129 4.20969 16.4757C4.36333 16.5385 4.52795 16.57 4.69392 16.5685C4.85989 16.567 5.0239 16.5324 5.17638 16.4668C5.32885 16.4012 5.46674 16.306 5.58199 16.1865L10.0003 11.7682Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_2339_68">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
      </div>
  </div>
  <div class="modal-content">
      <div class="btn-container">
          <span>test</span>
      </div>
  </div>
  `
};
