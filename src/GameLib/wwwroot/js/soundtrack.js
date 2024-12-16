export default class Soundtrack {
    constructor(opt) {
        opt = opt || {};
        this.resources = opt.resources;
        this.name = "";
        this.sounds = {

        };
    }

    background(name) {
        if (this.sounds[name] == undefined) this.sounds[name] = this.resources.sounds[name];

        this.sounds[name].currentTime = 0;
        this.sounds[name].play();

        this.background_name = name; 
    };

    pause_background() {
        this.sounds[this.background_name].pause();
    }

    resume_background() {
        this.sounds[this.background_name].play();
    }
    
    overlap(name) {

        if (this.sounds[this.name] != undefined) this.sounds[this.name].stop();

        if (this.sounds[name] == undefined) this.sounds[name] = this.resources.sounds[name];

        this.sounds[name].play();
    };

    async wait(name) {
        
        await new Promise(res=>{
            var audio = this.resources.sounds[name];
            audio.play()
            audio.onended = res
        });

    };
}
