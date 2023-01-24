"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyboardManager {
    constructor() {
        this.keyholdTable = {};
        this.keyupTable = {};
        document.addEventListener("keydown", (e) => {
            if (this.keyholdTable[e.key])
                this.keyholdTable[e.key].isHeld = true;
            for (const key in this.keyholdTable) {
                const keyHandler = this.keyholdTable[key];
                if (keyHandler.isHeld) {
                    keyHandler.handlers.forEach((handler) => handler());
                }
            }
        });
        document.addEventListener("keyup", (e) => {
            if (this.keyholdTable[e.key])
                this.keyholdTable[e.key].isHeld = false;
            for (const key in this.keyupTable) {
                this.keyupTable[key].forEach((handler) => handler());
            }
        });
    }
    on(event, key, handler) {
        if (event === "keydown") {
            if (!this.keyholdTable[key])
                this.keyholdTable[key] = { isHeld: false, handlers: [] };
            this.keyholdTable[key].handlers.push(handler);
        }
        else if (event === "keyup") {
            if (!this.keyupTable[key])
                this.keyupTable[key] = [];
            this.keyupTable[key].push(handler);
        }
    }
    off(event, key, handler) {
        if (event === "keydown") {
            if (!this.keyholdTable[key])
                return;
            const index = this.keyholdTable[key].handlers.findIndex((eventhandler) => eventhandler === handler);
            this.keyholdTable[key].handlers.splice(index, 1);
            if (this.keyholdTable[key].handlers.length === 0)
                delete this.keyholdTable[key];
        }
        else if (event === "keyup") {
            if (!this.keyupTable[key])
                return;
            const index = this.keyupTable[key].findIndex((eventHandler) => eventHandler === handler);
            this.keyupTable[key].splice(index, 1);
            if (this.keyupTable[key].length === 0)
                delete this.keyupTable[key];
        }
    }
    unsubscribe() {
        this.keyholdTable = {};
        this.keyupTable = {};
    }
}
exports.default = KeyboardManager;
