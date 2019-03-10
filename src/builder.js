import world from "./world";

import locationsGen from "./generators/locations";
import persons from "./generators/persons";
import items from "./generators/items";
import dialogMaker from "./generators/dialog";

import random from "./random";

const QUEST_TYPES = ['findPerson', 'revealItemNeeded'];

let sequence = 0;

export default {
  makeGoal(startingLocation) {
    const numBosses = random.choice(4);
    const bosses = [];
    for (let i = 0; i < numBosses; i++) {
      bosses.push(persons.randomBoss());
    }
    // TODO: Different types of subgoals
    
    const villain = bosses[bosses.length - 1];
    const goal = {
      type: 'defeat',
      villain,
      plotline: this.makePlotline(startingLocation, bosses, villain),
      bosses
    };
    return goal;
  },
  makePlotline (startingLocation, bosses, villain) {
    const plotline = [];
    let personsToFind = [];
    
    this.villain = villain;
    this.currentBoss = bosses[0];

    const firstActivity = this.buildFindPerson({
      person: persons.randomPerson(),
      locationId: startingLocation
    });
    personsToFind.push(firstActivity.nextStep);
    plotline.push(firstActivity);
    let currentActivity = firstActivity;
    let currentLocation = world.getLocationById(startingLocation);

    //// Test
    /*plotline.push(this.buildBattleMob({
      person: persons.createMob('boss1'),
      locationId: currentLocation
    }));
    */
    /// End Test

    bosses.forEach(boss => {
      this.currentBoss = boss;
      let pendingItems = 2;
      const requiredItems = [];
      while (pendingItems > 0) {
        const nextQuestType = random.from(QUEST_TYPES);
        let nextPerson = random.from(personsToFind);
        personsToFind = personsToFind.filter(x => x !== nextPerson);
        currentLocation = world.getLocationNear(currentLocation.id);
        if (!nextPerson) {
          nextPerson = {
            person: persons.randomPerson(),
            locationId: currentLocation.id
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
      currentLocation = world.getLocationNear(currentLocation.id);
      const battleBossActivity = this.buildBattleMob({
        person: boss,
        locationId: currentLocation.id,
        requiredItems
      });
      battleBossActivity.isFinalBossBattle = boss === villain;
      plotline.push(battleBossActivity);
      currentActivity = battleBossActivity;
    });
    console.log(plotline);
    return plotline;
  },
  buildBattleMob(context) {
    const person = context.person;
    const event = {
      id: sequence++,
      person,
      type: 'battle',
      gameOver: context.endBoss === true
    }
    event.trigger = {
      type: 'enterLocation',
      locationId: context.locationId,
      chance: 100,
      hasItems: context.requiredItems
    },
    event.dialog = [];
    event.dialog.push(`Prepare to die!`); //TODO
    event.isBossBattle = true;
    return event;
  },
  buildFindPerson(context) {
    const person = context.person;
    const event = {
      id: sequence++,
      person,
      type: 'meet'
    }
    // When should this event be triggered
    event.trigger = {
      type: 'enterLocation',
      locationId: context.locationId,
      chance: 100
    },
    // And how should it unfold?
    event.dialog = [];
    // Insert some flavor with the villain and personal context
    if (random.choice(2) === 1) {
      event.dialog.push(dialogMaker.anecdote(this.currentBoss));
    } else {
      event.dialog.push(dialogMaker.anecdote(this.villain));
    }
    // Add clues for upcoming points
    const nextStep = {
      person: persons.randomPerson(),
      locationId: world.getLocationNear(context.locationId).id
    }
    event.dialog.push(dialogMaker.leadToPerson(nextStep.person, nextStep.locationId, this.currentBoss));
    event.nextStep = nextStep;
    return event;
  },
  buildRevealItemNeeded(context) {
    const person = context.person;
    const event = {
      id: sequence++,
      person: person,
      type: 'meet'
    }
    // When should this event be triggered
    event.trigger = {
      type: 'enterLocation',
      locationId: context.locationId,
      chance: 100
    },
    // And how should it unfold?
    event.dialog = [];
    // Insert some flavor with the villain and personal context
    if (random.choice(2) === 1) {
      event.dialog.push(dialogMaker.anecdote(this.currentBoss));
    } else {
      event.dialog.push(dialogMaker.anecdote(this.villain));
    }
    // Add clues for upcoming points
    const nextStep = {
      item: items.random(),
      locationId: world.getLocationNear(context.locationId).id
    }
    event.dialog.push(dialogMaker.hintToFind(nextStep.item, nextStep.locationId));
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
