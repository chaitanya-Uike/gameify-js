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

const nullVector = new Vector()

const floor = new Wall(0, playAreaHeight, playAreaWidth, 5, 0, nullVector)
const rightWall = new Wall(playAreaWidth - playAreaHeight / 2, playAreaHeight / 2, playAreaHeight, 5, degreeToRadian(90), nullVector)
const ceiling = new Wall(0, 0, playAreaWidth, 5, 0, nullVector)
const leftWall = new Wall(-playAreaHeight / 2, playAreaHeight / 2, playAreaHeight, 5, degreeToRadian(90), nullVector)

addEntity(floor)
addEntity(rightWall)
addEntity(ceiling)
addEntity(leftWall)


const ball1 = new Ball(100, 200, 10, Vector.fromMagnitudeAndTheta(3, degreeToRadian(45)))
const ball2 = new Ball(600, 80, 20, Vector.fromMagnitudeAndTheta(3, degreeToRadian(60)))
const ball3 = new Ball(30, 30, 25, Vector.fromMagnitudeAndTheta(5, degreeToRadian(69)))


addEntity(ball1)
addEntity(ball2)
addEntity(ball3)

const blockWidth = 100
const blockHeight = 100
const block = new Wall(playAreaWidth / 2 - blockWidth / 2, playAreaHeight / 2 - blockHeight / 2, blockWidth, blockHeight, 0, nullVector)

addEntity(block)


const collisionManager = new CollisionManager(gameEntities)

function play() {
    collisionManager.eventDispatcher()
    gameEntities.forEach(entity => {
        entity.updatePosition()
    })
    requestAnimationFrame(play)
}

play()