//create a new scene
let gameScene = new Phaser.Scene('Game');

// initisate scene params
gameScene.init = function () {
    this.current = 'none'
    this.flag = undefined
}

// Load assets
gameScene.preload = function () {
    // load images
    this.load.image('bg', 'assets/portBG.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('antFS', 'assets/AntdentifierFS.png');
    this.load.image('antPhone', 'assets/antPhone.png');

    // load audio
    this.load.audio('elec', 'assets/audio/Electricity.mp3');
    this.load.audio('convey', 'assets/audio/convey.mp3');
    this.load.audio('BGmusic', 'assets/audio/BGmusic.mp3');

    // load spritesheets
    this.load.spritesheet('Science', 'assets/animations/PortScienceGuy.png', {
        frameWidth: 42,
        frameHeight: 32,
    });

    this.load.spritesheet('antFlag', 'assets/animations/antdentifier.png', {
        frameWidth: 32,
        frameHeight: 64,
    });

}

//called once after preload
gameScene.create = function () {
    // create sounds
    this.elec = this.sound.add('elec', {volume:0.6});
    this.convey = this.sound.add('convey', {volume:0.4});
    //BG music
    this.BGmusic = this.sound.add('BGmusic', {volume:0.1,loop:true});

    //create bg sprite
    let bg = this.add.sprite(0, 0, 'bg')
    //change origin to top left corner
    bg.setOrigin(0, 0)
    bg.setScale(2.25)

    //create science dude
    this.science = this.add.sprite(210, 180, 'Science', 0);
    this.science.setScale(4.5)

    // create the flag
    let antFlag = this.add.sprite(578, 160, 'antFlag', 0).setInteractive();
    antFlag.setScale(4)
    // event listener for flag
    antFlag.on('pointerdown', this.placeAnts, this);

    // create the flag
    let ncFlag = this.add.sprite(800, 180, 'player').setInteractive();
    ncFlag.setScale(1)
    // event listener for flag
    ncFlag.on('pointerdown', this.placeNC, this);

    // create animation
    this.anims.create({
        key: 'button',
        frames: this.anims.generateFrameNames('Science', {
            frames: [4, 5, 6, 7, 8, 9, 10]
        }),
        frameRate: 12,
        yoyo: true,
    });

    this.anims.create({
        key: 'lever',
        frames: this.anims.generateFrameNames('Science', {
            frames: [0, 1, 2, 3]
        }),
        frameRate: 12,
        yoyo: true,
    });

    this.anims.create({
        key: 'antFlag',
        frames: this.anims.generateFrameNames('antFlag', {
            frames: [0, 1, 2, 3]
        }),
        frameRate: 6,
        yoyo: true,
        repeat: -1,
    });

    //listen to pointerover
    antFlag.on('pointerover', function (pointer) {
        antFlag.anims.play('antFlag');
    })

    antFlag.on('pointerout', function (pointer) {
        antFlag.anims.stop('antFlag');
    }, this);


    this.BGmusic.play();

}

// this is called up to 60 times per second
gameScene.update = function () {
  
    // make group move
    if (this.current !== 'none') {
        for (let i = 0; i < this.current.getChildren().length; i++) {
            if (this.current.getChildren()[1].x < this.sys.game.config.width - 400) {
                this.current.getChildren()[i].x += 5;
            }
            else {
                this.convey.stop();
            }
        }
    };
};

gameScene.placeAnts = function (pointer, localX, localY) {
    this.flag = 'ants'
    gameScene.placeObjects()
}

gameScene.placeNC = function (pointer, localX, localY) {
    this.flag = 'NC'
    gameScene.placeObjects()
}

gameScene.placeObjects = function (pointer, localX, localY) {
    if (this.current === 'none') {
        this.science.anims.play('lever');
    }

    setTimeout(() => {
        // create a new item in position
        if (this.flag === 'ants' && this.current === 'none') {
            this.antdentifier = this.add.group([
                {
                    key: 'antFS',
                    setXY:
                    {
                        x: -600,
                        y: 850
                    }
                },
                {
                    key: 'antPhone',
                    setXY:
                    {
                        x: -100,
                        y: 850
                    }
                }
            ]);
            this.current = this.antdentifier
            this.convey.play();
        }

        else if (this.flag === 'NC' && this.current === 'none') {

            this.northcoders = this.add.group([
                {
                    key: 'player',
                    setXY:
                    {
                        x: -600,
                        y: 850
                    }
                },
                {
                    key: 'player',
                    setXY:
                    {
                        x: -100,
                        y: 850
                    }
                }
            ]);

            this.current = this.northcoders
            this.convey.play();
        }

        else if (this.current !== 'none') {
            // play animation
            this.science.anims.play('button');

            setTimeout(() => {
                this.current.clear([this.current.getChildren()])
                this.current = 'none'
                // shake
                this.cameras.main.flash(500, 0, 50, 50);

                // play sound
                this.convey.stop();
                this.elec.play();


                setTimeout(() => {
                    if (this.flag === 'ants') {
                        this.placeAnts()
                    }
                    else if (this.flag === 'NC') {
                        this.placeNC()
                    }
                }, 800);
            }, 600);

        }
    }, 200);
}

//set config
let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1080,
    pixelArt: true,
    zoom: 1,
    scene: gameScene,
    parent: 'phaser'

};

// create a new game
let game = new Phaser.Game(config);