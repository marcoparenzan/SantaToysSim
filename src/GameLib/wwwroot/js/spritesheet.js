export default class SpriteSheet {
    constructor(opt) {
        opt = opt || {};
        this.resources = opt.resources;

        this.frameSets = {
        };

        this._setFrameset({
            name: "player-idle-right",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [  5, 0 * 48 + 13],
                [ 37, 0 * 48 + 13]
            ]
        });
        this._setFrameset({
            name: "player-idle-left",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [ 70, 0 * 48 + 13],
                [102, 0 * 48 + 13]
            ]
        });

        this._setFrameset({
            name: "gift-soldier",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [ 5, 2 * 48 + 13]
            ]
        });
        this._setFrameset({
            name: "gift-bear",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [5, 2 * 48 + 13]
            ]
        });
        this._setFrameset({
            name: "gift-candy",
            width: 21,
            height: 14,
            resourceName: "player",
            defs: [
                [ 68, 127]
            ]
        });
        this._setFrameset({
            name: "gift-giftbox",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [5, 2 * 48 + 13]
            ]
        });
        this._setFrameset({
            name: "gift-handheld",
            width: 20,
            height: 34,
            resourceName: "player",
            defs: [
                [5, 2 * 48 + 13]
            ]
        });

        // enemies
        this._setFrameset({
            name: "enemy-elf0",
            width: 25,
            height: 30,
            resourceName: "player",
            defs: [
                [  2, 159]
            ]
        });

        // santasleigh
        this._setFrameset({
            name: "santasleigh",
            width: 95,
            height: 40,
            resourceName: "santasleigh",
            defs: [
            [ 10,  8]
                ]
            });

        // santasleigh
        this._setFrameset({
            name: "santasleigh-run",
            width: 95,
            height: 40,
            resourceName: "santasleigh",
            defs: [
                [ 10,  8],
                [110,  8],
                [210,  8],
                [310,  8],
                [410,  8],
                [510,  8],
                [ 10, 58],
                [110, 58],
                [210, 58],
                [310, 58],
                [410, 58],
                [510, 58],
                [ 10,108],
                [110,108],
                [210,108],
                [310,108],
                [410,108],
                [510,108],
                [ 10,158],
                [110,158],
                [210,158],
                [310,158],
                [410,158],
                [510,158],
            ]
        });

        // background
        this._setFrameset({
            name: "background",
            width: 1000,
            height: 400,
            resourceName: "background",
            defs: [
                [  0,  0]
            ]
        });
        this._setFrameset({
            name: "beginning",
            width: 1000,
            height: 400,
            resourceName: "beginning",
            defs: [
                [  0,  0]
            ]
        });
        this._setFrameset({
            name: "theend",
            width: 1000,
            height: 400,
            resourceName: "theend",
            defs: [
                [  0,  0]
            ]
        });

        //
        //  items
        //
        
        // background
        this._setFrameset({
            name: "platform01",
            resourceName: "items",
            defs: [
                [  9,  896, 32, 20],
                [ 72,  896, 32, 20],
                [440,  896, 32, 20]
            ]
        });

    }

    _setFrameset(opt) {
        this.frameSets[opt.name] = opt;
    }

    getAnimation(name) {
        var fs = this.frameSets[name];
        var frameset = new SpriteSheetAnimation({
            name: name,
            index: 0,
            image: this.resources.images[fs.resourceName],
            frameSet: fs
        });

        return frameset;
    }
    
    getComplex(frameSetName) {
        var fs = this.frameSets[frameSetName];
        var frameset = new SpriteSheetComplex({
            index: 0,
            image: this.resources.images[fs.resourceName],
            frameSet: fs
        });

        return frameset;
    }
}

export class SpriteSheetAnimation {

    constructor(opt) {
        this.name = opt.name;
        this.index = opt.index;
        this.image = opt.image;
        this.frameSet = opt.frameSet;
        this.counter = 30;
    }

    render(ctx, x, y) {
        var frameSetDef = this.frameSet.defs[this.index];
        ctx.drawImage(
            this.image,
            frameSetDef[0],
            frameSetDef[1],
            this.frameSet.width,
            this.frameSet.height,
            x,
            y,
            this.frameSet.width,
            this.frameSet.height
        );
    }

    update() {
        this.counter--;
        if (this.counter>0) return;
        this.index++;
        this.counter = 30;
        if (this.index >= this.frameSet.defs.length) this.index = 0;
    }
}

export class SpriteSheetComplex {

    constructor(opt) {
        this.name = opt.name;
        this.image = opt.image;
        this.frameSet = opt.frameSet;
    }

    render(ctx, x, y, index) {
        var frameSetDef = this.frameSet.defs[index];
        ctx.drawImage(
            this.image,
            frameSetDef[0],
            frameSetDef[1],
            frameSetDef[2],
            frameSetDef[3],
            x,
            y,
            frameSetDef[2],
            frameSetDef[3]
        );
    }
}