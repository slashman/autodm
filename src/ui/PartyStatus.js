import textBuilder from './textBuilder';


export default class PartyStatus {
  constructor(game, x, y, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    this.portraitSprite = new Phaser.Sprite(this.game, x, y, 'blank');
    this.portraitSprite.anchor.setTo(0.5, 1);
    this.nameTextbox = textBuilder.makeText(this.game, x, y, '#f4bf42', '#995900');

    const atkIcon = new Phaser.Sprite(this.game, x - 125, y - 85, 'atk');
    atkIcon.anchor.setTo(0.5);
    const defIcon = new Phaser.Sprite(this.game, x - 125, y - 55, 'def');
    defIcon.anchor.setTo(0.5);

    this.atkTextbox = textBuilder.makeStatText(this.game, atkIcon.x + 30, y - 65, '#ffffff', '#9e0000');
    this.defTextbox = textBuilder.makeStatText(this.game, defIcon.x + 30, y - 35, '#ffffff', '#9e0000');
    this.hpTextbox = textBuilder.makeStatText(this.game, x + 110, y - 35, '#ffffff', '#9e0000');

    this.group.add(this.portraitSprite);
    this.group.add(this.nameTextbox);
    this.group.add(this.hpTextbox);

    this.group.add(atkIcon);
    this.group.add(defIcon);
    this.group.add(this.atkTextbox);
    this.group.add(this.defTextbox);
    this.setVisible(false);
  }
  update(partyMember) {
    this.setVisible(true);
    this.person = partyMember;
    this.portraitSprite.loadTexture(partyMember.pic);
    this.nameTextbox.text = partyMember.name;
    this.hpTextbox.text = partyMember.hp.getText();
    this.atkTextbox.text = partyMember.attack;
    this.defTextbox.text = partyMember.defense;
  }
  setVisible(visible) {
    this.group.visible = visible;
  }
  mirror() {
    this.portraitSprite.scale.x *= -1;
  }
}