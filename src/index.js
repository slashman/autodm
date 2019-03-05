import random from './random';
import builder from './builder';
import world from './world';
import items from './generators/items';

const locationsMap = world.getLocationsMap();

const playerStatus = {
  location: null,
  completed: {},
  items: {}
};

const campaign = {};

function start () {
  playerStatus.location = locationsMap.kakaka;
  campaign.goals = [
    {
      type: 'defeat',
      villain: 'dracula',
      progress: 0
    }
  ];
  campaign.goals[0].plotline = builder.makePlotline();
  intro();
  updateContext();
}

function intro() {
  campaign.goals.forEach(goal => {
    print('You must '+ goal.type + ' ' + goal.target);
  });
}

function updateContext() {
  if (playerStatus.gameOver) {
    return; // Game dies here.
  }
  const location = playerStatus.location;
  print('It\'s Wednesday, morning'); // TODO: Simulate time passing
  print('You are in ' + location.name);
  print('What do you want to do?');
  let counter = 1;
  const options = [];
  location.connections.forEach(connection => {
    print(counter + ' - Go to ' + connection.to.name);
    options.push ({
      type: 'enterLocation',
      location: connection.to
    })
    counter++
  });
  readOption().then(option => selectOption(options[option - 1]));
}

function selectOption(option) {
  if (option && option.type === 'enterLocation') {
    enterLocation(option.location);
  }
  print('------');
  updateContext();
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
  print('You meet ' + event.description + ', he says:');
  event.dialog.forEach(dialog => print(dialog));
}

function processFindEvent(event) {
  const item = items.get(event.itemId);
  print('You find ' + item.description);
  playerStatus.items[event.itemId] = item;
}

function processDiscoverConnectionEvent(event) {
  print(event.description);
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

// Output Operations
function print(message) {
  console.log(message);
}


// Keyboard Input Operations

let optionListener = null;

function readOption() {
  return new Promise (resolve => {
    optionListener = (option) => resolve(option);
  })
}

function keydown(keyEvent) {
  optionListener && optionListener(parseInt(keyEvent.key, 10));
}

document.addEventListener("keydown", keydown, true);


// Program Execution
start();