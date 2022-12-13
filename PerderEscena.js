class PerderEscena extends Phaser.Scene {
    constructor () {
        super({key: 'perderScene'});
    }

    preload() {
        this.load.image('perder', 'img/perder.png');
    }

    create () {
        this.add.image(375, 375, 'perder');
    } 
}