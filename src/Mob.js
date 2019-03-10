import Stat from './Stat';

export default class Mob {
  constructor(attrs) {
    //TODO: Couldnt get object destructuring to work for this :P
    this.name = attrs.name;
    this.gender = attrs.gender;
    this.attack = attrs.attack;
    this.defense = attrs.defense;
    this.hp = new Stat(attrs.hp);
    this.pic = attrs.pic;
    this.description = `A ${attrs.age} ${(this.gender === 'male' ? 'man' : 'woman')}`;
  }
  damage(damage) {
    this.hp.reduce(damage);
    if (this.hp.empty()) {
      this.dead = true;
    }
  }

};