import Player from './player.js';
import Bag from './bag.js';
import State from './state.js';
import SpriteSheet from './spritesheet.js';
import Soundtrack from './soundtrack.js';
import Resources from './resources.js';

import Beginning from './scenes/beginning.js';
import Scene01 from './scenes/scene01.js';
import TheEnd from './scenes/theend.js';

export function setup(gameId, pageProxy, canvasId, staticPath) {
    window.gameLib = window.gameLib || {};
    var that = window.gameLib[gameId] || {};

    that.pageProxy = pageProxy;
    that.canvas = window.document.getElementById(canvasId);
    that.context = that.canvas.getContext("2d");
    that.staticPath = staticPath;

    that.resources = new Resources({
        staticPath: staticPath
    });
    that.resources.load();

    that.game = new Game(window.document, that.canvas, that.context, that.resources);

    window.gameLib[gameId] = that;
}

export function start(gameId) {
    window.gameLib = window.gameLib || {};
    var that = window.gameLib[gameId] || {};

    that.game.goToBeginning();
    
    window.gameLib[gameId] = that;
}

class Game {

    constructor(doc, canv, ctx, resources) {

        this.doc = doc;
        this.canv = canv;
        this.ctx = ctx;
        this.resources = resources;
        this.framesCount = 0;
        this.width = 1000;
        this.height = 400;

        this.canv.width = this.width;
        this.canv.height = this.height;

        this.spritesheet = new SpriteSheet({
            resources: this.resources
        });
        this.soundtrack = new Soundtrack({
            resources: this.resources
        });

        var that = this;

        this.doc.body.addEventListener("keydown", (e) => {
            that.scene.handle_keys(e.keyCode, true);
        });

        this.doc.body.addEventListener("keyup", (e) => {
            that.scene.handle_keys(e.keyCode, false);
        });
    }

    goToBeginning() {
        this.state = new State();

        this.player = new Player({
            x: this.width / 2,
            y: 318,
            spritesheet: this.spritesheet
        });
        this.bag = new Bag();

        this.scene = new Beginning({
            game: this,
            width: this.width,
            height: this.height,
            resources: this.resources,
            spritesheet: this.spritesheet,
            state: this.state,
            soundtrack: this.soundtrack,
            player: this.player,
            bag: this.bag
        });  
        this.invalidate();
    }

    goToScene01() {
        this.scene = new Scene01({
            game: this,
            width: this.width,
            height: this.height,
            resources: this.resources,
            spritesheet: this.spritesheet,
            state: this.state,
            soundtrack: this.soundtrack,
            player: this.player,
            bag: this.bag
        });  
        this.invalidate();
    }

    
    goToTheEnd() {
        this.scene = new TheEnd({
            game: this,
            width: this.width,
            height: this.height,
            resources: this.resources,
            spritesheet: this.spritesheet,
            state: this.state,
            soundtrack: this.soundtrack,
            player: this.player,
            bag: this.bag
        });  
        this.invalidate();
    }

    invalidate() {

        var that = this;

        window.requestAnimationFrame(async (timestamp) => {
            await that.scene.loop(that, timestamp);
        });
    }
}