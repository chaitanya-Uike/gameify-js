export default class KeyboardManager {
    keyholdTable: keydownTable;
    keyupTable: keyupTable;
    constructor();
    on(event: string, key: string, handler: Function): void;
    off(event: string, key: string, handler: Function): void;
    unsubscribe(): void;
}
