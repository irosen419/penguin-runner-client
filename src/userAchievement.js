class UserAchievement {
    constructor(name) {
        this.name = name

        this.achievementUrl = 'https://murmuring-sands-05827.herokuapp.com/user_achievements/'

    }

    check() {
        return fetch(this.achievementUrl)
            .then(resp => resp.json())
    }

    fiftyBomb(userId) {
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
    hundoBomb(userId) {
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
    twofiddyBomb(userId) {
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

    twentyFiveInGame(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 4
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
    fiddyInGame(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 5
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
    hundoInGame(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 6
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