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
    for (let i = 1; i <= 14; i++) {
      this.load.image('female'+i, 'assets/images/female' + i + '.png');
    }
    for (let i = 1; i <= 19; i++) {
      this.load.image('male'+i, 'assets/images/male' + i + '.png');
    }
  }

  create () {
    this.state.start('Game')
  }
}
