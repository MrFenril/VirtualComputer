
export enum ESystemObjectType {
    FILE,
    FOLDER,
    EXECUTABLE,

    // TODO: Find a way to handle this kind of file as a sub file type
    // IMG,
    // SOUND,
    // SHORTCUT
}

export interface ISystemObjectProps {
    name: string,
    icon: string,
    path: string,
    type: ESystemObjectType,
    associatedExecutable: any
}

export default class SystemObject {
    private properties: ISystemObjectProps
    public get Properties() { return this.properties }

    constructor() {
        console.log(this.properties);
    }
}