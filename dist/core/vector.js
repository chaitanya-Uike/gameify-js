"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor() {
        this.magnitude = 0;
        this.theta = 0;
        this.x = 0;
        this.y = 0;
    }
    static fromComponents(x, y) {
        const newVec = new Vector();
        newVec.x = x;
        newVec.y = y;
        newVec.magnitude = Math.sqrt(x * x + y * y);
        newVec.theta = Math.atan2(y, x);
        return newVec;
    }
    static fromMagnitudeAndTheta(magnitude, theta) {
        const newVec = new Vector();
        newVec.magnitude = magnitude;
        newVec.theta = theta;
        newVec.x = magnitude * Math.cos(theta);
        newVec.y = magnitude * Math.sin(theta);
        return newVec;
    }
    getAngleBetween(vector) {
        const N = this.x * vector.x + this.y * vector.y;
        const D = Math.sqrt(this.x * this.x + this.y * this.y) *
            Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        return Math.acos(N / D);
    }
    getDistanceBetween(vector) {
        return this.subtract(vector).magnitude;
    }
    getNormalVector() {
        const normal = new Vector();
        normal.magnitude = this.magnitude;
        normal.theta = this.theta;
        normal.x = this.x / this.magnitude;
        normal.y = this.y / this.magnitude;
        return normal;
    }
    add(vector) {
        const x = this.x + vector.x;
        const y = this.y + vector.y;
        return Vector.fromComponents(x, y);
    }
    subtract(vector) {
        const x = this.x - vector.x;
        const y = this.y - vector.y;
        return Vector.fromComponents(x, y);
    }
    scalerMultiply(s) {
        return Vector.fromComponents(this.x * s, this.y * s);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    getResultant(vector) {
        return Vector.fromComponents(this.x + vector.x, this.y + vector.y);
    }
    rotate(angle) {
        const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return Vector.fromComponents(x, y);
    }
}
exports.default = Vector;
