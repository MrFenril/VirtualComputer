export interface Events {
    [key: string]: ((...args: unknown[]) => void)[];
}

export default class EventEmitter {
    protected events: Events = {};

    public addEventListener(
        eventName: string,
        handler: (...args: unknown[]) => void
    ) {
        if (!this.events[eventName]) this.events[eventName] = [];

        this.events[eventName].push(handler);
    }

    protected emits(eventName: string, ...params: unknown[]) {
        if (!this.events[eventName]) return;

        for (const handlers of this.events[eventName]) {
            handlers(...params);
        }
    }
}
