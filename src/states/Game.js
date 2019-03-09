import Phaser from 'phaser';
import Time from '../Time';
import engine from '../engine';
import gfxui from '../gfxui';

export default class extends Phaser.State {
  create () {
    Time.init(this.game)
    const ui = gfxui;
    gfxui.init(game);
    engine.start(gfxui);
  }
}
