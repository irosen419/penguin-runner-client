const qs = (selector) => document.querySelector(selector)
const ce = (element) => document.createElement(element)

const canvas = qs("#game")
const ctx = canvas.getContext("2d")
let achievementDiv = qs('#achievement')
let form = qs('form')

let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let rocks = [];
let gameSpeed
let KEYS = {};
let users = [];

// Music
let music;

// User Attributes
let userId;

// Achievement Variables
let rockCounter;
let gameRocks = 0;

// Achievement Truthiness
let fiftyRocks = false
let hundoRocks = false
let twofiddyRocks = false

let twentyFiveGameRocks = false
let fiddyGameRocks = false
let hundoGameRocks = false

// Modal Page Variables

let achievementList = []


document.addEventListener('submit', e => {
    if (e.target.matches('form')) {
        e.preventDefault()
        fetchFormInfo(form)
        form.setAttribute("hidden", "hidden")
    }
})

let userFetch = new FetchAdapter('http://localhost:3000/users/')

const fetchFormInfo = (form) => {
    const username = form.username.value
    fetchName(username)
}

const fetchName = (username) => {
    userFetch.get().then(users => grabUsername(users, username))
}

const signIn = (userId) => {
    userFetch.getUser(userId).then(user => {
        highscore = user.highscore;
        rockCounter = user.rocks_dodged;
        start(highscore);
    })
}

const signUp = (username) => {
    userFetch.postUser(username).then(user => {
        userId = user.id
        highscore = user.highscore;
        rockCounter = user.rocks_dodged;
        start(highscore)
    })
}

const findAchievements = () => {
    let achievement = new UserAchievement("AchievementFinder")
    achievement.check().then(data => {
        for (const userAchievement of data) {
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 1) {
                achievementList.push(userAchievement.achievement_id)
                fiftyRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 2) {
                achievementList.push(userAchievement.achievement_id)
                hundoRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 3) {
                achievementList.push(userAchievement.achievement_id)
                twofiddyRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 4) {
                achievementList.push(userAchievement.achievement_id)
                console.log('done')
                twentyFiveGameRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 5) {
                achievementList.push(userAchievement.achievement_id)
                fiddyGameRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 6) {
                achievementList.push(userAchievement.achievement_id)
                hundoGameRocks = true
            }
        }
    })
}

const grabUsername = (users, username) => {
    if (users.length > 0) {

        let user = users.find(function (u) {
            return u.username === username
        });

        if (user) {
            userId = user.id
            console.log(`Your current user is ${user.id}`)
            console.log("You are signing in")
            findAchievements()
            signIn(userId)
        } else {
            console.log('You are signing up. Thanks!')
            signUp(username)
        }

    } else {
        console.log("You are creating your very first user")
        signUp(username)
    }
}


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

    let rock = new Rock(canvas.width + size, canvas.height - size, size, size, '#2484E4')

    if (type == 1) {
        rock.y -= player.originalHeight - 10
    }
    rocks.push(rock)
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function start(highscore) {
    music = new Sound('styles/mp3/Chilly Road by Ryan Flynn .wav')
    music.createAudioTag()
    music.loop = true
    music.playMusic()

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;


    score = 0;

    player = new Player(250, 0, 50, 50, '#FF5858')

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20")
    highscoreText = new Text("High Score: " + highscore, canvas.width - 25, 25, "right", "#212121", "20")
    setInterval(requestAnimationFrame(update), 1000 / 30)

    document.addEventListener('keydown', e => {
        if (e.key === '-') {
            music.lowerVolume()
        } else if (e.key === '=') {
            music.raiseVolume()
        } else if (e.key === 'm') {
            music.muteVolume()
        }
    })

    let btn = qs('#myBtn')
    btn.style.display = "block"

}

// Chech For and Display Achievements

const giveAchievement = (rockCounter) => {
    if (rockCounter >= 50 && !fiftyRocks) {
        let achievement = new UserAchievement("50 Lifetime Rocks Dodged")
        achievement.fiftyBomb(userId).then(obj => {
            fiftyRocks = true
            displayAchievement()
        })
    }

    if (rockCounter >= 100 && !hundoRocks) {
        let achievement = new UserAchievement("100 Lifetime Rocks Dodged")
        achievement.hundoBomb(userId).then(obj => {
            hundoRocks = true
            displayAchievement()
        })
    }

    if (rockCounter >= 250 && !twofiddyRocks) {
        let achievement = new UserAchievement("250 Lifetime Rocks Dodged")
        achievement.twofiddyBomb(userId).then(obj => {
            twofiddyRocks = true
            displayAchievement()
        })
    }

    if (gameRocks >= 1 && !twentyFiveGameRocks) {
        let achievement = new UserAchievement("25 Rocks Dodged in One Game")
        console.log(userId)
        achievement.twentyFiveInGame(userId).then(obj => {
            console.log('25 in a game')
            twentyFiveGameRocks = true
            displayAchievement()
        })
    }
    if (gameRocks >= 5 && !fiddyGameRocks) {
        let achievement = new UserAchievement("50 Rocks Dodged in One Game")
        achievement.fiddyInGame(userId).then(obj => {
            fiddyGameRocks = true
            displayAchievement()
        })
    }
    if (gameRocks >= 100 && !hundoGameRocks) {
        let achievement = new UserAchievement("100 Rocks Dodged in One Game")
        achievement.hundoInGame(userId).then(obj => {
            hundoGameRocks = true
            displayAchievement()
        })
    }

}

const displayAchievement = () => {
    achievementDiv.innerHTML = `<img src="styles/images/trophy.png">`
    setTimeout(function () { achievementDiv.innerHTML = "" }, 3000)
}

let initialSpawnTimer = 200
let spawnTimer = initialSpawnTimer
function update() {
    const animation = requestAnimationFrame(update);

    window.addEventListener('resize', function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    })

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
            rockCounter++
            gameRocks++
            console.log(gameRocks)
        }

        if (player.x < r.x + r.w && player.x + player.w > r.x && player.y < r.y + r.h && player.y + player.h > r.y) {
            rocks = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            userFetch.patch(highscore, rockCounter, userId)
            console.log(userId)

            giveAchievement(rockCounter, gameRocks)
        }

        r.update()
    }

    player.animate()

    score++;
    scoreText.t = "Score:" + score;
    scoreText.draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = "High Score: " + highscore;
    }

    highscoreText.draw()

    gameSpeed += 0.005

    document.addEventListener('keydown', e => {
        if (e.key === 'p') {
            cancelAnimationFrame(animation)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            form.removeAttribute("hidden")
            music.stopMusic()
        }
    })
}