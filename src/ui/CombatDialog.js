import PartyStatus from './PartyStatus';
import PlotDialog from './PlotDialog';

const DIALOG_BORDER = 40;
const PORTRAIT_HEIGHT = 300;
const PORTRAIT_WIDTH = 300;
const DIALOG_PADDING = 40;
const PORTRAIT_PADDING = 40;

export default class CombatDialog {
  constructor(game, x, y, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, x, y, 'dialog2');
    this.group.add(backgroundSprite);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.hide());

    this.portrait1 = new PartyStatus(this.game, x + DIALOG_BORDER + PORTRAIT_WIDTH / 2 + PORTRAIT_PADDING, y + backgroundSprite.height - DIALOG_BORDER, this.group)
    this.portrait2 = new PartyStatus(this.game, x + backgroundSprite.width - DIALOG_BORDER - PORTRAIT_WIDTH / 2 - PORTRAIT_PADDING, y + backgroundSprite.height - DIALOG_BORDER, this.group)
    this.portrait2.mirror();

    this.combatAction = new PlotDialog(game, x, y + 400, 'alert', this.group);
    this.hide();
  }
  display(attacker, defender, action) {
    this.portrait1.update(attacker);
    if (defender) {
      this.portrait2.update(defender);
      this.portrait2.setVisible(true);
    } else {
      this.portrait2.setVisible(false);
    }
    this.combatAction.display(action);
    this.group.visible = true;
    return new Promise(r => {
      this.hideCb = r;
    });
  }
  hide() {
    this.group.visible = false;
    this.hideCb && this.hideCb();
  }
}