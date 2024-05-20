import ContextMenu from "../components/UIcomponents/ContextMenu/ContextMenu";
import DesktopIcon from "../components/UIcomponents/ClickableIcon/DesktopIcon";
import TaskBar from "../components/UIcomponents/TaskBar/TaskBar";
import System from "../components/System/System";
import { ISystemInitObj } from "../types";

(async () => {
    const initObj: ISystemInitObj = await window.electronAPI.environment.init() as ISystemInitObj;

    await System.init(initObj);
    // new System();
    System.LoadProcess('ShellDisplay', '')

    new ContextMenu();

    // TODO: Set an interface for return type
    const data: any = await window.electronAPI.shell.execute("ls Desktop");

    for (let i = 0; i < data.content?.length; ++i) {
        const folderContent = data.content[i];

        new DesktopIcon({
            parent: document.body,
            name: folderContent.file,
            icon: "",
            x: 90 * i
        });
    }


    new TaskBar();
})();
