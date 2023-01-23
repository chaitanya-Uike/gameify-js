import SphericalEntity from "./sphericalEntity"
import RectEntity from "./RectEntity"
import Vector from "./vector"

export class Ball extends SphericalEntity {
    constructor(x: number, y: number, radius: number, velocity: Vector) {
        super(x, y, radius, velocity)
        this.ref.classList.add("ball")
    }
}

export class Wall extends RectEntity {
    constructor(x: number, y: number, width: number, height: number, rotation: number, velocity: Vector) {
        super(x, y, width, height, rotation, velocity)
        this.ref.classList.add("wall")
    }
}
