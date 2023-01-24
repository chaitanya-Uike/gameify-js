"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RectEntity_1 = require("../core/RectEntity");
const sphericalEntity_1 = require("../core/sphericalEntity");
const utils_1 = require("../utils");
const vector_1 = require("../core/vector");
class PhysicsEngine {
    constructor() {
        this.nullVelocity = new vector_1.default();
    }
    getVelocityAfterCollision(entity1, entity2) {
        const e1isRect = entity1 instanceof RectEntity_1.default;
        const e2isRect = entity2 instanceof RectEntity_1.default;
        const e1isSphere = entity1 instanceof sphericalEntity_1.default;
        const e2isShphere = entity2 instanceof sphericalEntity_1.default;
        // not handling collision between RectEntities right now
        if (e1isSphere && e2isRect) {
            const details = this.handleSphereRectCollision(entity1, entity2);
            return { velocity1: details.sphereVelocity, velocity2: details.rectVelocity };
        }
        else if (e1isRect && e2isShphere) {
            const details = this.handleSphereRectCollision(entity2, entity1);
            return { velocity1: details.rectVelocity, velocity2: details.sphereVelocity };
        }
        else if (e1isSphere && e2isShphere) {
            return this.handleSpheresCollision(entity1, entity2);
        }
        return { velocity1: new vector_1.default(), velocity2: this.nullVelocity };
    }
    handleSphereRectCollision(sphere, rect) {
        const surfaceNormal = this.getCollisionNormal(sphere, rect);
        const sphereVelocity = this.bounce(surfaceNormal, sphere.velocity);
        return { sphereVelocity, rectVelocity: this.nullVelocity };
    }
    bounce(surfaceNormal, velocity) {
        const temp = surfaceNormal.scalerMultiply(-2 * surfaceNormal.dot(velocity));
        return velocity.add(temp);
    }
    getCollisionNormal(sphere, rect) {
        const cX = sphere.getCenter().x;
        const cY = sphere.getCenter().y;
        const rX = rect.position.x;
        const rY = rect.position.y;
        const rW = rect.width;
        const rH = rect.height;
        const rA = rect.rotation;
        const eX = rW / 2;
        const eY = rH / 2;
        const rCX = rX + eX;
        const rCY = rY + eY;
        const uxX = Math.cos(rA);
        const uxY = Math.sin(rA);
        const uyX = Math.cos(rA - (0, utils_1.degreeToRadian)(90));
        const uyY = Math.sin(rA - (0, utils_1.degreeToRadian)(90));
        const distanceX = cX - rCX;
        const distanceY = cY - rCY;
        let dx = distanceX * uxX + distanceY * uxY;
        let dy = distanceX * uyX + distanceY * uyY;
        if (dx > eX) {
            dx = eX;
        }
        if (dx < -eX) {
            dx = -eX;
        }
        if (dy > eY) {
            dy = eY;
        }
        if (dy < -eY) {
            dy = -eY;
        }
        const pX = rCX + dx * uxX + dy * uyX;
        const pY = rCY + dx * uxY + dy * uyY;
        const deltaX = cX - pX;
        const deltaY = cY - pY;
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (magnitude === 0) {
            return vector_1.default.fromComponents(0, 0);
        }
        else {
            return vector_1.default.fromComponents(deltaX / magnitude, deltaY / magnitude);
        }
    }
    handleSpheresCollision(entity1, entity2) {
        const xVelocityDiff = entity1.velocity.x - entity2.velocity.x;
        const yVelocityDiff = entity1.velocity.y - entity2.velocity.y;
        const xDist = entity2.getCenter().x - entity1.getCenter().x;
        const yDist = entity2.getCenter().y - entity1.getCenter().y;
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            const angle = -Math.atan2(entity2.getCenter().y - entity1.getCenter().y, entity2.getCenter().x - entity1.getCenter().x);
            const m1 = 1;
            const m2 = 1;
            const u1 = entity1.velocity.rotate(angle);
            const u2 = entity2.velocity.rotate(angle);
            const v1 = vector_1.default.fromComponents(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y);
            const v2 = vector_1.default.fromComponents(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y);
            const velocity1 = v1.rotate(-angle);
            const velocity2 = v2.rotate(-angle);
            return { velocity1, velocity2 };
        }
        return { velocity1: entity1.velocity, velocity2: entity2.velocity };
    }
}
exports.default = PhysicsEngine;
