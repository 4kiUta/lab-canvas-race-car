class obstacles {
    constructor(width, heigth, x , y , color) {
        this.x  = x;
        this.y = y;
        this.width = width;
        this.heigth = heigth;
        this.color = color;
    }

    draw() {
        cntx.fillStyle = this.color;
        cntx.fillRect(this.x, this.y, this.width, this.heigth);
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.heigth;
    }
}