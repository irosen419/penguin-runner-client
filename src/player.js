class Player {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.frameX = 0;
        this.frameY = 0;
        this.w = w
        this.h = h
        this.c = c
        this.frameLimit = 13;
        this.frameNumber = 0;
        this.dy = 0;
        this.jumpForce = 15
        this.originalHeight = h
        this.grounded = false
        this.jumpTimer = 0
    }

    animate() {
        // Jump

        if (KEYS['Space'] || KEYS['KeyW']) {
            this.jump()
        } else {
            this.jumpTimer = 0
        }

        document.addEventListener('keyup', e => {
            if (e.key === 'Shift' || e.key === 's') {
                this.frameX = 0
                this.frameY = 0
                this.frameNumber = 0;
                this.frameLimit = 13
            }
        })

        if (KEYS['ShiftLeft'] || KEYS['KeyS']) {
            this.frameX = 6;
            this.frameY = 6;
            this.frameNumber = 6;
            this.frameLimit = 3;
            this.h = this.originalHeight / 2;
            this.dy += 1.5
        } else {
            this.h = this.originalHeight
            // console.log("the else is firing")
        }

        this.y += this.dy;

        //Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.drawHitBox()
        this.draw()
    }

    jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++
            this.dy = -this.jumpForce - (this.jumpTimer / 50)
        }
    }

    draw() {
        drawSprite(images.penguin, this.w * this.frameX, this.h * this.frameY, this.w, this.h,
            this.x, this.y, this.w, this.h)
        if (this.frameX < this.frameLimit) {
            this.frameX++
            // console.log(this.frameX, this.frameLimit)
        } else {
            this.frameX = this.frameNumber;
        }

    }

    drawHitBox() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }


}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dw, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dw, dH)
}