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
    <p>Mute: m </p>
`
innerModal.innerHTML = modalMenu

document.addEventListener('click', e => {
    if (e.target.matches('#achievements')) {
        innerModal.innerHTML = ""
        let achievements = new Achievement()
        achievements.fetchAchievements().then(achs => {
            innerModal.innerHTML = `<h3>YOUR ACHIEVEMENTS</h3></br>`
            for (const ach of achs) {
                if (achievementList.includes(ach.id)) {
                    renderAchievement(ach)
                }
            }
            const span = ce('span')
            span.id = "achievementCloseBtn"
            span.className = "close hover"
            span.innerHTML = `&times;`
            innerModal.insertAdjacentElement('beforeend', span)
        })
    } else if (e.target.matches('#achievementCloseBtn')) {
        innerModal.innerHTML = modalMenu
    } else if (e.target.matches('#leaderboard')) {
        innerModal.innerHTML = ""
        innerModal.innerHTML = `<h3>LEADERBOARD</h3></br>`
        usersFetch = new FetchAdapter('http://localhost:3000/users/')
        usersFetch.get()
            .then(theUsers => {
                for (const user of theUsers) {
                    users.push(user)
                }
                users = users.sort(function (user1, user2) {
                    if (user1.highscore > user2.highscore) return -1;
                    if (user1.highscore < user2.highscore) return 1;
                })
                renderLeaderboard(users);
                const span = ce('span')
                span.id = "leaderboardCloseBtn"
                span.className = "close hover"
                span.innerHTML = `&times;`
                innerModal.insertAdjacentElement('beforeend', span)
            })
    } else if (e.target.matches('#leaderboardCloseBtn')) {
        innerModal.innerHTML = modalMenu
    }
})

const renderLeaderboard = (users) => {
    let leaderboardDiv = ce('div')
    leaderboardDiv.className = 'leaderboard'
    let counter = 1;
    innerModal.insertAdjacentElement('beforeend', leaderboardDiv)
    for (const user of users) {
        leaderboardDiv.insertAdjacentHTML('beforeend', `
        <h4>${counter}. ${user.username} -- High Score: ${user.highscore}</h4></br>
        `)
        counter++;
    }

}


const renderAchievement = (achievement) => {
    let achievementDiv = ce('div')
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


