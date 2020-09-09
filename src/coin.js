class Coin {
    constructor(x, y, r, sA, eA, c) {
        this.x = x
        this.y = y
        this.r = r
        this.sA = sA
        this.eA = eA
        this.frameX = 0
        this.frameY = 0
        this.c = c

        this.dx = -gameSpeed;
    }

    update() {
        this.x += this.dx
        this.draw()
        this.dx = -gameSpeed
    }

    updateSprite() {
        this.x += this.dx
        this.drawCoin()
        // console.log(this, this.x)
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

    drawCoin() {
        drawSprite(images.coins, this.r * this.frameX, (this.r + 70) * this.frameY, this.r, this.r + 70,
            this.x, this.y, this.r, this.r + 70)
        console.log('drawing coin')
        // if (this.frameX < this.frameLimit) {
        //     this.frameX++
        // } else {
        //     this.frameX = this.frameNumber;
        // }
    }
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dw, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dw, dH)
}