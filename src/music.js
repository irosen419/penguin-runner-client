class Sound {
    constructor(src) {
        this.src = src
    }
    createAudioTag() {
        this.sound = document.createElement("audio");
        this.sound.src = this.src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    playMusic() {
        console.dir(this)
        this.sound.volume = 0.4
        this.sound.play();
    }
    stopMusic() {
        this.sound.pause();
    }

    lowerVolume() {
        if (this.sound.volume > 0) {
            this.sound.volume -= 0.1
            console.log(this.sound.volume)
        }
    }

    raiseVolume() {
        if (this.sound.volume < 1) { this.sound.volume += 0.1 }
    }
}