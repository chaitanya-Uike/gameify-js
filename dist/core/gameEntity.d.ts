import Vector from "./vector";
export default abstract class GameEntity {
    position: Vector;
    velocity: Vector;
    ref: HTMLDivElement;
    constructor(x: number, y: number, velocity: Vector, elem: HTMLDivElement);
    abstract updatePosition(): void;
    abstract getCenter(): Vector;
}
