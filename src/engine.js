import random from './random';
import builder from './builder';
import world from './world';
import consoleui from './consoleui';
import items from './generators/items';
import persons from './generators/persons';
import dialogMaker from './generators/dialog'
import combat from './combat';

const locationsMap = world.getLocationsMap();

const playerStatus = {
  location: null,
  party: [
    persons.buildPartyMember({ name: 'Slash', gender: 'male', attack: 20, defense: 5, hp: 100, pic: 'male7', age: 'middle-aged' }),
    persons.buildPartyMember({ name: 'Lali', gender: 'female', attack: 10, defense: 10, hp: 50, pic: 'female3', age: 'middle-aged' }),
    persons.buildPartyMember({ name: 'Kram', gender: 'male', attack: 30, defense: 3, hp: 70, pic: 'male10', age: 'young' })
  ],
  completed: {},
  items: {}
};

const campaign = {};
let ui = null;

function start (_ui) {
  if (!_ui) {
    ui = consoleui;
    ui.init();
  } else {
    ui = _ui;
  }
  const startingLocation = world.randomLocation();
  campaign.startingLocation = startingLocation;
  campaign.goals = [builder.makeGoal(startingLocation.id)];
  // TODO: More than a goal
  playerStatus.location = startingLocation;
  ui.showTitle()
    .then(() => ui.showIntro(dialogMaker.campaignIntro(campaign)))
    .then(() => gotoLocation(playerStatus.location));
}

function updateContext() {
  if (playerStatus.gameOver) {
    return; // Game dies here.
  }
  const location = playerStatus.location;
  const options = [];
  location.connections.forEach(connection => {
    options.push ({
      type: 'gotoLocation',
      location: connection.to
    })
  });
  ui.printLocationInfo(location, options);
  ui.readOption().then(option => selectOption(options[option - 1]));
  ui.updatePartyData(playerStatus.party);
}

function selectOption(option) {
  if (option && option.type === 'gotoLocation') {
    gotoLocation(option.location);
  }
}

function gotoLocation(location) {
  ui.travelToLocation(location).then(() => {
    if (random.chance(20)) {
      return combat(ui, playerStatus.party);
    } else {
      return true;
    }
  }).then((alive) => {
    if (alive) {
      return enterLocation(location).then(() => {
        updateContext();
      });
    }
  });
}

let pendingEvents;
function enterLocation(location) {
  playerStatus.location = location;
  const potentialEvents = filterEventsByType('enterLocation');
  pendingEvents = [];
  potentialEvents.forEach(event => {
    if (playerStatus.gameOver) {
      return;
    }
    const trigger = event.trigger;
    if (
      (trigger.locationId && location.id === trigger.locationId) ||
      (trigger.locationType && location.type === trigger.locationType)
    ) {
      if (trigger.chance && !random.chance(trigger.chance)) {
        // TODO: Mark location as used
        return;
      }
      if (trigger.hasItems) {
        let missing = false;
        trigger.hasItems.forEach(item => {
          if (!playerStatus.items[item]) {
            missing = true;
          }
        });
        if (missing) {
          return;
        }
      }
      pendingEvents.push(event);
    }
  });
  return processPendingEvents();
}

function processPendingEvents() {
  if (playerStatus.gameOver) {
    return Promise.resolve();
  }
  const event = pendingEvents.shift();
  if (event) {
    return processEvent(event).then(() => processPendingEvents());
  } else {
    return Promise.resolve();
  }
}

function filterEventsByType(triggerType) {
  const events = [];
  campaign.goals.forEach(goal => {
    goal.plotline.forEach(event => {
      if (playerStatus.completed[event.id]){
        return;
      }
      if (event.requires && !playerStatus.completed[event.requires]) {
        return;
      }
      if (event.trigger && event.trigger.type === triggerType) {
        events.push(event);
      }
    });
  });
  return events;
}

function processEvent(event) {
  return Promise.resolve().then(() => {
    if (event.type === 'meet') {
      return processMeetEvent(event);
    } else if (event.type === 'battle') {
      return processBattleEvent(event);
    } else if (event.type === 'find') {
      return processFindEvent(event);
    } else if (event.type === 'discoverConnection') {
      return processDiscoverConnectionEvent(event);
    }
  }).then(() => {
    playerStatus.completed[event.id] = true;
    if (event.gameOver) {
      playerStatus.gameOver = true;
    }
  });
}

function processMeetEvent(event) {
  return ui.showMeetEvent(event);
}

function processBattleEvent(event) {
  return ui.showMeetEvent(event).then(() => {
    return combat(ui, playerStatus.party, event.person);
  }).then(() => {
    if (event.isBossBattle) {
      return ui.showBossDefeated(event.person);
    }
  }).then(() => {
    if (event.isFinalBossBattle) {
      playerStatus.gameOver = true;
    }
  });
}

function processFindEvent(event) {
  const item = items.get(event.itemId);
  playerStatus.items[event.itemId] = item;
  return ui.showFindEvent(event);
}

function processDiscoverConnectionEvent(event) {
  connectLocations(playerStatus.location, event.locationId);
  return ui.showDiscoverConnectionEvent(event);
}

function connectLocations(location, targetId) {
  const targetLocation = locationsMap[targetId];
  if (!location.connections) {
    location.connections = [];
  }
  if (!targetLocation.connections) {
    targetLocation.connections = [];
  }
  location.connections.push({ to: targetLocation });
  targetLocation.connections.push({ to: location });
}

export default { start };