export default class Vector {
    magnitude: number;
    theta: number;
    x: number;
    y: number;
    static fromComponents(x: number, y: number): Vector;
    static fromMagnitudeAndTheta(magnitude: number, theta: number): Vector;
    getAngleBetween(vector: Vector): number;
    getDistanceBetween(vector: Vector): number;
    getNormalVector(): Vector;
    add(vector: Vector): Vector;
    subtract(vector: Vector): Vector;
    scalerMultiply(s: number): Vector;
    dot(vector: Vector): number;
    getResultant(vector: Vector): Vector;
    rotate(angle: number): Vector;
}
