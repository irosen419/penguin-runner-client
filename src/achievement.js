class Achievement {
    constructor() {
        this.url = 'https://murmuring-sands-05827.herokuapp.com/achievements/'
    }

    fetchAchievements() {
        return fetch(this.url)
            .then(resp => resp.json())
    }
}