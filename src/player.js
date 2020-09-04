class Player {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c

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

        if (KEYS['ShiftLeft'] || KEYS['KeyS']) {
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight
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
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.closePath()
    }


}