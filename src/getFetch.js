class FetchAdapter {
    contructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    get() {
        return fetch(this.baseUrl)
            .then(resp => resp.json())
    }

    patch() {
        
    }
}