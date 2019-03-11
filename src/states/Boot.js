import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#898c83'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload() {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    const docElement = document.documentElement;

    const heightScale = docElement.clientHeight / this.game.height;
    const widthScale = docElement.clientWidth / this.game.width;

    console.log('heightScale ' + heightScale);
    console.log('widthScale ' + widthScale);

    const reigningScale = docElement.clientWidth > docElement.clientHeight ? heightScale : widthScale;
    this.game.scale.setUserScale(reigningScale, reigningScale);
    
    /*if (this.game.height * reigningScale > docElement.clientHeight) {
      this.game.scale.setGameSize(this.game.width, docElement.clientHeight / reigningScale)
    }*/

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }

  }

  create () {
    this.game.add.text(0, 0, "hack", {font:"1px Augusta", fill:"#FFFFFF"});
    this.game.add.text(0, 0, "hack", {font:"1px OfenbacherSchwabCAT", fill:"#FFFFFF"});
    this.game.add.text(0, 0, "hack", {font:"1px Deutsch", fill:"#FFFFFF"});
    
  }

  fontsLoaded() {
    this.fontsReady = true
  }
}
