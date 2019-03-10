import textBuilder from './textBuilder';
import PartyStatus from './PartyStatus';
import Button from './Button';
import persons from '../generators/persons';

export default class Title {
  constructor(game, parentGroup) {
    this.game = game;

    this.group = game.add.group(parentGroup);
    
    const backgroundSprite = new Phaser.Sprite(this.game, game.width / 2, game.height / 2, 'title');
    this.group.add(backgroundSprite);
    backgroundSprite.anchor.setTo(0.5);
    backgroundSprite.inputEnabled = true;
    backgroundSprite.events.onInputDown.add(() => this.noop());

    // Fit to height
    const scale = game.height / backgroundSprite.height;
    backgroundSprite.scale.setTo(scale);

    const titleText = textBuilder.makeText(this.game, game.width / 2, 100, '#f4bf42', '#995900');
    titleText.text ='Party Setup';
    this.group.add(titleText);

    this.players = [];
    const start = game.width / 2 - (1.5 * 150) - 125;
    for (let i = 0; i < 3; i++) {
        this.players.push(new PartyStatus(game, start + i * 350, 400, this.group));
        this.players[i].update(persons.rollPartyMember());
        if (i != 0) {
            new Button(game, start + i * 350, 450, 'Roll', () => this.rollCharacter(i), this.group );
        } else {
            new Button(game, start + i * 350, 450, 'Stats', () => this.stats(i), this.group );
            new Button(game, start + i * 350, 525, 'Picture', () => this.changePic(i), this.group );
            new Button(game, start + i * 350, 600, 'Name', () => this.rename(i), this.group );
            new Button(game, start + i * 350, 675, 'Gender', () => this.gender(i), this.group );
            
        }
    }
    new Button(game, game.width / 2, game.height - 50, 'Start', () => this.start(), this.group );
    this.hide();
  }
  rollCharacter(index) {
    const partyMember = persons.rollPartyMember();
    this.players[index].update(partyMember);
  }
  changePic(index) {
    const person = this.players[index].person;
    person.pic = persons.getPicForGender(person.gender);
    this.players[index].update(person);
  }
  rename(index) {
    const name = prompt("Please enter your name");
    const person = this.players[index].person;
    person.name = name;
    this.players[index].update(person);
  }
  gender(index) {
    const person = this.players[index].person;
    person.gender = person.gender === 'male' ? 'female' : 'male';
    person.pic = persons.getPicForGender(person.gender);
    this.players[index].update(person);
  }
  stats(index) {
    const person = this.players[index].person;
    const name = person.name;
    const gender = person.gender;
    const pic = person.pic;
    const newPerson = persons.rollPartyMember();
    newPerson.name = name;
    newPerson.gender = gender;
    newPerson.pic = pic;
    this.players[index].update(newPerson);
  }
  show() {
    this.group.visible = true;
    return new Promise(r => {
      this.hideCb = r;
    });
  }
  start() {
    this.hide();
  }
  noop() {}
  hide() {
    this.group.visible = false;
    this.hideCb && this.hideCb(this.players.map(p => p.person));
  }
}