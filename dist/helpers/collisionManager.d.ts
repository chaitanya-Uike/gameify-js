import GameEntity from "../core/gameEntity";
import RectEntity from "../core/RectEntity";
import SphericalEntity from "../core/sphericalEntity";
import PhysicsEngine from "./PhysicsEngine";
interface CollisionEvent {
    entity1: GameEntity;
    entity2: GameEntity;
    handler: Function;
}
export default class CollisionManager {
    physicsEngine: PhysicsEngine;
    events: CollisionEvent[];
    eventDispatcher(entities: GameEntity[]): void;
    onCollision(entity1: GameEntity, entity2: GameEntity, handler: Function): void;
    off(entity1: GameEntity, entity2: GameEntity, handler: Function): void;
    unsubscribe(): void;
    detectCollisionBetweenRects(rect1: RectEntity, rect2: RectEntity): boolean;
    detectCollisionBetweenSpheres(sphere1: SphericalEntity, sphere2: SphericalEntity): boolean;
    detectCollisionBetweenRectAndSphere(rect: RectEntity, sphere: SphericalEntity): boolean;
}
export {};
