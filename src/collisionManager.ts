import GameEntity from "./gameEntity";
import RectEntity from "./RectEntity";
import SphericalEntity from "./sphericalEntity";
import PhysicsEngine from "./PhysicsEngine";

export default class CollisionManager {
    physicsEngine: PhysicsEngine = new PhysicsEngine()
    entities: GameEntity[]

    constructor(entities: GameEntity[]) {
        this.entities = entities
    }

    eventDispatcher() {
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const entity1 = this.entities[i]
                const entity2 = this.entities[j]

                const e1isRect = entity1 instanceof RectEntity
                const e2isRect = entity2 instanceof RectEntity
                const e1isSphere = entity1 instanceof SphericalEntity
                const e2isShphere = entity2 instanceof SphericalEntity

                if (e1isRect && e2isRect) {
                    if (this.detectCollisionBetweenRects(entity1, entity2)) {
                        // dispatch event if present
                    }
                }
                else if (e1isSphere && e2isShphere) {
                    if (this.detectCollisionBetweenSpheres(entity1, entity2)) {
                        // dispatch event if present

                        const collisionDetails = this.physicsEngine.getVelocityAfterCollision(entity1, entity2)

                        entity1.velocity = collisionDetails.velocity1
                        entity2.velocity = collisionDetails.velocity2
                    }
                }
                else if (e1isRect && e2isShphere) {
                    if (this.detectCollisionBetweenRectAndSphere(entity1, entity2)) {
                        const collisionDetails = this.physicsEngine.getVelocityAfterCollision(entity1, entity2)

                        entity1.velocity = collisionDetails.velocity1
                        entity2.velocity = collisionDetails.velocity2
                    }
                } else if (e1isSphere && e2isRect) {
                    if (this.detectCollisionBetweenRectAndSphere(entity2, entity1)) {
                        console.log("here", entity1.getCenter())
                        const collisionDetails = this.physicsEngine.getVelocityAfterCollision(entity1, entity2)

                        entity1.velocity = collisionDetails.velocity1
                        entity2.velocity = collisionDetails.velocity2
                    }
                }
            }
        }
    }

    detectCollisionBetweenRects(rect1: RectEntity, rect2: RectEntity): boolean {
        if (
            rect1.position.x < rect2.position.x + rect2.width &&
            rect1.position.x + rect1.width > rect2.position.x &&
            rect1.position.y < rect2.position.y + rect2.height &&
            rect1.height + rect1.position.y > rect2.position.y
        )
            return true;

        return false;
    }

    detectCollisionBetweenSpheres(sphere1: SphericalEntity, sphere2: SphericalEntity) {
        if (sphere1.getCenter().getDistanceBetween(sphere2.getCenter()) <= sphere1.radius + sphere2.radius)
            return true
        return false
    }

    detectCollisionBetweenRectAndSphere(rect: RectEntity, sphere: SphericalEntity) {
        const cx = sphere.getCenter().x
        const cy = sphere.getCenter().y

        const rx = rect.position.x
        const ry = rect.position.y
        const rw = rect.width
        const rh = rect.height

        let testX = cx
        let testY = cy

        if (cx < rx) testX = rx;
        else if (cx > rx + rw) testX = rx + rw;
        if (cy < ry) testY = ry;
        else if (cy > ry + rh) testY = ry + rh;

        const distX = cx - testX;
        const distY = cy - testY;
        const distance = Math.sqrt((distX * distX) + (distY * distY))

        if (distance <= sphere.radius)
            return true
        return false
    }

}