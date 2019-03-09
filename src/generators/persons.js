import random from "../random";

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
    const person = {
      name: random.from(NAMES),
      gender: random.from(GENDERS)
    }
    person.description = `a ${random.from(AGES)} ${(person.gender === 'male' ? 'man' : 'woman')}`;
    person.pic = random.choice(person.gender === 'male' ? MALE_PICS : FEMALE_PICS);
    return person;
  },
  randomName() {
    return random.from(NAMES);
  }
}