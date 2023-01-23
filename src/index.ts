import CollisionManager from "./collisionManager"
import GameEntity from "./gameEntity"
import KeyboardManager from "./keyboardManager"
import { degreeToRadian } from "./utils"
import Vector from "./vector"
import { Ball, Wall } from "./gameElements"


const playAreaWidth = 600
const playAreaHeight = 400

enum GameState {
    playing,
    paused,
    over,
    idle
}

class Game {
    playAreaRef: HTMLDivElement
    playAreaWidth: number
    playAreaHeight: number
    entities: GameEntity[] = []
    collisionManager = new CollisionManager(this.entities)
    keyboardManager = new KeyboardManager()
    state: GameState = GameState.idle

    constructor(playAreaSelector: string, playAreaWidth: number, playAreaHeight: number) {
        this.playAreaRef = document.querySelector(playAreaSelector) as HTMLDivElement
        this.playAreaRef.style.width = playAreaWidth + "px"
        this.playAreaRef.style.height = playAreaHeight + "px"
        this.playAreaWidth = playAreaWidth
        this.playAreaHeight = playAreaHeight
    }

    addEntity(arg: GameEntity[] | GameEntity) {
        if (Array.isArray(arg)) {
            arg.forEach(entity => {
                this.entities.push(entity)
                this.playAreaRef.appendChild(entity.ref)
            })
        } else {
            this.entities.push(arg)
            this.playAreaRef.appendChild(arg.ref)
        }
    }

    render() {
        if (this.state !== GameState.playing) return

        this.collisionManager.eventDispatcher()
        this.entities.forEach(entity => {
            entity.updatePosition()
        })
        requestAnimationFrame(this.render.bind(this))
    }

    play() {
        if (this.state === GameState.playing) return
        this.state = GameState.playing
        this.render()
    }

    pause() {
        this.state = GameState.paused
    }

    stop() {
        this.state = GameState.over
    }

    restart() {
        this.state = GameState.playing
    }
}

const game = new Game(".playArea", playAreaWidth, playAreaHeight)

const nullVector = new Vector()

const floor = new Wall(0, playAreaHeight, playAreaWidth, 5, 0, nullVector)
const rightWall = new Wall(playAreaWidth - playAreaHeight / 2, playAreaHeight / 2, playAreaHeight, 5, degreeToRadian(90), nullVector)
const ceiling = new Wall(0, 0, playAreaWidth, 5, 0, nullVector)
const leftWall = new Wall(-playAreaHeight / 2, playAreaHeight / 2, playAreaHeight, 5, degreeToRadian(90), nullVector)

const ball1 = new Ball(100, 200, 10, Vector.fromMagnitudeAndTheta(3, degreeToRadian(45)))
const ball2 = new Ball(300, 80, 20, Vector.fromMagnitudeAndTheta(3, degreeToRadian(60)))
const ball3 = new Ball(30, 30, 10, Vector.fromMagnitudeAndTheta(5, degreeToRadian(69)))
const ball4 = new Ball(30, 30, 10, Vector.fromMagnitudeAndTheta(5, degreeToRadian(30)))

const blockWidth = 100
const blockHeight = 100
const block = new Wall(playAreaWidth / 2 - blockWidth / 2, playAreaHeight / 2 - blockHeight / 2, blockWidth, blockHeight, 0, nullVector)

game.addEntity([floor, ceiling, leftWall, rightWall])
game.addEntity([ball1, ball2, ball3, ball4])
game.addEntity(block)

const playBtn = document.querySelector("#play") as HTMLButtonElement
const pauseBtn = document.querySelector("#pause") as HTMLButtonElement
const restartBtn = document.querySelector("#restart") as HTMLButtonElement

playBtn.onclick = () => { game.play() }
pauseBtn.onclick = () => { game.pause() }
restartBtn.onclick = () => { game.restart() }