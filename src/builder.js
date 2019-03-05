import world from "./world";

import locationsGen from "./generators/locations";
import persons from "./generators/persons";
import items from "./generators/items";

import random from "./random";

const targetRegions = ['darkForest', 'mountain'];
const QUEST_TYPES = ['findPerson', 'revealItemNeeded'];

let sequence = 0;

export default {
  makePlotline () {
    const plotline = [];
    let personsToFind = []; 
    let pendingItems = 2;
    const requiredItems = [];
    const firstActivity = this.buildFindPerson({
      person: persons.random(),
      locationType: 'pub'
    });
    personsToFind.push(firstActivity.nextStep);
    plotline.push(firstActivity);
    let currentActivity = firstActivity;
    while (pendingItems > 0) {
      const nextQuestType = random.from(QUEST_TYPES);
      let nextPerson = random.from(personsToFind);
      personsToFind = personsToFind.filter(x => x !== nextPerson);
      if (!nextPerson) {
        nextPerson = {
          person: persons.random(),
          locationType: 'pub'
        }
      }
      let nextActivity;
      if (nextQuestType === 'findPerson') {
        nextActivity = this.buildFindPerson(nextPerson);
        nextActivity.requires = currentActivity.id;
        plotline.push(nextActivity);
        personsToFind.push(nextActivity.nextStep);
      } else if (nextQuestType === 'revealItemNeeded') {
        nextActivity = this.buildRevealItemNeeded(nextPerson);
        nextActivity.requires = currentActivity.id;
        plotline.push(nextActivity);
        const findItemActivity = this.buildFindItem(nextActivity.nextStep);
        requiredItems.push(nextActivity.nextStep.item.id)
        findItemActivity.requires = nextActivity.id;
        plotline.push(findItemActivity);
        pendingItems--;
      }
      currentActivity = nextActivity;
    }
    plotline.push({
      id: 'killDracula',
      trigger: {
        type: 'enterLocation',
        locationId: 'draculaHall',
        hasItems: requiredItems
      },
      type: 'meet',
      description: 'Dracula',
      dialog: [
        'Argh! It\'s the ancient items!',
        'I dieeee!!!!'
      ],
      gameOver: true
    });
    plotline.push({
      id: 'deathByDracula',
      trigger: {
        type: 'enterLocation',
        locationId: 'draculaHall'
      },
      type: 'meet',
      description: 'Dracula',
      dialog: [
        'Die, puny human!'
      ],
      gameOver: true
    });
    console.log(plotline);
    return plotline;
  },
  buildFindPerson(context) {
    const person = context.person;
    const event = {
      id: sequence++,
      description: person.description,
      type: 'meet'
    }
    // When should this event be triggered
    event.trigger = {
      type: 'enterLocation',
      locationType: context.locationType,
      chance: 70
    },
    // And how should it unfold?
    event.dialog = [`I am ${person.name}`];
    // Insert some flavor with the villain and personal context
    event.dialog.push(`Dracula killed my wife. Help me avenge her!`); //TODO
    // Add clues for upcoming points
    const nextStep = {
      person: persons.random(),
      locationType: random.from(targetRegions)
    }
    event.dialog.push(`${nextStep.person.description} living in ${nextStep.locationType} knows the secret to kill Dracula.`);
    event.nextStep = nextStep;
    return event;
  },
  buildRevealItemNeeded(context) {
    const person = context.person;
    const event = {
      id: sequence++,
      description: person.description,
      type: 'meet'
    }
    // When should this event be triggered
    event.trigger = {
      type: 'enterLocation',
      locationType: context.locationType,
      chance: 70
    },
    // And how should it unfold?
    event.dialog = [`I am ${person.name}`];
    // Insert some flavor with the villain and personal context
    event.dialog.push(`Dracula killed my wife. Help me avenge her!`); //TODO
    // Add clues for upcoming points
    const nextStep = {
      item: items.random(),
      locationId: random.from(world.getImportantPlaces()).id
    }
    event.dialog.push(`You are going to need the ${nextStep.item.description}.`);
    event.dialog.push(`It can be found in ${nextStep.locationId}`);
    event.nextStep = nextStep;
    return event;
  },
  buildFindItem(context) {
    return {
      id: sequence++,
      type: 'find',
      itemId: context.item.id,
      trigger: {
        type: 'enterLocation',
        locationId: context.locationId
      }
    };
  }
}
