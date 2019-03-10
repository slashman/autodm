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
const GOOD_ADJECTIVES = ['holy', 'good', 'sacred', 'bright', 'freedom'];
const VILLAIN_TITLES = ['wizard', 'king', 'emperor', 'prince', 'cleric', 'warrior'];
const ARTIFACT_TYPES = ['ring', 'amulet', 'crown', 'sword', 'grimoire', 'statue', 'crystal', 'orb']

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
  leadToPerson(person, locationId, enemy) {
    return `${person.description} living in ${world.getLocationById(locationId).name} knows how to vanquish ${enemy.name}.`;
  },
  anecdote(enemy) {
    return `${enemy.name} killed my ${random.from(FAMILY_MEMBERS)}.`;
  },
  hintToFind(item, locationId) {
    return `If you expect to have a chance to defeat him, you are going to need the ${item.description}. It can be found in ${world.getLocationById(locationId).name}`;
  }
};