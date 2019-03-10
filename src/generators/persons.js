import random from "../random";
import Mob from '../Mob';
// import fantasyNames from 'fantasy-names';
import nameGenerator from './name_generator';

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

const BOSS_PICS = ['boss1', 'boss2', 'boss3'];

const MALE_PICS = 19;
const FEMALE_PICS = 14;

export default {
  randomPerson() {
    const gender = random.from(GENDERS);
    const pic = random.choice(gender === 'male' ? MALE_PICS : FEMALE_PICS);
    const person = this.buildPerson({
      name: this.randomName(),
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
    //return random.from(NAMES);
    //return fantasyNames('diablo', 'demons', 1);
    return nameGenerator('egyptian');
  },
  randomBoss() {
    const mob = this.randomEnemy();
    mob.pic = random.from(BOSS_PICS);
    mob.name = this.randomName();
    return mob;
  }
}