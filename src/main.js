const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let score;
let highscore;
let player;
let gravity;
let rocks = [];
let gameSpeed
let KEYS = {};

//Event Listeners

document.addEventListener('keydown', e => {
    KEYS[e.code] = true
})
document.addEventListener('keyup', e => {
    KEYS[e.code] = false
})

function spawnRock() {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 1)
    let rock = new Rock(canvas.width + size, canvas.height - size, size, size, '#FFFFFF')

    if (type == 1) {
        rock.y -= player.originalHeight - 10
    }
    rocks.push(rock)
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (min - max) - min)
}

//Game Functions

function start() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highScore = 0;

    player = new Player(25, canvas.height - 150, 50, 50, '#FF5858')
    requestAnimationFrame(update)
}

let initialSpawnTimer = 200
let spawnTimer = initialSpawnTimer
function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spawnTimer--;

    if (spawnTimer <= 0) {
        spawnRock()
        spawnTimer = initialSpawnTimer - gameSpeed * 8

        if (spawnTimer < 60) {
            spawnTimer = 60
        }
    }

    // Spawn Rocks

    for (let i = 0; i < rocks.length; i++) {
        let r = rocks[i]
        r.update()
    }

    player.animate()

}

start()