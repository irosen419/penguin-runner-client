class UserAchievement {
    constructor(name) {
        this.name = name

        this.achievementUrl = 'http://localhost:3000/user_achievements'

    }

    check() {
        fetch('http://localhost:3000/users/1')
            .then(resp => resp.json())
            .then(console.log)
    }

    twentyBomb(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 1
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(achievement)
        }

        return fetch(this.achievementUrl, options)
            .then(resp => resp.json())
    }
    fiftyBomb(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 2
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(achievement)
        }

        return fetch(this.achievementUrl, options)
            .then(resp => resp.json())
    }
    hundoBomb(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 3
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(achievement)
        }

        return fetch(this.achievementUrl, options)
            .then(resp => resp.json())
    }
}