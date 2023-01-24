import GameEntity from "./gameEntity";
import Vector from "./vector";
declare abstract class RectEntity extends GameEntity {
    width: number;
    height: number;
    rotation: number;
    constructor(x: number, y: number, width: number, height: number, rotation: number, velocity: Vector);
    updatePosition(): void;
    getCenter(): Vector;
}
export default RectEntity;
