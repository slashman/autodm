import PartyStatus from './PartyStatus';

const DIALOG_BORDER = 40;
const PORTRAIT_HEIGHT = 300;
const PORTRAIT_WIDTH = 300;
const DIALOG_PADDING = 40;
const PORTRAIT_PADDING = 20;

export default class Dialog {
  constructor(game, x, y, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, x, y, 'dialog2');
    this.group.add(backgroundSprite);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.hide());

    this.portrait = new PartyStatus(this.game, x + DIALOG_BORDER + PORTRAIT_WIDTH / 2, y + backgroundSprite.height - DIALOG_BORDER, this.group)

    this.dialogTextbox = new Phaser.Text(
      this.game, x + DIALOG_BORDER + PORTRAIT_WIDTH + PORTRAIT_PADDING,
      y + DIALOG_BORDER + DIALOG_PADDING,
      '',
      {
        font: '24px Augusta',
        fill: '#492811',
        wordWrap: true,
        wordWrapWidth: backgroundSprite.width - 2 * DIALOG_BORDER - PORTRAIT_WIDTH - PORTRAIT_PADDING,
      }
    );

    
    this.group.add(this.dialogTextbox);
    this.hide();
  }
  display(conversation) {
    this.portrait.update(conversation.person);
    // TODO: Display conversation.person.description somewhere?
    let text = '';
    conversation.dialog.forEach(dialog => text += dialog + '\n');
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