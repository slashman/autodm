import random from './random';
import builder from './builder';
import world from './world';
import consoleui from './consoleui';
import items from './generators/items';
import persons from './generators/persons'
import combat from './combat';

const locationsMap = world.getLocationsMap();

const playerStatus = {
  location: null,
  party: [
    persons.buildPartyMember({ name: 'Slash', gender: 'male', attack: 10, defense: 5, hp: 500, pic: 7, age: 'middle-aged' }),
    persons.buildPartyMember({ name: 'Lali', gender: 'female', attack: 5, defense: 10, hp: 300, pic: 3, age: 'middle-aged' }),
    persons.buildPartyMember({ name: 'Kram', gender: 'male', attack: 15, defense: 3, hp: 300, pic: 10, age: 'young' })
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
  playerStatus.location = locationsMap.lugunum;
  campaign.goals = [
    {
      type: 'defeat',
      target: 'dracula',
      progress: 0
    }
  ];
  campaign.goals[0].plotline = builder.makePlotline('lugunum');
  ui.showIntro(campaign).then(() => {
    gotoLocation(playerStatus.location);
  });
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
    if (true) {
      return combat(ui, playerStatus.party);
    }
  }).then(() => {
    enterLocation(location);
    updateContext();
  });
}

function enterLocation(location) {
  playerStatus.location = location;
  const potentialEvents = filterEventsByType('enterLocation');
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
      processEvent(event);
    }
  });
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
  if (event.type === 'meet') {
    processMeetEvent(event);
  } else if (event.type === 'find') {
    processFindEvent(event);
  } else if (event.type === 'discoverConnection') {
    processDiscoverConnectionEvent(event);
  }
  playerStatus.completed[event.id] = true;
  if (event.gameOver) {
    playerStatus.gameOver = true;
  }
}

function processMeetEvent(event) {
  ui.showMeetEvent(event);
}

function processFindEvent(event) {
  ui.showFindEvent(event);
  const item = items.get(event.itemId);
  playerStatus.items[event.itemId] = item;
}

function processDiscoverConnectionEvent(event) {
  ui.showDiscoverConnectionEvent(event);
  connectLocations(playerStatus.location, event.locationId);
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