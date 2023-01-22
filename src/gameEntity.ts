import Vector from "./vector";

export default abstract class GameEntity {
    position: Vector
    // velocity can only be changed by applying a force
    velocity: Vector = Vector.fromComponents(0, 0)
    mass: number
    isKinematic: boolean
    // all forces acting on a body
    forces: Vector[] = []
    ref: HTMLDivElement

    constructor(x: number, y: number, mass: number, isKinematic: boolean, elem: HTMLDivElement) {
        this.position = Vector.fromComponents(x, y)
        this.mass = mass
        this.isKinematic = isKinematic
        this.ref = elem

        this.ref.style.position = "absolute"
        this.setPosition()
    }

    setPosition() {
        this.ref.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
    }

    addForce(force: Vector) {
        this.forces.push(force)
    }
}