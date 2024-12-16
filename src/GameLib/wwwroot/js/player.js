export default class Player {
    constructor(opt) { // this.width / 2, 200
        this.opt = opt || {};

        this.reset();
    }

    reset() {
        this.x = this.opt.x;
        this.y = this.opt.y;
        this.width = this.opt.width || 20;
        this.height = this.opt.height || 34;
        this.speed = this.opt.speed || 3;
        this.velX = this.opt.velX || 0;
        this.velY = this.opt.velY || 0;
        this.jumping = this.opt.jumping || false;
        this.grounded = this.opt.grounded || false;
        this.color = this.opt.color || '#E6AC27';
        this.friction = this.opt.friction || 0.75;
        this.gravity = this.opt.gravitry || 0.4;
        this.spritesheet = this.opt.spritesheet;

        this._updateAnimation();
    }

    _updateAnimation() {
        var name = "player-idle-" + (this.velX >= 0 ? "right" : "left");
        if (this.animation != undefined) {
            if (this.animation.name == name) {
                return;
            }
        }
        this.animation = this.spritesheet.getAnimation(name);
    }

    jump() {
        if (!this.jumping && this.grounded) {
            this.jumping = true;
            this.grounded = false;
            this.velY = -this.speed * 2.5;//how high to jump
        }
    }

    move_right() {
        if (this.velX < this.speed) {
            this.velX++;
        }
    }

    move_left() {
        if (this.velX > -this.speed) {
            this.velX--;
        }
    }

    update() {
        this.velX *= this.friction;
        this.velY += this.gravity;

        if (this.grounded) {
            this.velY = 0;
        }

        this.x += this.velX;
        this.y += this.velY;

        this.animation.update();

        this._updateAnimation();
    }

    render(ctx) {
        this.animation.render(ctx, this.x, this.y);
    }

    collides_with_at(shapeB) {

        var shapeA = this;

        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
            vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
            // add the half widths and half heights of the objects
            hWidths = (shapeA.width / 2) + (shapeB.width / 2),
            hHeights = (shapeA.height / 2) + (shapeB.height / 2),
            colDir = "";

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);


            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    //shapeA.y += oY;
                } else if (vY < 0){
                    colDir = "b";
                    //shapeA.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    //shapeA.x += oX;
                } else if (vX<0){
                    colDir = "r";
                    //shapeA.x -= oX;
                }
            }
        }

        return colDir;
    }

    collided_with_box(dir) {
        if (dir === "l" || dir === "r") {
            this.velX = 0;
            this.jumping = false;
        } else if (dir === "b") {
            this.grounded = true;
            this.jumping = false;
        } else if (dir === "t") {
            this.velY *= -1;
        }
    }

    // duplicated
    collided_with_platform(dir) {
        if (dir === "l" || dir === "r") {
            this.velX = 0;
            this.jumping = false;
        } else if (dir === "b") {
            this.grounded = true;
            this.jumping = false;
        } else if (dir === "t") {
            this.velY *= -1;
        }
    }

    
    collided_with_powerup(this_powerup) {
    //    if (this_powerup.effect === 'gravity') {
    //        this.gravity = 0.4;//decrease gravity
    //        this.speed = 4;
    //        this.color = 'white';
    //    }
    //    else if (this_powerup.effect === 'shrink') {
    //        this.width = 10;
    //        this.height = 10;
    //        this.speed = 5;
    //    }
    //    else if (this_powerup.effect === 'tele') {
    //        this.x = this_powerup.px;
    //        this.y = this_powerup.py;
    //    }
    //    else if (this_powerup.effect === 'win') {
    //        var r = confirm("You win! Play again?");
    //        if (r == false) {
    //            this.x = 200;
    //            this.y = 200;
    //        } else {
    //        }
    //    }
    }
}