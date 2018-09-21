//create a new scene
let gameScene = new Phaser.Scene('Game');

// initisate scene params
gameScene.init = function () {
this.current = 'none'
}

// Load assets
gameScene.preload = function () {
    // load images
    this.load.image('bg', 'assets/portBG.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('antFS', 'assets/AntdentifierFS.png');
    this.load.image('antPhone', 'assets/antPhone.png');



}

//called once after preload
gameScene.create = function () {
    // create antdentifier


    //create bg sprite
    let bg = this.add.sprite(0, 0, 'bg')
    //change origin to top left corner
    bg.setOrigin(0, 0)

    // create the player
    let flag = this.add.sprite(600, 180, 'player').setInteractive();
    flag.setScale(1)

    // event listener for flag
    flag.on('pointerdown', this.placeItem, this)

}

// this is called up to 60 times per second
gameScene.update = function () {
    // console.log(this.current)
    if (this.current === 'ants'){
        for (let i = 0; i < this.ants.length; i++) {
         this.ants[i].x += 2;
        }

    // console.log(this.ants)
     }
}

gameScene.placeItem = function (pointer, localX, localY) {

    // create a new item in position
    // let newItem = this.add.sprite(600, 500, 'antFS');

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

    this.ants = this.antdentifier.getChildren();
    this.current = 'ants'

    console.log(this.ants)
    

  
}

//set config
let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1080,
    scene: gameScene,
    parent: 'phaser'

};

// create a new game
let game = new Phaser.Game(config);