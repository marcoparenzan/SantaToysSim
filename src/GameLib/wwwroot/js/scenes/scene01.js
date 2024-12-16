import PowerUp from '../powerup.js';
import Box from '../box.js';
import Platform from '../platform.js';
import Enemy from '../enemy.js';
import SantaClaus from '../santaclaus.js';

export default class Scene01 {

    constructor(opt) { 
        this.game = opt.game;
        this.width = opt.width;
        this.height = opt.height;
        this.resources = opt.resources;
        this.spritesheet = opt.spritesheet;
        this.soundtrack = opt.soundtrack;
        this.commands = opt.commands || {};
        this.player = opt.player;
        this.bag = opt.bag;

        this.boxes = opt.boxes || [];
        this.platforms = opt.platforms || [];
        this.powerup = opt.powerup ||[];
        this.enemies = opt.enemies ||[];
        this.santaclaus = opt.santaclaus ||[];
        this.state = opt.state;

        this.keys = [];

        this.powerup.push(new PowerUp({
            x: 810,
            y: 285,
            width: 20,
            height: 20,
            color: '#BF4D28',
            animationName: 'gift-candy',
            spritesheet: this.spritesheet,
            score: 50
        }));
        this.powerup.push(new PowerUp({
            x: 400,
            y: 185,
            width: 20,
            height: 20,
            color: '#BF4D28',
            animationName: 'gift-candy',
            spritesheet: this.spritesheet,
            score: 100
        }));

        this.boxes.push(new Box({
            x: 0,
            y: 0,
            width: 10,
            height: this.height-100,
            color: 'red'
        }));
        this.boxes.push(new Box({
            x: 0,
            y: this.height-100,
            width: 10,
            height: 100,
            color: 'yellow',
            mode: "exit"
        }));
        this.boxes.push(new Box({
            x: 0,
            y: this.height - 10,
            width: this.width,
            height: 50,
            color: 'red'
        }));
        this.boxes.push(new Box({
            x: this.width - 10,
            y: 100,
            width: 50,
            height: this.height-100,
            color: 'red'
        }));
        this.boxes.push(new Box({
            x: this.width - 10,
            y: 0,
            width: 50,
            height: 100,
            color: 'yellow',
            mode: "exit"
        }));


        this.platforms.push(new Platform({
            x: 290,
            y: 200,
            width: 260,
            height: 10,
            color: 'blue',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 590,
            y: 200,
            width: 80,
            height: 10,
            color: 'blue',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 80,
            y: 250,
            width: 150,
            height: 10,
            color: 'red',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 220,
            y: 300,
            width: 80,
            height: 10,
            color: 'black',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 340,
            y: 350,
            width: 90,
            height: 10,
            color: '#655643',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 740,
            y: 300,
            width: 160,
            height: 10,
            color: '#655643',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 640,
            y: 150,
            width: 90,
            height: 10,
            color: '#655643',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));
        this.platforms.push(new Platform({
            x: 733,
            y: 100,
            width: 260,
            height: 10,
            color: '#655643',
            spritesheet: this.spritesheet,
            complexName: "platform01"
        }));

        this.enemies.push(new Enemy({
            x: 820,
            y: 270,
            speed: 1,
            velX: 1,
            spritesheet: this.spritesheet,
            animationName: "enemy-elf0",
            callback: function (item) {
                if (item.velX < 0 && item.x < 740) item.velX = -item.velX;
                else if (item.velX > 0 && item.x > 880) item.velX = -item.velX;
            }
        }));

        this.enemies.push(new Enemy({
            x: 260,
            y: 170,
            speed: 1,
            velX: 1,
            spritesheet: this.spritesheet,
            animationName: "enemy-elf0",
            callback: function (item) {
                if (item.velX < 0 && item.x < 260) item.velX = -item.velX;
                else if (item.velX > 0 && item.x > 520) item.velX = -item.velX;
            }
        }));

        this.enemies.push(new Enemy({
            x: 820,
            y: 360,
            speed: 1,
            velX: 1,
            spritesheet: this.spritesheet,
            animationName: "enemy-elf0",
            callback: function (item) {
                if (item.velX < 0 && item.x < 40) item.velX = -item.velX;
                else if (item.velX > 0 && item.x > 960) item.velX = -item.velX;
            }
        }));

        this.santaclaus.push(new SantaClaus({
            x: 850,
            y: 70,
            speed: 0,
            velX: 0,
            spritesheet: this.spritesheet,
            animationName: "santasleigh",
            callback: function (item) {
            }
        }));

        this.reset();
    }

    reset() {
        for(var k = 0; k<this.enemies.length; k++) {
            this.enemies[k].reset();
        }
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
            this.player.jump();
            this.soundtrack.overlap("jump");
        }
        else if (this.keys[39] || this.keys[68]) {
            // right arrow
            this.player.move_right();
        }
        else if (this.keys[37] || this.keys[65]) {
            // left arrow
            this.player.move_left();
        }
        this.player.update();

        var i = 0;
        while (true) {
            if (i >= this.boxes.length) break;

            this.boxes[i].update();

            var dir = this.player.collides_with_at(this.boxes[i]);
            this.boxes[i].setCollided(dir);

            this.player.collided_with_box(dir);

            i++;
        }

        var i = 0;
        while (true) {
            if (i >= this.platforms.length) break;

            this.platforms[i].update();

            var dir = this.player.collides_with_at(this.platforms[i]);
            this.platforms[i].setCollided(dir);

            this.player.collided_with_platform(dir);

            i++;
        }

        var j = 0;
        while (true) {
            if (j >= this.powerup.length) break;

            this.powerup[j].update();

            var dir = this.player.collides_with_at(this.powerup[j]);
            this.powerup[j].collided = dir;

            if (dir != '') {
                this.bag.addItem(this.powerup[j]);
                this.state.addScore(this.powerup[j].score);
                this.powerup.splice(j, 1);
                this.soundtrack.overlap("pick");
                continue;
            }

            j++;
        }

        var k = 0;
        while (true) {
            if (k >= this.enemies.length) break;

            this.enemies[k].update();

            var dir = this.player.collides_with_at(this.enemies[k]);
            this.enemies[k].setCollided(dir);

            if (dir != "") {
                if (this.state.lives == 1) {
                    this.state.lives--;
                    this.soundtrack.pause_background();
                    await this.soundtrack.wait("gameover");
                    this.game.goToTheEnd();
                }
                else {
                    this.soundtrack.pause_background();
                    await this.soundtrack.wait("error");
                    this.keys = [];
                    this.reset();
                    this.player.reset();
                    this.state.lives--;
                    this.render(this.game.ctx);
                    await this.soundtrack.wait("restart");

                    this.soundtrack.resume_background();
                }
            }

            k++;
        }

        
        var k = 0;
        while (true) {
            if (k >= this.santaclaus.length) break;

            this.santaclaus[k].update();

            var dir = this.player.collides_with_at(this.santaclaus[k]);
            this.santaclaus[k].setCollided(dir);

            if (this.santaclaus[k].x>1000) {
                this.soundtrack.pause_background();
                await this.soundtrack.wait("gameover");
                this.game.goToTheEnd();
            }

            if (dir != "") {

                if (this.bag.items.length>=2) {
                    // count packages in bag. if complete...then go
                    this.santaclaus[k].velX = 1;

                }
            }

            k++;
        }

        var j = 0;
        while (true) {
            if (j >= this.santaclaus.length) break;

            this.santaclaus[j].update();

            j++;
        }

        this.updating = false;
    }

    render(ctx) {

        var fs = this.spritesheet.getAnimation("background");
        fs.render(ctx, 0,0);

        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].render(ctx);
        }

        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].render(ctx);
        }

        //draw powerup stuff 
        for (var j = 0; j < this.powerup.length; j++) {
            this.powerup[j].render(ctx);
        }

        for (var k = 0; k < this.enemies.length; k++) {
            this.enemies[k].render(ctx);
        }

        
        for (var k = 0; k < this.santaclaus.length; k++) {
            this.santaclaus[k].render(ctx);
        }

        this.player.render(ctx);

        //
        //  bag
        //
        var y = 0;
        var anim = this.spritesheet.getAnimation("gift-candy");
        this.bag.browse(function (item) {

            anim.render(ctx, 800, y);
            y += 30;

        });

        //
        //  Score
        //
        ctx.font = "48px Arial";
        ctx.strokeText(this.state.score || 0, 110, 50);

        //
        //  Lives
        //
        ctx.font = "48px Arial";
        ctx.strokeText(this.state.lives || 3, 210, 50);

    }

    async loop(that, timestamp) {

        this.render(this.game.ctx);

        await this.update();

        this.game.invalidate();

    }
}