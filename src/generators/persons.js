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

const MALE_PICS = 19;
const FEMALE_PICS = 14;

export default {
  random() {
    const gender = random.from(GENDERS);
    const pic = random.choice(gender === 'male' ? MALE_PICS : FEMALE_PICS);
    const person = this.buildPerson({
      name: random.from(NAMES),
      gender,
      attack: random.choice(10) + 5,
      defense: random.choice(10) + 5,
      hp: random.choice(50) + 20,
      pic,
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
    const randomPerson = this.random();
    randomPerson.enemy = true;
    return randomPerson;
  },
  randomName() {
    return random.from(NAMES);
  }
}