"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameEntity_1 = require("./gameEntity");
const vector_1 = require("./vector");
class SphericalEntity extends gameEntity_1.default {
    constructor(x, y, radius, velocity) {
        const top = y - radius;
        const left = x - radius;
        const div = document.createElement("div");
        div.style.width = 2 * radius + "px";
        div.style.height = 2 * radius + "px";
        super(left, top, velocity, div);
        this.radius = radius;
        this.ref.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
    getCenter() {
        const top = this.position.y;
        const left = this.position.x;
        return vector_1.default.fromComponents(left + this.radius, top + this.radius);
    }
    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.ref.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
}
exports.default = SphericalEntity;
