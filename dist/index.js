"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const collisionManager_1 = require("./helpers/collisionManager");
const keyboardManager_1 = require("./helpers/keyboardManager");
var GameState;
(function (GameState) {
    GameState[GameState["playing"] = 0] = "playing";
    GameState[GameState["paused"] = 1] = "paused";
    GameState[GameState["over"] = 2] = "over";
    GameState[GameState["idle"] = 3] = "idle";
})(GameState = exports.GameState || (exports.GameState = {}));
class Game {
    constructor(playAreaSelector, playAreaWidth, playAreaHeight) {
        this.entities = [];
        this.collisionManager = new collisionManager_1.default();
        this.keyboardManager = new keyboardManager_1.default();
        this.state = GameState.idle;
        this.playAreaRef = document.querySelector(playAreaSelector);
        this.playAreaRef.style.width = playAreaWidth + "px";
        this.playAreaRef.style.height = playAreaHeight + "px";
        this.playAreaWidth = playAreaWidth;
        this.playAreaHeight = playAreaHeight;
        this.initialize();
    }
    addEntity(arg) {
        if (Array.isArray(arg)) {
            arg.forEach(entity => {
                this.entities.push(entity);
                this.playAreaRef.appendChild(entity.ref);
            });
        }
        else {
            this.entities.push(arg);
            this.playAreaRef.appendChild(arg.ref);
        }
    }
    render() {
        if (this.state !== GameState.playing)
            return;
        this.collisionManager.eventDispatcher(this.entities);
        this.entities.forEach(entity => {
            entity.updatePosition();
        });
        requestAnimationFrame(this.render.bind(this));
    }
    play() {
        if (this.state === GameState.playing)
            return;
        this.state = GameState.playing;
        this.render();
    }
    pause() {
        this.state = GameState.paused;
    }
    stop() {
        this.state = GameState.over;
        this.onGameOver();
    }
    reset() {
        this.playAreaRef.innerHTML = "";
        this.entities = [];
        this.collisionManager.unsubscribe();
        this.keyboardManager.unsubscribe();
        this.initialize();
    }
    // override this method as needed
    onGameOver() { }
}
exports.default = Game;
