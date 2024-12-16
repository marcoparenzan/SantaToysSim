import PowerUp from '../powerup.js';
import Box from '../box.js';
import Platform from '../platform.js';
import Enemy from '../enemy.js';

export default class TheEnd {

    constructor(opt) { 
        this.game = opt.game;
        this.width = opt.width;
        this.height = opt.height;
        this.resources = opt.resources;
        this.spritesheet = opt.spritesheet;
        this.soundtrack = opt.soundtrack;
        this.player = opt.player;
        this.bag = opt.bag;

        this.keys = [];

    }

    handle_keys(key, value) {
        this.keys[key] = value;
    }

    async update() {

        if (this.updating == true) return;
        this.updating = true;

        // check keys
        if (this.keys[38] || this.keys[32] || this.keys[87]) {
            // up arrow or space

            //
            //  START
            //
            this.game.goToBeginning();
        }

        this.updating = false;
    }

    render(ctx) {

        var fs = this.spritesheet.getAnimation("theend");
        fs.render(ctx, 0,0);

        //
        //  Lives
        //
        ctx.font = "48px Arial";
        ctx.strokeText("THE END" || 3, 210, 50);

    }

    async loop(that, timestamp) {

        this.render(this.game.ctx);

        await this.update();

        this.game.invalidate();

    }
}