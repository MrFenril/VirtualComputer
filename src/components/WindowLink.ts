import { addElement } from "../helpers";
import { Window } from "./UIcomponents/Window/Window"

export default class Link {

    private _start:         Window;
    private _end:           Window;
    private _context:       HTMLElement;

    constructor(start: Window, end: Window) {
        this._start = start;
        this._end = end;


        this._start.onMoveEvent(this.update.bind(this));
        this._end.onMoveEvent(this.update.bind(this));

        this._context = addElement(document.body, linkElement);

        this.update();
    }

    public get prev() {
        return this._start;
    }
    public set prev(start) {
        this._start = start;
    }


    public get next() {
        return this._end;
    }
    public set next(end) {
        this._end = end;
    }

    private update(x: number = 0, y: number = 0) {

        const startBound = this._start.context.getBoundingClientRect();
        const endBound = this._end.context.getBoundingClientRect();

        const x1: string = (startBound.x + startBound.width).toString();
        const y1: string = (startBound.y + startBound.height / 2).toString();
        const x2: string = endBound.x.toString();
        const y2: string = (endBound.y + endBound.height/2).toString();

        this._context.querySelector("line")!.setAttribute('x1', x1);
        this._context.querySelector("line")!.setAttribute('y1', y1);

        this._context.querySelector("line")!.setAttribute('x2', x2)
        this._context.querySelector("line")!.setAttribute('y2', y2);
    }
}

const linkElement = `
<svg style="position: absolute; top: 0px; left: 0px;" width="100%" height="100%">
    <line style="position: absolute" stroke="white" stroke-width="2"/>
</svg>
`