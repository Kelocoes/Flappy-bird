class Escena extends Phaser.Scene {

    constructor () {
        super();
        this.bg = undefined;
    }

    preload() {
        this.load.image('fondo', 'img/fondo.png');
        this.load.spritesheet('user', 'img/pajaro.png', {frameWidth: 79, frameHeight: 53});
        this.load.image('pipe0', 'img/tuberia0.png');
        this.load.image('pipeArriba0', 'img/tuberiaArriba0.png');
        this.load.image('pipeAbajo0', 'img/tuberiaAbajo0.png');
        this.load.image('pipe1', 'img/tuberia1.png');
        this.load.image('pipeArriba1', 'img/tuberiaArriba1.png');
        this.load.image('pipeAbajo1', 'img/tuberiaAbajo1.png');
    }

    create ()
    {      
        this.bg = this.add.tileSprite(375, 375, 960, 751, 'fondo').setScrollFactor(0);

        this.player = this.physics.add.sprite(200,300,'user');
        this.player.rotation = 0.35;
        this.anims.create({
            key: 'volar',
            frames: this.anims.generateFrameNumbers('user'),
            frameRate: 10,
            repeat: -1,
        });
        this.player.play('volar');

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.saltar()
            }
        });

        this.input.on('pointerdown', () => this.saltar());

        this.nuevaColumna();

    }

    saltar() {
        this.player.setVelocityY(-350);
        this.player.rotation = -0.35;
        this.time.delayedCall(650, () => {
            this.player.rotation = 0.35;
        }, [], this);
    }

    update(time) {
        this.bg.tilePositionX = time*0.1;
    }

    nuevaColumna() {
        const columna = this.physics.add.group();

        const hueco = Math.floor(Math.random() * 5) + 1;
        const aleatorio = Math.floor(Math.random() * (1 - 0 + 1) + 0)

        for (let i = 0; i < 10; i++) {
            if (i !== hueco && i !== hueco + 1) {
                let cubo;

                if (i == hueco - 1) {
                    cubo = columna.create(960, i * 100, 'pipeArriba' + aleatorio);
                } else if (i == hueco + 2) {
                    cubo = columna.create(960, i * 100, 'pipeAbajo' + aleatorio)
                } else {
                    cubo = columna.create(960, i * 100, 'pipe' + aleatorio);
                }
                cubo.body.allowGravity = false;
            }
        }

        columna.setVelocityX(-200);
        
        columna.checkWorldBounds = true;
        columna.outOfBoundKill = true;
        
        this.physics.add.overlap(this.player, columna, this.hitColumna, null, this)

        this.time.delayedCall(2200, this.nuevaColumna, [], this);
    }

    hitColumna() {
        this.scene.start('perderScene');
    }
}