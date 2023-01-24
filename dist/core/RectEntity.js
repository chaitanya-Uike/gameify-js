"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameEntity_1 = require("./gameEntity");
const utils_1 = require("../utils");
const vector_1 = require("./vector");
class RectEntity extends gameEntity_1.default {
    constructor(x, y, width, height, rotation, velocity) {
        const div = document.createElement("div");
        div.style.width = width + "px";
        div.style.height = height + "px";
        super(x, y, velocity, div);
        this.rotation = 0;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.ref.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(${(0, utils_1.radianToDegree)(this.rotation)}deg)`;
    }
    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.ref.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(${(0, utils_1.radianToDegree)(this.rotation)}deg)`;
    }
    getCenter() {
        const x = this.position.x + this.width / 2;
        const y = this.position.y + this.height / 2;
        return vector_1.default.fromComponents(x, y);
    }
}
exports.default = RectEntity;
