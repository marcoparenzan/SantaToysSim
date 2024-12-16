export default class Platform {
    constructor(opt) { 
        opt = opt || {};
        this.x = opt.x;
        this.y = opt.y;
        this.width = opt.width;
        this.height = opt.height;
        this.color = opt.color;
        this.spritesheet = opt.spritesheet;
        this.complexName = opt.complexName;
        this.cplx = this.spritesheet.getComplex(this.complexName);
    }

    setCollided(value) {
        if (value != '') {
        }
        this.collided = value;
    }

    update() {
    }

    render(ctx) {
        if (this.collided == true) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);    
        }
        else {
            var w = 0;
            this.cplx.render(ctx, this.x + w, this.y, 0); w += 32;
            while(w<this.width-64) {
                this.cplx.render(ctx, this.x + w, this.y, 1); w += 32;
            }
            this.cplx.render(ctx, this.x + w, this.y, 2);
        }
    }
}