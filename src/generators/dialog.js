import random from '../random';

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
  'kitten'
]

export default {
  campaignIntro(campaign) {
    let text = 'This happened in year ' + (random.choice(500) + 350) + ' of the sixth age of Noresskia.\n';
    const goal = campaign.goals[0];
    text += 'The cruel ' + goal.villain + ' rose in power, and started destroying the world, along with his minions, ';
    goal.bosses.forEach((boss, i) => {
      if (i === goal.bosses.length - 1) {
        return;
      }
      let connector = ', ';
      if (i === goal.bosses.length - 2) {
        connector = '.';
      } else if (i === goal.bosses.length - 3) {
        connector = ' and ';
      }
      text += boss + connector;
    });
    text += '\n\n';
    text += 'After seeing your ' + random.from(FAMILY_MEMBERS) + ' die at the hands of ' + random.from(goal.bosses) + ', you traveled to '+campaign.startingLocation.name;
    text += ' and met with your long lost friends of adventure. Will you be able to save Noresskia from doom?';
    return text;
  },
  leadToPerson(person, locationId, enemy) {
    return `${person.description} living in ${locationId} knows how to vanquish ${enemy}.`;
  },
  anecdote(enemy) {
    return `${enemy} killed my ${random.from(FAMILY_MEMBERS)}.`;
  },
  hintToFind(item, locationId) {
    return `You are going to need the ${item.description}. It can be found in ${locationId}`;
  }
};