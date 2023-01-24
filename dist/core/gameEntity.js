"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("./vector");
class GameEntity {
    constructor(x, y, velocity, elem) {
        this.position = vector_1.default.fromComponents(x, y);
        this.ref = elem;
        this.velocity = velocity;
        this.ref.style.position = "absolute";
        this.ref.style.transformOrigin = "center center";
    }
}
exports.default = GameEntity;
