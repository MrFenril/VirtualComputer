import "./Taskbar.css";

export default class TaskBarPreview {
  private context: HTMLElement = null;

  get Context() {
    return this.context;
  }

  constructor(parent: HTMLElement, canvas: any) {
    const el: HTMLElement = document.createElement("div");
    el.innerHTML = template;
    el.classList.add("taskbar-preview");

    el.querySelector<HTMLElement>(".canvas-wrapper").appendChild(canvas);
    el.querySelector<HTMLElement>(".taskbar-preview-name").innerText = "lol";

    parent.appendChild(el);

    this.context = el;
  }
}

const template = `
    <div class="taskbar-preview-name">
    </div>
    <div class="canvas-wrapper">
    </div>
`;
