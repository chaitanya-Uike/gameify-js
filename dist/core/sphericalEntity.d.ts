import GameEntity from "./gameEntity";
import Vector from "./vector";
declare abstract class SphericalEntity extends GameEntity {
    radius: number;
    constructor(x: number, y: number, radius: number, velocity: Vector);
    getCenter(): Vector;
    updatePosition(): void;
}
export default SphericalEntity;
