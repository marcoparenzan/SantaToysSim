export default class Bag {

    constructor(opt) { 
        opt = opt || {};
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItemAt(index) {
        this.items.splice(index, 1);
    }

    browse(callback) {
        var i = 0;
        while (true) {
            if (i >= this.items.length) break;
            callback(i, this.items[i]);
            i++;
        }
    }
}