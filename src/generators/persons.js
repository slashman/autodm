import random from "../random";

const NAMES = [
  "Louis", "Lane", "Lili", "Lulu", "Kale", "Glenn", "Michael", "Ken", "Arnold", "Kornel", "Jeff"
];

const AGES = [
  "young", "middle-aged", "old"
];

const GENDERS = [
  "man", "woman"
];

export default {
  random() {
    return {
      name: random.from(NAMES),
      description: `a ${random.from(AGES)} ${random.from(GENDERS)}`
    }
  },
  randomName() {
    return random.from(NAMES);
  }
}