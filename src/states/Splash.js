import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    this.load.setPreloadSprite(this.loaderBar)
    
    this.load.image('blank', 'assets/images/blank.png')
    this.load.image('map', 'assets/images/map.jpg')
    this.load.image('title', 'assets/images/title.jpg')
    this.load.image('marker', 'assets/images/marker.png')
    this.load.image('atk', 'assets/images/atk.png')
    this.load.image('def', 'assets/images/def.png')
    this.load.image('button', 'assets/images/button.png');
    this.load.image('dialog', 'assets/images/dialog.png');
    this.load.image('dialog2', 'assets/images/dialog2.png');
    for (let i = 1; i <= 14; i++) {
      this.load.image('female'+i, 'assets/images/female' + i + '.png');
    }
    for (let i = 1; i <= 19; i++) {
      this.load.image('male'+i, 'assets/images/male' + i + '.png');
    }
    const enemies = [
      'dragon', 'goblin', 'harpy', 'lichlord', 'lordofViolence', 'naga', 'orc', 'ratman', 
      'treefolk', 'troll', 'boss1', 'boss2', 'boss3'
    ];
    enemies.forEach(e => this.load.image(e, 'assets/images/' + e + '.png'))
  }

  create () {
    this.state.start('Game')
  }
}
