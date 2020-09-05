class FetchAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get() {
        return fetch(this.baseUrl)
            .then(resp => resp.json())
    }

    patch(highscore) {
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ "highscore": highscore })
        }

        return fetch(this.baseUrl, options)

    }
}