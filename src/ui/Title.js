import textBuilder from './textBuilder';

export default class Title {
  constructor(game, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, game.width / 2, game.height / 2, 'title');
    this.group.add(backgroundSprite);
    backgroundSprite.anchor.setTo(0.5);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.hide());

    // Fit to height
    const scale = game.height / backgroundSprite.height;
    backgroundSprite.scale.setTo(scale);

    const titleText = textBuilder.makeText(this.game, game.width / 2, 150, '#f4bf42', '#995900', '96px Deutsch');
    titleText.text ='Heroes of Noresskia';
    this.group.add(titleText);

    const tapToStartText = textBuilder.makeText(this.game, game.width / 2, 350, '#f4bf42', '#995900');
    tapToStartText.text ='Tap to Start';
    this.group.add(tapToStartText);

    const creditsText = textBuilder.makeText(this.game, game.width / 2, game.height - 50, '#ffffff', '#dddddd', '18px OfenbacherSchwabCAT', 0);
    creditsText.text ='7DRL Challenge 2019 - Santiago Zapata';
    this.group.add(creditsText);

    const credits2Text = textBuilder.makeText(this.game, game.width / 2, game.height - 25, '#ffffff', '#dddddd', '18px OfenbacherSchwabCAT', 0);
    credits2Text.text ='See CREDITS.MD for a full list of attributions.';
    this.group.add(credits2Text);

    this.hide();
  }
  show() {
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