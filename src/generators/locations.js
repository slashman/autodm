import persons from './persons';
import random from '../random';

const LOCATION_TYPES = ['tomb', 'tower', 'dungeon', 'castle', 'cave'];

export default {
  random() {
    const location = {
      type: random.from(LOCATION_TYPES)
    };
    location.description = `${location.type} of ${persons.randomName()}`;
    return location;
  }
}