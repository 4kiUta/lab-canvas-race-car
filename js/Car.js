class Car {
    constructor(x, y, dw, dh) {
        this.x = x;
        this.y = y;
        this.dw = dw;
        this.fh = dh;

        this.speedX = 0;
        this.speedY = 0;

        this.image = new Image();
        this.image.src = "../images/car.png";

        this.image.onload = () => {
            cntx.drawImage(this.image, this.x, this.y, dw, dh);
        }
    }

    newPosition() {
        this.x += this.speedX;
        this.y += this.speedY; // not used for now!
    }

    draw() {
        cntx.drawImage(this.image, this.x, this.y, 50, 100);
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.dw;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.dh;
    }


    colision(obstacle) {
        return !(this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right())
    }
}