import random from "../random";

const TYPES = [
  "whip", "crown", "sword", "axe", "gauntlet", "helmet", "disc"
];

const ADJECTIVES = [
  "sacred", "holy", "legendary", "golden", "thorn", "chaos", "bright"
];

let sequence = 0;

const itemsMap = {};

export default {
  random() {
    const item = {
      id: sequence++,
      description: `${random.from(ADJECTIVES)} ${random.from(TYPES)}`
    };
    itemsMap[item.id] = item;
    return item;
  },
  get(id) {
    return itemsMap[id];
  }
}