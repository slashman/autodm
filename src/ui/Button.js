export default class Button {
  constructor(game, x, y, text, cb, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const sprite = new Phaser.Sprite(this.game, x, y, 'button');
    sprite.anchor.setTo(0.5);
    sprite.inputEnabled = true;
    if (cb) {
      sprite.events.onInputDown.add(cb);
    }

    this.textbox = new Phaser.Text(this.game, x, y, text, { font: '32px Augusta', fill: '#f4bf42', align: 'center' });
    this.textbox.anchor.setTo(0.5);

    this.group.add(sprite);
    this.group.add(this.textbox);
  }
  setText(text) {
    this.textbox.text = text;
  }
  setVisible(visible) {
    this.group.visible = visible;
  }
}