import random from '../random';
import world from '../world';
import nameGenerator from './name_generator';

const CLOSE_FAMILY_MEMBERS = [
  'brother',
  'sister',
  'father',
  'mother'
];

const FAMILY_MEMBERS = [
  'wife',
  'husband',
  'brother',
  'sister',
  'children',
  'father',
  'mother',
  'fiancee',
  'family',
  'dog',
  'kitty',
  'horse',
  'entire farm',
  'entire town',
  'dreams of freedom'
];

const VILLAIN_ADJECTIVES = ['cruel', 'evil', 'deceiving', 'undead', 'opressing', 'vicious'];
const GOOD_ADJECTIVES = ['holy', 'good', 'sacred', 'bright', 'free'];
const VILLAIN_TITLES = ['wizard', 'king', 'emperor', 'prince', 'cleric', 'warrior'];
const LIEGE_TITLES = ['liege', 'king', 'emperor', 'prince', 'friend'];
const ARTIFACT_TYPES = ['ring', 'amulet', 'crown', 'sword', 'grimoire', 'statue', 'crystal', 'orb'];
const KILL_VERBS = ['defeat', 'kill', 'vanquish', 'anhilate', 'face', 'destroy'];
const KILLED_VERBS = ['defeated', 'killed', 'vanquished', 'anhilated', 'destroyed'];
const JOBS = ['cleric', 'warrior', 'barmaid', 'bartender', 'blacksmith', 'fisherman'];

export default {
  villainFeat() {
    const feat = random.choice(3);
    if (feat === 1) {
      return 'stole the ' + random.from(ARTIFACT_TYPES) + ' of ' + nameGenerator('egyptian');
    } else if (feat === 2) {
      return 'murdered his ' + random.from(CLOSE_FAMILY_MEMBERS) + ', ' + nameGenerator('egyptian');
    } else if (feat === 3) {
      return 'raised a ' + random.from(VILLAIN_ADJECTIVES) + ' army of monsters';
    }
  },
  villainDeed() {
    const feat = random.choice(3);
    if (feat === 1) {
      return 'defeated the '+random.from(GOOD_ADJECTIVES)+' alliance';
    } else if (feat === 2) {
      return 'brought terror into the world';
    } else if (feat === 3) {
      return 'destroyed many cities';
    }
  },
  campaignIntro(campaign) {
    let text = 'This happened in year ' + (random.choice(500) + 350) + ' of the sixth age of Noresskia.\n\n';
    const goal = campaign.goals[0];
    const bosses =  goal.bosses;
    const villainFeat = this.villainFeat();
    text += 'The ' + random.from(VILLAIN_ADJECTIVES) + ' ' + random.from(VILLAIN_TITLES) + ' ' + goal.villain.name + ' ' +
      this.villainFeat() + ' and ' + this.villainDeed();
    if (bosses.length > 1) {
      text += ', along with his ';
      if (bosses.length === 2) {
        text += 'minion, ' + bosses[0].name;
      } else {
        text += 'minions, ';
        bosses.forEach((boss, i) => {
          if (i === goal.bosses.length - 1) {
            return;
          }
          let connector = ', ';
          if (i === goal.bosses.length - 2) {
            connector = '.';
          } else if (i === goal.bosses.length - 3) {
            connector = ' and ';
          }
          text += boss.name + connector;
        });
      }
    }
    text += '.\n\n';
    text += 'After seeing your ' + random.from(FAMILY_MEMBERS) + ' die at the hands of ' + random.from(goal.bosses).name + '\'s forces, you traveled to '+campaign.startingLocation.name;
    text += ' and met with your long lost friends of adventure.\n\nWill you be able to save Noresskia from doom?';
    return text;
  },
  rumor() {
    const choice = random.choice(3);
    if (choice === 1) {
      return 'I heard that';
    } else if (choice === 2) {
      return 'It might be just a rumor, but I heard';
    } else if (choice === 3) {
      return 'A friend told me that';
    }
  },
  aPerson(person) {
    const choice = random.choice(3);
    if (choice === 1) {
      return 'someone';
    } else if (choice === 2) {
      return person.description;
    } else if (choice === 3) {
      return 'a ' + random.from(GOOD_ADJECTIVES) + ' person';
    }
  },
  knowsHowToDefeat(enemy){
    const choice = random.choice(3);
    if (choice === 1) {
      return `knows how to ${random.from(KILL_VERBS)} him`;
    } else if (choice === 2) {
      return `may help you in your quest to ${random.from(KILL_VERBS)} him`;
    } else if (choice === 3) {
      return `used to work for him, and knows his secrets.`;
    }
  },
  leadToPerson(person, locationId, enemy) {
    return `${this.rumor()} ${this.aPerson(person)} in ${world.getLocationById(locationId).name} ${this.knowsHowToDefeat(enemy)}.`;
  },
  anecdote(enemy) {
    const choice = random.choice(4);
    if (choice === 1) {
      return `${enemy.name} ${random.from(KILLED_VERBS)} my ${random.from(FAMILY_MEMBERS)}.`;
    } else if (choice === 2) {
      return `My ${random.from(LIEGE_TITLES)} was ${random.from(KILLED_VERBS)} by ${enemy.name} in the battlefield`;
    } else if (choice === 3) {
      return `I used to work for ${enemy.name}, and luckily managed to escape.`;
    } else if (choice === 4) {
      return `I hate ${enemy.name} with intensity, I wish he could be ${random.from(KILLED_VERBS)}.`;
    }
  },
  youWillNeedThe(item) {
    const choice = random.choice(4);
    if (choice === 1) {
      return `You are going to need the ${item.description}`;
    } else if (choice === 2) {
      return `He fears the ${item.description}`;
    } else if (choice === 3) {
      return `The ${item.description} can void his magic.`;
    } else if (choice === 4) {
      return `The power of the ${item.description} is our only hope.`;
    }
  },
  itCanBeFoundAt(locationId) {
    const locationName = world.getLocationById(locationId).name;
    const choice = random.choice(4);
    if (choice === 1) {
      return `It was last seen at ${locationName}`;
    } else if (choice === 2) {
      return `A ${random.from(JOBS)} keeps it safe at ${locationName}`;
    } else if (choice === 3) {
      return `I hid it at ${locationName}`;
    } else if (choice === 4) {
      return `I read on a book that it can be found at ${locationName}`;
    }
  },
  hintToFind(item, locationId) {
    return `${this.youWillNeedThe(item)}. ${this.itCanBeFoundAt(locationId)}`;
  }
};