const DIALOG_BORDER = 40;
const DIALOG_PADDING = 40;

export default class Dialog {
  constructor(game, x, y, spriteId = 'dialog', parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, x, y, spriteId);
    this.group.add(backgroundSprite);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.hide());

    this.dialogTextbox = new Phaser.Text(
      this.game, x + backgroundSprite.width / 2,
      y + backgroundSprite.height / 2,
      '',
      {
        font: '24px Augusta',
        fill: '#492811',
        wordWrap: true,
        wordWrapWidth: backgroundSprite.width - 2 * (DIALOG_BORDER + DIALOG_PADDING),
        align: 'center'
      }
    );
    this.dialogTextbox.anchor.setTo(0.5);
    this.group.add(this.dialogTextbox);
    this.hide();
  }
  display(text) {
    this.dialogTextbox.text = text; 
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