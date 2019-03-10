import PartyStatus from './PartyStatus';
import PlotDialog from './PlotDialog';
import Button from './Button';
import random from '../random';

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

    this.portrait = new PartyStatus(this.game, x + DIALOG_BORDER + PORTRAIT_WIDTH / 2 + PORTRAIT_PADDING, y + backgroundSprite.height - DIALOG_BORDER, this.group)

    this.buttons = [];
    for (let i = 0; i < 4; i++) {
      this.buttons.push(new Button(game, x + DIALOG_BORDER + PORTRAIT_WIDTH + PORTRAIT_PADDING + 200, y + DIALOG_BORDER + i * 70 + 60, '', () => this.selectOption(i), this.group ));
    }
    this.group.visible = false;
  }
  noop() {}
  display(person, enemies) {
    this.options = [
      {
        description: 'Fight',
        command: {
          action: 'attack',
          target: random.from(enemies)
        }
      },
      {
        description: 'Do Nothing',
        command: { action: 'nothing'}
      }
    ];
    this.buttons.forEach(b => b.setVisible(false));
    this.options.forEach((o, i) => {
      this.buttons[i].setText(o.description);
      this.buttons[i].setVisible(true);
    });
    this.portrait.update(person);
    this.group.visible = true;
    return new Promise(r => {
      this.hideCb = r;
    });
  }
  selectOption(index) {
    this.group.visible = false;
    this.hideCb && this.hideCb(this.options[index].command);
  }
}