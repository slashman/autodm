const locations = [
  {
    id: 'simonTomb',
    name: 'Simon Tomb',
    connections: [
      {
        to: 'simonTombBottom'
      }
    ]
  },
  {
    id: 'simonTombBottom',
    name: 'Simon Tomb Bottom'
  },
  {
    id: 'kakaka',
    name: 'Kakaka Plaza',
    type: 'plaza',
    connections: [
      {
        to: 'forestRoad1'
      },
      {
        to: 'kakakaPub'
      },
      {
        to: 'kakakaCastle'
      },
      {
        to: 'kakakaGraveyard'
      },
    ]
  },
  {
    id: 'kakakaPub',
    name: 'Kakaka Pub',
    type: 'pub'
  },
  {
    id: 'kakakaCastle',
    name: 'Kakaka Castle',
    type: 'castle'
  },
  {
    id: 'kakakaGraveyard',
    name: 'Kakaka Graveyard',
    type: 'graveyard'
  },
  {
    id: 'forestRoad1',
    name: 'Forest Road',
    type: 'road',
    connections: [
      {
        to: 'kakake'
      },
      {
        to: 'darkForest1'
      }
    ]
  },
  {
    id: 'kakake',
    name: 'Kakake',
    type: 'plaza',
    connections: [
      {
        to: 'kakakePub'
      },
      {
        to: 'rockyRoad'
      },
      {
        to: 'mountainsRoad'
      },
    ]
  },
  {
    id: 'kakakePub',
    name: 'Kakake Pub',
    type: 'pub'
  },
  {
    id: 'darkForest1',
    name: 'Dark Forest',
    type: 'darkForest',
    connections: [
      {
        to: 'darkForest2'
      }
    ]
  },
  {
    id: 'darkForest2',
    name: 'Dark Forest',
    type: 'darkForest',
    connections: [
      {
        to: 'darkForest3'
      }
    ]
  },
  {
    id: 'darkForest3',
    name: 'Dark Forest',
    type: 'darkForest',
    connections: [
      {
        to: 'darkForest4'
      }
    ]
  },
  {
    id: 'darkForest4',
    name: 'Dark Forest',
    type: 'darkForest'
  },
  {
    id: 'rockyRoad',
    name: 'Rocky Road',
    type: 'road',
    connections: [
      {
        to: 'draculaCastle'
      }
    ]
  },
  {
    id: 'draculaCastle',
    name: 'Dracula Castle',
    type: 'castle',
    connections: [
      {
        to: 'draculaHall'
      }
    ]
  },
  {
    id: 'draculaHall',
    name: 'Dracula Hall',
    type: 'castleHall'
  },

  {
    id: 'mountainsRoad',
    name: 'Mountain Road',
    type: 'road',
    connections: [
      {
        to: 'mountainTop'
      }
    ]
  },
  {
    id: 'mountainTop',
    name: 'Mount Hya',
    type: 'mountain'
  }
];

const items = { // This is also built dynamically
  killerWhip: {
    name: 'Killer Whip'
  },
  crownOfLaurel: {
    name: 'Crown of Laurel'
  }
};

const locationsMap = {};

function readyData() {
  locations.forEach(location => {
    locationsMap[location.id] = location;
    if (!location.connections) {
      location.connections = [];
    }
  });
  locations.forEach(location => {
    location.connections.forEach(connection => {
      if (connection.recyprocal) {
        return;
      }
      connection.to = locationsMap[connection.to];
      const recyprocalConnection = Object.assign(
        {
          recyprocal: true,
        }, connection,
        {
          to: location
        });
      connection.to.connections.push(recyprocalConnection);
    });
  });
}

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
      target: 'dracula',
      progress: 0,
      plotline: [ // This should be built in runtime, based on the campaign progress
        {
          id: 'meetLouis',
          trigger: {
            type: 'enterLocation',
            locationType: 'pub',
            chance: 70
          },
          type: 'meet',
          description: 'a middle aged man',
          dialog: [
            'I am Louis.',
            'Dracula killed my wife. Help me avenge her!',
            'An old man living in the forest knows the secret to kill Dracula.'
          ]
        },
        {
          id: 'meetOldMan',
          requires: 'meetLouis', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationType: 'darkForest',
            chance: 80
          },
          type: 'meet',
          description: 'an Old man',
          dialog: [
            'So, you are seeking to kill Dracula',
            'You will need to find two things:',
            'The killer whip and the crown of laurel',
            'The killer whip is in the tomb of Simon',
            'I don\'t know about the crown of Laurel',
          ]
        },
        {
          id: 'meetPete',
          requires: 'meetOldMan', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationType: 'pub',
            chance: 70
          },
          type: 'meet',
          description: 'a middle aged woman',
          dialog: [
            'I am Pete.',
            'Simon was buried in Mount Hya'
          ]
        },
        {
          id: 'discoverSimonTomb',
          requires: 'meetPete', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationId: 'mountainTop'
          },
          type: 'discoverConnection',
          description: 'You find the entrance to Simon Tomb',
          locationId: 'simonTomb'
        },
        {
          id: 'findKillerWhip',
          requires: 'meetOldMan', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationId: 'simonTombBottom'
          },
          type: 'find',
          itemId: 'killerWhip'
        },
        {
          id: 'discoverCrownOfLaurel',
          requires: 'meetOldMan', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationType: 'pub',
            chance: 20
          },
          type: 'meet',
          description: 'an beautiful woman',
          dialog: [
            'The crown of Laurel... my grandmother wore it',
            'You can find it at her tomb, in Kakaka'
          ]
        },
        {
          id: 'findCrownOfLaurel',
          requires: 'discoverCrownOfLaurel', // This won't be needed once the plot is build dynamically
          trigger: {
            type: 'enterLocation',
            locationId: 'kakakaGraveyard'
          },
          type: 'find',
          itemId: 'crownOfLaurel'
        },
        {
          id: 'killDracula',
          trigger: {
            type: 'enterLocation',
            locationId: 'draculaHall',
            hasItems: ['killerWhip', 'crownOfLaurel']
          },
          type: 'meet',
          description: 'Dracula',
          dialog: [
            'Argh! It\'s the crown of Laurel and the Sacred Whip!',
            'I dieeee!!!!'
          ],
          gameOver: true
        },
        {
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
        },
      ]
    }
  ];
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
      if (trigger.chance && !chance(trigger.chance)) {
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
  const item = items[event.itemId];
  print('You find ' + item.name);
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

// Utility

function chance(percent) {
  return Math.random() <= percent / 100;
}

// Program Execution
  readyData();
start();