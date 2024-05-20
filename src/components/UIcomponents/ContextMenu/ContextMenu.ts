import DesktopIcon from "../ClickableIcon/DesktopIcon";
import { Template, BaseWindow } from "../Window/BaseWindow";
import "./context-menu.css"

export default class ContextMenu {
    private context: HTMLElement;

    constructor() {
        this.context = document.createElement('div');
        this.context.id = 'context-menu';

        this.context.innerHTML = template;

        document.body.appendChild(this.context);

        document.body.addEventListener('contextmenu', (e: MouseEvent) => {
            this.context.classList.add('visible');
            const { clientX: x, clientY: y } = e;
            this.context.style.left = x+"px";
            this.context.style.top = y+"px";
        });

        this.context.querySelector('#create-desktop-icon')
                .addEventListener('click', () => {
                    new DesktopIcon({
                        parent: document.body,
                        name: "dzqdqzdqzdqzdqz",
                        x: this.context.offsetLeft,
                        y: this.context.offsetTop
                    });
                    this.context.classList.remove('visible');
        })

        this.context.querySelector('#open-new-window')
                .addEventListener('click', (e: MouseEvent) => {

                    new BaseWindow({
                        template: Template,
                        x: this.context.offsetLeft, y: this.context.offsetTop,
                        width: 200, height: 200
                    });
                    this.context.classList.remove('visible');
                })

        document.body.addEventListener('click', () => {
            this.context.classList.remove('visible');
        })
    }
}


const template = `
    <ul>
        <li id="create-desktop-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                <g transform="scale(5.12,5.12)">
                    <path d="M19.852,7.761l-15,2.25c-0.49,0.074 -0.852,0.494 -0.852,0.989v12c0,0.553 0.448,1 1,1h15c0.552,0 1,-0.447 1,-1v-14.25c0,-0.291 -0.127,-0.567 -0.348,-0.758c-0.22,-0.189 -0.513,-0.271 -0.8,-0.231zM45.652,4.242c-0.22,-0.189 -0.512,-0.271 -0.801,-0.231l-21,3.15c-0.489,0.074 -0.851,0.494 -0.851,0.989v14.85c0,0.553 0.448,1 1,1h21c0.552,0 1,-0.447 1,-1v-18c0,-0.291 -0.127,-0.567 -0.348,-0.758zM20,26h-15c-0.552,0 -1,0.447 -1,1v12c0,0.495 0.362,0.915 0.852,0.989l15,2.25c0.05,0.007 0.099,0.011 0.148,0.011c0.238,0 0.47,-0.085 0.652,-0.242c0.221,-0.191 0.348,-0.467 0.348,-0.758v-14.25c0,-0.553 -0.448,-1 -1,-1zM45,26h-21c-0.552,0 -1,0.447 -1,1v14.85c0,0.495 0.362,0.915 0.852,0.989l21,3.15c0.049,0.007 0.099,0.011 0.148,0.011c0.238,0 0.47,-0.085 0.652,-0.242c0.221,-0.191 0.348,-0.467 0.348,-0.758v-18c0,-0.553 -0.448,-1 -1,-1z"></path>
                </g>
                </g>
            </svg>
            <span>Create desktop icon</span>
        </li>
        <li id="open-new-window">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                <g transform="scale(5.12,5.12)">
                    <path d="M19.852,7.761l-15,2.25c-0.49,0.074 -0.852,0.494 -0.852,0.989v12c0,0.553 0.448,1 1,1h15c0.552,0 1,-0.447 1,-1v-14.25c0,-0.291 -0.127,-0.567 -0.348,-0.758c-0.22,-0.189 -0.513,-0.271 -0.8,-0.231zM45.652,4.242c-0.22,-0.189 -0.512,-0.271 -0.801,-0.231l-21,3.15c-0.489,0.074 -0.851,0.494 -0.851,0.989v14.85c0,0.553 0.448,1 1,1h21c0.552,0 1,-0.447 1,-1v-18c0,-0.291 -0.127,-0.567 -0.348,-0.758zM20,26h-15c-0.552,0 -1,0.447 -1,1v12c0,0.495 0.362,0.915 0.852,0.989l15,2.25c0.05,0.007 0.099,0.011 0.148,0.011c0.238,0 0.47,-0.085 0.652,-0.242c0.221,-0.191 0.348,-0.467 0.348,-0.758v-14.25c0,-0.553 -0.448,-1 -1,-1zM45,26h-21c-0.552,0 -1,0.447 -1,1v14.85c0,0.495 0.362,0.915 0.852,0.989l21,3.15c0.049,0.007 0.099,0.011 0.148,0.011c0.238,0 0.47,-0.085 0.652,-0.242c0.221,-0.191 0.348,-0.467 0.348,-0.758v-18c0,-0.553 -0.448,-1 -1,-1z"></path>
                </g>
                </g>
            </svg>
            <span>Open new window</span>
        </li>
    </ul>
`;