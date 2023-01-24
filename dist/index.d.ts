import CollisionManager from "./helpers/collisionManager";
import GameEntity from "./core/gameEntity";
import KeyboardManager from "./helpers/keyboardManager";
export declare enum GameState {
    playing = 0,
    paused = 1,
    over = 2,
    idle = 3
}
export default abstract class Game {
    playAreaRef: HTMLDivElement;
    playAreaWidth: number;
    playAreaHeight: number;
    entities: GameEntity[];
    collisionManager: CollisionManager;
    keyboardManager: KeyboardManager;
    state: GameState;
    constructor(playAreaSelector: string, playAreaWidth: number, playAreaHeight: number);
    abstract initialize(): void;
    addEntity(arg: GameEntity[] | GameEntity): void;
    render(): void;
    play(): void;
    pause(): void;
    stop(): void;
    reset(): void;
    onGameOver(): void;
}
