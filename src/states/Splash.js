import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('map', 'assets/images/map.jpg')
    this.load.image('marker', 'assets/images/marker.png')
    this.load.image('button', 'assets/images/button.png');
    this.load.image('female1', 'assets/images/FlareFemaleHero1.png');
    this.load.image('female2', 'assets/images/FlareFemaleHero2.png');
    this.load.image('female3', 'assets/images/FlareFemaleHero3.png');
    this.load.image('male1', 'assets/images/FlareMaleHero1.png');
    this.load.image('male2', 'assets/images/FlareMaleHero2.png');
    this.load.image('male3', 'assets/images/FlareMaleHero3.png');
  }

  create () {
    this.state.start('Game')
  }
}
