export default class Resources {

    constructor(opt) {
        opt = opt || {};
        this.staticPath = opt.staticPath;
    }

    load() {

        this.sounds = {
            "intro": this.newSound(this.staticPath + "sounds/christmas-dreams-jingle-bells-268299.mp3"),
            "jump": this.newSound(this.staticPath + "sounds/retro-jump-3-236683.mp3"),
            "pick": this.newSound(this.staticPath + "sounds/coin-recieved-230517.mp3"),
            "error": this.newSound(this.staticPath + "sounds/no-luck-too-bad-disappointing-sound-effect-112943.mp3"),
            "gameover": this.newSound(this.staticPath + "sounds/mixkit-funny-game-over-2878.wav"),
            "restart": this.newSound(this.staticPath + "sounds/mixkit-game-level-completed-2059.wav"),
            "start": this.newSound(this.staticPath + "sounds/hohoho-36506.mp3")
        };

        this.images = {
            "beginning": this.newImage(this.staticPath + "images/beginning.png"),
            "player": this.newImage(this.staticPath + "images/spritesheet-official-1.png"),
            "items": this.newImage(this.staticPath + "images/x9tGGl.png"),
            "background": this.newImage(this.staticPath + "images/background11.png"),
            "theend": this.newImage(this.staticPath + "images/theend.png"),
            "santasleigh": this.newImage(this.staticPath + "images/santasleigh.png")
        }; 
        
        var proms = [];
        for (var key in this.images) {
            proms.push(new Promise(res =>
                this.images[key].onload = () => {

                    // do nothing

                }
            ));
        }
        // list all image widths and heights _after_ the images have loaded:
        Promise.all(proms).then(data => {
            console.log("The images have loaded at last!\nHere are their dimensions (width,height):");
            console.log(data);
        })

    }

    newImage(src) {
        var image = new Image();
        image.src = src;
        return image;
    }

    newSound(src) {
        var sound = new Audio(src);
        sound.load();
        return sound;
    }
}
