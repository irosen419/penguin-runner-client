class Coin {
    constructor(x, y, r, sA, eA, c) {
        this.x = x
        this.y = y
        this.r = r
        this.sA = sA
        this.eA = eA
        this.c = c

        this.dx = -gameSpeed;
    }

    update() {
        this.x += this.dx
        this.draw()
        this.dx = -gameSpeed
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.sA, this.eA)
        ctx.fillStyle = this.c;
        ctx.fill()
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
}