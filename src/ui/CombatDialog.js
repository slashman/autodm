import PartyStatus from './PartyStatus';

const DIALOG_BORDER = 40;
const PORTRAIT_HEIGHT = 300;
const PORTRAIT_WIDTH = 300;
const DIALOG_PADDING = 40;
const PORTRAIT_PADDING = 5;

export default class CombatDialog {
  constructor(game, x, y, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, x, y, 'dialog2');
    this.group.add(backgroundSprite);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.hide());

    this.portrait1 = new PartyStatus(this.game, x + DIALOG_BORDER + PORTRAIT_WIDTH / 2, y + backgroundSprite.height - DIALOG_BORDER, this.group)
    this.portrait2 = new PartyStatus(this.game, x + backgroundSprite.width - DIALOG_BORDER - PORTRAIT_WIDTH / 2, y + backgroundSprite.height - DIALOG_BORDER, this.group)
    this.portrait2.mirror();

    this.dialogTextbox = new Phaser.Text(
      this.game, x + backgroundSprite.width / 2,
      y + DIALOG_BORDER + DIALOG_PADDING,
      '',
      {
        font: '24px Augusta',
        fill: '#492811',
        wordWrap: true,
        wordWrapWidth: backgroundSprite.width - 2 * (DIALOG_BORDER + PORTRAIT_PADDING) - PORTRAIT_WIDTH,
        align: 'center'
      }
    );
    this.dialogTextbox.anchor.setTo(0.5);
    this.group.add(this.dialogTextbox);
    this.hide();
  }
  display(attacker, defender, action) {
    this.portrait1.update(attacker);
    if (defender) {
      this.portrait2.update(defender);
      this.portrait2.visible = true;
    } else {
      this.portrait2.visible = false;
    }
    this.dialogTextbox.text = action; 
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