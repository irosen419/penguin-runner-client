const qs = (selector) => document.querySelector(selector)

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

// Music
let music;

// User Attributes
let userId;

// Achievement Variables
let rockCounter;

// Achievement Truthiness
let twentyRocks = false
let fiftyRocks = false
let hundoRocks = false

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

const findAchievements = (id) => {
    let achievement = new UserAchievement("AchievementFinder")
    achievement.check().then(data => {
        for (const userAchievement of data) {
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 1) {
                achievementList.push(userAchievement.achievement_id)
                twentyRocks = true
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 2) {
                achievementList.push(userAchievement.achievement_id)
                fiftyRocks = true
                console.log("You already have the 50 bomb achievement")
            }
            if (userAchievement.user_id == userId && userAchievement.achievement_id == 3) {
                achievementList.push(userAchievement.achievement_id)
                hundoRocks = true
                console.log("You already have the 100 bomb achievement")
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
            findAchievements(user.id)
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
    requestAnimationFrame(update)

    document.addEventListener('keydown', e => {
        if (e.key === '-') {
            music.lowerVolume()
        } else if (e.key === '=') {
            music.raiseVolume()
        }
    })
}

// Chech For and Display Achievements

const giveAchievement = (rockCounter, userId) => {
    if (rockCounter >= 1 && !twentyRocks) {
        let achievement = new UserAchievement("20 Rocks Dodged")
        achievement.twentyBomb(userId).then(obj => {
            console.log("You have been given the 20 achievement")
            twentyRocks = true
            displayAchievement()
        })
    }

    if (rockCounter >= 5 && !fiftyRocks) {
        let achievement = new UserAchievement("50 Rocks Dodged")
        achievement.fiftyBomb(userId).then(obj => {
            console.log("You have been given the 50 achievement")
            fiftyRocks = true
            displayAchievement()
        })
    }

    if (rockCounter >= 10 && !hundoRocks) {
        let achievement = new UserAchievement("100 Rocks Dodged")
        achievement.hundoBomb(userId).then(obj => {
            console.log("You have been given the 100 achievement")
            hundoRocks = true
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
            console.log(rockCounter)
        }

        if (player.x < r.x + r.w && player.x + player.w > r.x && player.y < r.y + r.h && player.y + player.h > r.y) {
            rocks = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            userFetch.patch(highscore, rockCounter, userId)

            giveAchievement(rockCounter, userId)
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

    gameSpeed += 0.003

    document.addEventListener('keydown', e => {
        if (e.key === 'p') {
            cancelAnimationFrame(animation)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            form.removeAttribute("hidden")
            music.stopMusic()
        }
    })
}

// Modal Logic

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");

btn.onclick = function () {
    modal.style.display = "block";
}

let innerModal = qs('#modal-content')
const modalMenu = `
    <span class="close" class="hover" id="mainMenu">&times;</span>
    <button class="hover" id="achievements">ACHIEVEMENTS</button>
    <button class="hover" id="leaderboard">LEADERBOARD</button>
    <h3>Audio Controls:</h3>
    <p>Volume down: - </p>
    <p>Volume up: + </p>
`
innerModal.innerHTML = modalMenu

document.addEventListener('click', e => {
    if (e.target.matches('#achievements')) {
        innerModal.innerHTML = ""
        let achievements = new Achievement()
        achievements.fetchAchievements().then(achs => {
            innerModal.innerHTML = `<h3>YOUR ACHIEVEMENTS</h3>`
            for (const ach of achs) {
                if (achievementList.includes(ach.id)) {
                    renderAchievement(ach)
                }
            }
            const span = document.createElement('span')
            span.id = "achievementCloseBtn"
            span.className = "close hover"
            span.innerHTML = `&times;`
            innerModal.insertAdjacentElement('beforeend', span)
        })
    } else if (e.target.matches('#achievementCloseBtn')) {
        innerModal.innerHTML = modalMenu
    }
})


const renderAchievement = (achievement) => {
    let achievementDiv = document.createElement('div')
    achievementDiv.className = 'achievement'
    achievementDiv.innerHTML = `${achievement.name}`
    innerModal.insertAdjacentElement('beforeend', achievementDiv)
}

let span = qs('#mainMenu');

document.addEventListener('click', e => {
    if (e.target.matches('#mainMenu')) {
        console.log('button')
        modal.style.display = "none";
    }
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}


