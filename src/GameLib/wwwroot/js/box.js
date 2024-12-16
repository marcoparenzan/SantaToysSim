export default class Box {
    constructor(opt) { 
        opt = opt || {};
        this.x = opt.x;
        this.y = opt.y;
        this.width = opt.width;
        this.height = opt.height;
        this.color = opt.color;
    }

    setCollided(value) {
        if (value != '') {
        }
        this.collided = value;
    }

    update() {
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}