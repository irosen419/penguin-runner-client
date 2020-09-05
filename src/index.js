const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let score;
let scoreText;
let highscore;
let highscoreText;
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

//Game Functions

function spawnRock() {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 1)
    console.log(canvas.width, size)
    let rock = new Rock(canvas.width + size, canvas.height - size, size, size, '#2484E4')

    if (type == 1) {
        rock.y -= player.originalHeight - 10
    }
    rocks.push(rock)
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}



function start() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;

    // if (localStorage.getItem('highscore')) {
    //     highscore = localStorage.getItem('highscore');
    // }

    player = new Player(25, 0, 50, 50, '#FF5858')

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20")
    highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20")
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

        spawnTimer = initialSpawnTimer - (gameSpeed * 8)

        if (spawnTimer < 60) {
            spawnTimer = 60
        }
    }

    // Spawn Rocks
    for (let i = 0; i < rocks.length; i++) {
        let r = rocks[i]


        if (r.x + r.w < 0) {
            rocks.splice(i, 1)
        }

        if (player.x < r.x + r.w && player.x + player.w > r.x && player.y < r.y + r.h && player.y + player.h > r.y) {
            rocks = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            // window.localStorage.setItem('highscore', highscore)
        }


        r.update()
    }

    player.animate()

    score++;
    scoreText.t = "Score:" + score;
    scoreText.draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = "Highscore: " + highscore;
    }

    highscoreText.draw()

    gameSpeed += 0.003
}

start()