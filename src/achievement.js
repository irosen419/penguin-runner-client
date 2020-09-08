class Achievement {
    constructor() {
        this.url = 'http://localhost:3000/achievements/'
    }

    fetchAchievements() {
        return fetch(this.url)
            .then(resp => resp.json())
    }
}