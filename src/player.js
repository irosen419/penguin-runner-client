class Player {
    constructor(name, x, y) {
        this.name = name
        this.x = x
        this.y = y
    }
    draw() {
        console.log(CANVAS_WIDTH, CANVAS_HEIGHT)
        let ctx = GAME_CANVAS.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.y -= 20
        this.draw()
    }
}