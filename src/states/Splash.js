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
    this.load.image('button', 'assets/images/button.png')
  }

  create () {
    this.state.start('Game')
  }
}
