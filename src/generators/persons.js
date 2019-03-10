import random from "../random";
import Mob from '../Mob';

const NAMES = [
  "Louis", "Lane", "Lili", "Lulu", "Kale", "Glenn", "Michael", "Ken", "Arnold", "Kornel", "Jeff"
];

const AGES = [
  "young", "middle-aged", "old"
];

const GENDERS = [
  "male", "female"
];

const ENEMY_RACES = [
  { id: 'dragon', name: 'Dragon' },
  { id: 'goblin', name: 'Goblin' },
  { id: 'harpy', name: 'Harpy' },
  { id: 'lichlord', name: 'Lich' },
  { id: 'lordofViolence', name: 'Demon' },
  { id: 'naga', name: 'Naga' },
  { id: 'orc', name: 'Orc' },
  { id: 'ratman',  name: 'Ratman' },
  { id: 'treefolk', name: 'Treefolk' },
  { id: 'troll', name: 'Troll' }
];

const MALE_PICS = 19;
const FEMALE_PICS = 14;

export default {
  randomPerson() {
    const gender = random.from(GENDERS);
    const pic = random.choice(gender === 'male' ? MALE_PICS : FEMALE_PICS);
    const person = this.buildPerson({
      name: random.from(NAMES),
      gender,
      attack: random.choice(10) + 5,
      defense: random.choice(10) + 5,
      hp: random.choice(50) + 20,
      pic: gender + pic,
      age: random.from(AGES)
    });
    return person;
  },
  buildPerson(attributes) {
    return new Mob(attributes);
  },
  buildPartyMember (attributes) {
    const person = this.buildPerson(attributes);
    person.enemy = false;
    return person;
  },
  randomEnemy() {
    const gender = random.from(GENDERS);
    const race = random.from(ENEMY_RACES);
    const pic = race.id;
    const enemy = this.buildPerson({
      name: race.name,
      gender,
      attack: random.choice(10) + 5,
      defense: random.choice(10) + 5,
      hp: random.choice(50) + 20,
      pic,
      age: random.from(AGES)
    });
    enemy.enemy = true;
    return enemy;
  },
  randomName() {
    return random.from(NAMES);
  },
  createMob(id) {
    const mob = this.randomEnemy();
    mob.pic = id;
    return mob;
  }
}