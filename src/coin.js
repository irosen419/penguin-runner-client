class Coin {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.frameX = 0
        this.frameY = 0
        this.frameNumber = 0
        this.frameLimit = 4
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
        this.dx = -gameSpeed
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }

    drawCoin() {
        drawSprite(images.coins, this.w * this.frameX, this.h * this.frameY, this.w, this.h,
            this.x, this.y, this.w, this.h)
        if (this.frameX < this.frameLimit) {
            this.frameX++
            if (this.frameX === 3) {
                this.frameX -= 1.05
            }
        } else {
            this.frameX = this.frameNumber;
        }
    }
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dw, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dw, dH)
}