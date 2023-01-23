import RectEntity from "./RectEntity"
import CollisionManager from "./collisionManager"
import GameEntity from "./gameEntity"
import SphericalEntity from "./sphericalEntity"
import { degreeToRadian } from "./utils"
import Vector from "./vector"

const playArea = document.querySelector(".playArea") as HTMLDivElement


const playAreaWidth = 800
const playAreaHeight = 600

playArea.style.width = playAreaWidth + "px"
playArea.style.height = playAreaHeight + "px"


class Ball extends SphericalEntity {
    constructor(x: number, y: number, radius: number, velocity: Vector) {
        super(x, y, radius, velocity)
        this.ref.classList.add("ball")
    }
}

class Wall extends RectEntity {
    constructor(x: number, y: number, width: number, height: number, rotation: number, velocity: Vector) {
        super(x, y, width, height, rotation, velocity)
        this.ref.classList.add("wall")
    }
}

const gameEntities: GameEntity[] = []

function addEntity(entity: GameEntity) {
    gameEntities.push(entity)
    playArea.appendChild(entity.ref)
}

const ball = new Ball(20, 20, 10, Vector.fromMagnitudeAndTheta(1, degreeToRadian(45)))
const floor = new Wall(0, playAreaHeight, playAreaWidth, 5, degreeToRadian(0), new Vector())
const rightWall = new Wall(playAreaWidth, 0, playAreaHeight, 5, degreeToRadian(90), new Vector())

addEntity(ball)
addEntity(floor)
addEntity(rightWall)

const collisionManager = new CollisionManager(gameEntities)

function play() {
    collisionManager.eventDispatcher()

    gameEntities.forEach(entity => {
        entity.updatePosition()
    })
    requestAnimationFrame(play)
}

play()