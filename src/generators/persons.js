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
  { id: 'goblin', name: 'Goblin', minLevel: 1, maxLevel: 2,  atk: 1, def: 1, hp: 10 },
  { id: 'orc', name: 'Orc', minLevel: 1, maxLevel: 2,        atk: 1, def: 2, hp: 20 },
  { id: 'naga', name: 'Naga', minLevel: 1, maxLevel: 3,      atk: 2, def: 1, hp: 30 },
  { id: 'ratman',  name: 'Ratman', minLevel: 2, maxLevel: 3, atk: 3, def: 1, hp: 40 },
  { id: 'harpy', name: 'Harpy', minLevel: 2, maxLevel: 3,    atk: 4, def: 1, hp: 40 },
  { id: 'treefolk', name: 'Treefolk', minLevel: 2,           atk: 2, def: 2, hp: 60 },
  { id: 'troll', name: 'Troll', minLevel: 3,                 atk: 4, def: 3, hp: 80 },
  { id: 'lichlord', name: 'Lich', minLevel: 3,               atk: 4, def: 4, hp: 40 },
  { id: 'dragon', name: 'Dragon', minLevel: 4,               atk: 6, def: 4, hp: 100 },
  { id: 'lordofViolence', name: 'Demon', minLevel: 4,        atk: 4, def: 5, hp: 80 },
];

const ENEMY_LEVEL_MAP = {};
ENEMY_RACES.forEach(race => {
  if (!race.maxLevel) {
    race.maxLevel = 4;
  }
  for (let l = race.minLevel; l <= race.maxLevel; l++) {
    if (!ENEMY_LEVEL_MAP['l' + l]) {
      ENEMY_LEVEL_MAP['l' + l] = [];
    }
    ENEMY_LEVEL_MAP['l' + l].push(race);
  }
});

const BOSS_PICS = ['boss1', 'boss2', 'boss3'];

const MALE_PICS = 19;
const FEMALE_PICS = 14;

export default {
  getPicForGender(gender) {
    return gender + random.choice(gender === 'male' ? MALE_PICS : FEMALE_PICS);
  },
  randomPerson() {
    const gender = random.from(GENDERS);
    const person = this.buildPerson({
      name: this.randomName(),
      gender,
      attack: random.choice(10) + 5,
      defense: random.choice(10) + 5,
      hp: random.choice(50) + 20,
      pic: this.getPicForGender(gender),
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
  randomEnemy(level) {
    const gender = random.from(GENDERS);
    let referenceLevel = level;
    if (referenceLevel > 4) {
      referenceLevel = 4;
    }
    const race = random.from(ENEMY_LEVEL_MAP['l' + referenceLevel]);
    const pic = race.id;
    const enemy = this.buildPerson({
      name: race.name,
      gender,
      attack: race.atk * level + random.choice(2) + 3,
      defense: race.def * level + random.choice(2),
      hp: race.hp * level + random.choice(10) + 10,
      pic,
      age: random.from(AGES)
    });
    enemy.enemy = true;
    return enemy;
  },
  rollPartyMember() {
    const person = this.randomPerson();
    person.enemy = false;
    return person;
  },
  randomName() {
    //return random.from(NAMES);
    //return fantasyNames('diablo', 'demons', 1);
    return nameGenerator('egyptian');
  },
  randomBoss(level) {
    const mob = this.randomEnemy(level);
    mob.pic = random.from(BOSS_PICS);
    mob.name = this.randomName();
    return mob;
  }
}