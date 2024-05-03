import { Window, MainTemplate } from "../components/UIcomponents/Window/Window";
import ContextMenu from "../components/UIcomponents/ContextMenu/ContextMenu";
import DesktopIcon from "../components/UIcomponents/ClickableIcon/DesktopIcon";
import TaskBar from "../components/UIcomponents/TaskBar/TaskBar";

const win = new Window({
    template: MainTemplate,
    x: 100,
    y: 100,
    width: 400,
    height: 400
});
new ContextMenu()

//@ts-ignore
const data = await window.electronAPI.shell.execute('ls Desktop')
for (let i = 0; i < data.content?.length; ++i) {
    const folderContent = data.content[i];

    new DesktopIcon({
        parent: document.body,
        name: folderContent.file,
        icon: "",
        x: 90 * i,
    });
}

new TaskBar({
    pinned: [
        {
            name: "test",
            icon: "test",
            click: (context: Window | null) => {
                if (!context) {
                    const w = new Window({
                        template: MainTemplate,
                        x: 100,
                        y: 100,
                        width: 400,
                        height: 400
                    });
                    return w;
                }
            }
        }
    ]
})