import ContextMenu from "../components/UIcomponents/ContextMenu/ContextMenu";
import DesktopIcon from "../components/UIcomponents/ClickableIcon/DesktopIcon";
import TaskBar from "../components/UIcomponents/TaskBar/TaskBar";
import TaskManager from "../components/TaskManager";
import ShellDisplay, {
    ShellTemplate
} from "../components/UIcomponents/Shell/ShellDisplay";

(async () => {
    new ContextMenu();

    //@ts-ignore
    const data = await window.electronAPI.shell.execute("ls Desktop");
    for (let i = 0; i < data.content?.length; ++i) {
        const folderContent = data.content[i];

        new DesktopIcon({
            parent: document.body,
            name: folderContent.file,
            icon: "",
            x: 90 * i
        });
    }

    new ShellDisplay({
        template: ShellTemplate,
        windowName: "Shell",
        x: 300,
        y: 100,
        width: 700,
        height: 400
    });

    TaskManager.LoadProcess("BaseWindow");

    new TaskBar();
})();
