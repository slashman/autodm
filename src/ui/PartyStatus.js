export default class PartyStatus {
  constructor(game, x, y, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    this.portraitSprite = new Phaser.Sprite(this.game, x, y, 'blank');
    this.portraitSprite.anchor.setTo(0.5, 1);
    this.nameTextbox = new Phaser.Text(this.game, x, y - 10, '', { font: '32px Augusta', fill: '#f4bf42', align: 'center' });
    this.nameTextbox.anchor.setTo(0.5, 1);
    this.nameTextbox.stroke = "#995900";
    this.nameTextbox.strokeThickness = 8;
    this.nameTextbox.setShadow(2, 2, "#333333", 2, true, false);

    this.group.add(this.portraitSprite);
    this.group.add(this.nameTextbox);
  }
  update(partyMember) {
    this.portraitSprite.loadTexture(partyMember.gender + partyMember.pic);
    this.nameTextbox.text = partyMember.name;
  }
  setVisible(visible) {
    this.group.visible = visible;
  }
  mirror() {
    this.portraitSprite.scale.x *= -1;
  }
}