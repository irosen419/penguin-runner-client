class UserAchievement {
    constructor(name) {
        this.name = name

        this.achievementUrl = 'http://localhost:3000/user_achievements'

    }

    twentyBomb(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 1
        }

        this.options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(achievement)
        }

        return fetch(this.achievementUrl, this.options)
            .then(resp => resp.json())
    }
    fiftytyBomb(userId) {
        let achievement = {
            "user_id": userId,
            "achievement_id": 2
        }

        this.options = {
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

        this.options = {
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