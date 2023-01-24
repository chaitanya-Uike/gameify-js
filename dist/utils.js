"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radianToDegree = exports.degreeToRadian = void 0;
function degreeToRadian(angle) {
    return (angle * Math.PI) / 180;
}
exports.degreeToRadian = degreeToRadian;
function radianToDegree(angle) {
    return (angle * 180) / Math.PI;
}
exports.radianToDegree = radianToDegree;
