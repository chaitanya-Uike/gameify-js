import GameEntity from "../core/gameEntity";
import RectEntity from "../core/RectEntity";
import SphericalEntity from "../core/sphericalEntity";
import Vector from "../core/vector";
declare class PhysicsEngine {
    nullVelocity: Vector;
    getVelocityAfterCollision(entity1: GameEntity, entity2: GameEntity): {
        velocity1: Vector;
        velocity2: Vector;
    };
    handleSphereRectCollision(sphere: SphericalEntity, rect: RectEntity): {
        sphereVelocity: Vector;
        rectVelocity: Vector;
    };
    bounce(surfaceNormal: Vector, velocity: Vector): Vector;
    getCollisionNormal(sphere: SphericalEntity, rect: RectEntity): Vector;
    handleSpheresCollision(entity1: SphericalEntity, entity2: SphericalEntity): {
        velocity1: Vector;
        velocity2: Vector;
    };
}
export default PhysicsEngine;
