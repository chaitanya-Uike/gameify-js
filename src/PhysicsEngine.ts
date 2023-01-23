import RectEntity from "./RectEntity";
import GameEntity from "./gameEntity";
import SphericalEntity from "./sphericalEntity";
import { degreeToRadian } from "./utils";
import Vector from "./vector";

interface collisionDetails {
    velocity1: Vector
    velocity2: Vector
}


// TODO refactor this
class PhysicsEngine {
    getVelocityAfterCollision(entity1: GameEntity, entity2: GameEntity): collisionDetails {
        // not handling collision between RectEntities right now
        if (entity1 instanceof SphericalEntity && entity2 instanceof RectEntity) {
            const surfaceNormal = this.getCollisionNormal(entity1.getCenter().x, entity1.getCenter().y, entity2.position.x, entity2.position.y, entity2.width, entity2.height, entity2.rotation)
            const velocity1 = this.bounce(surfaceNormal, entity1.velocity)

            return { velocity1, velocity2: new Vector() }
        } else if (entity1 instanceof RectEntity && entity2 instanceof SphericalEntity) {
            const surfaceNormal = this.getCollisionNormal(entity2.getCenter().x, entity2.getCenter().y, entity1.position.x, entity1.position.y, entity1.width, entity1.height, entity1.rotation)

            const velocity2 = this.bounce(surfaceNormal, entity2.velocity)

            return { velocity2, velocity1: new Vector() }
        } else if (entity1 instanceof SphericalEntity && entity2 instanceof SphericalEntity) {
            console.log(3)
            const velocity1 = this.twoDElasticCollision(entity1, entity2)
            const velocity2 = this.twoDElasticCollision(entity2, entity1)

            return { velocity1, velocity2 }
        }

        return { velocity1: new Vector(), velocity2: new Vector() }
    }

    bounce(surfaceNormal: Vector, velocity: Vector): Vector {
        const temp = surfaceNormal.scalerMultiply(-2 * surfaceNormal.dot(velocity));
        return velocity.add(temp);
    }

    getCollisionNormal(cX: number, cY: number, rX: number, rY: number, rW: number, rH: number, rA: number) {
        const eX = rW / 2;
        const eY = rH / 2;

        const rCX = rX + eX;
        const rCY = rY + eY;

        const uxX = Math.cos(rA);
        const uxY = Math.sin(rA);

        const uyX = Math.cos(rA - degreeToRadian(90))
        const uyY = Math.sin(rA - degreeToRadian(90));

        const distanceX = cX - rCX;
        const distanceY = cY - rCY;

        let dx = distanceX * uxX + distanceY * uxY;
        let dy = distanceX * uyX + distanceY * uyY;

        if (dx > eX) { dx = eX; }
        if (dx < -eX) { dx = -eX; }
        if (dy > eY) { dy = eY; }
        if (dy < -eY) { dy = -eY; }

        const pX = rCX + dx * uxX + dy * uyX;
        const pY = rCY + dx * uxY + dy * uyY;

        const deltaX = cX - pX;
        const deltaY = cY - pY;

        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (magnitude === 0) {
            return Vector.fromComponents(0, 0)
        } else {
            return Vector.fromComponents(deltaX / magnitude, deltaY / magnitude)
        }
    }

    twoDElasticCollision(entity1: SphericalEntity, entity2: SphericalEntity): Vector {
        const m2 = 1
        const m1 = 1

        const x1 = entity1.getCenter()
        const x2 = entity2.getCenter()

        const v1 = entity1.velocity
        const v2 = entity2.velocity

        const term1 = 2 * m2 / (m1 + m2)
        const term2 = (v1.subtract(v2)).dot(x1.subtract(x2)) / (((x1.subtract(x2)).magnitude) ^ 2)
        const term3 = x1.subtract(x2)

        return term3.scalerMultiply(term1 * term2)
    }
}

export default PhysicsEngine
