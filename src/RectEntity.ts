import GameEntity from "./gameEntity";

abstract class RectEntity extends GameEntity {
    width: number
    height: number
    rotation: number = 0

    constructor(x: number, y: number, mass: number, width: number, height: number, rotation: number, isKinematic: boolean, elem: HTMLDivElement) {
        super(x, y, mass, isKinematic, elem)
        this.width = width
        this.height = height
        this.rotation = rotation
    }
}

export default RectEntity