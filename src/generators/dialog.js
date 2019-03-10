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
  'kitty',
  'horse',
  'entire farm',
  'entire town',
  'dreams of freedom'
]

export default {
  campaignIntro(campaign) {
    let text = 'This happened in year ' + (random.choice(500) + 350) + ' of the sixth age of Noresskia.\n';
    const goal = campaign.goals[0];
    const bosses =  goal.bosses;
    text += 'The cruel ' + goal.villain.name + ' rose in power, and started destroying the world';
    if (bosses.length > 1) {
      text += ', along with his ';
      if (bosses.length === 2) {
        text += 'minion, ' + bosses[1].name;
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
    text += 'After seeing your ' + random.from(FAMILY_MEMBERS) + ' die at the hands of ' + random.from(goal.bosses).name + ', you traveled to '+campaign.startingLocation.name;
    text += ' and met with your long lost friends of adventure. Will you be able to save Noresskia from doom?';
    return text;
  },
  leadToPerson(person, locationId, enemy) {
    return `${person.description} living in ${locationId} knows how to vanquish ${enemy.name}.`;
  },
  anecdote(enemy) {
    return `${enemy.name} killed my ${random.from(FAMILY_MEMBERS)}.`;
  },
  hintToFind(item, locationId) {
    return `If you expect to have a chance to defeat him, you are going to need the ${item.description}. It can be found in ${locationId}`;
  }
};