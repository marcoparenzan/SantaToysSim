export default class PowerUp {
    constructor(opt) { 
        opt = opt || {};
        this.x = opt.x;
        this.y = opt.y;
        this.width = opt.width;
        this.height = opt.height;
        this.color = opt.color;
        this.score = opt.score || 0;
        //this.effect = opt.effect;
        //this.rotate = opt.rotate || 0;
        //this.px = opt.px;
        //this.py = opt.py;
        //this.stay = opt.stay || false;
        this.spritesheet = opt.spritesheet;
        this.animationName = opt.animationName;
        this.animation = this.spritesheet.getAnimation(this.animationName);

        this._updateAnimation();
    }

    update() {
        this._updateAnimation();
    }

    _updateAnimation() {
        this.animation.update();
    }

    render(ctx) {
        if (this.collided != "") {
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        else {
            this.animation.render(ctx, this.x, this.y);
        }
    }
}