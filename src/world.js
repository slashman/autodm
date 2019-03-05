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
    type: 'pub',
    important: true
  },
  {
    id: 'kakakaCastle',
    name: 'Kakaka Castle',
    type: 'castle',
    important: true
  },
  {
    id: 'kakakaGraveyard',
    name: 'Kakaka Graveyard',
    type: 'graveyard',
    important: true
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
    type: 'pub',
    important: true
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
    ],
    important: true
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
    type: 'mountain',
    important: true
  }
];

export default {
  getLocationsMap() {
    const locationsMap = {};
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
    return locationsMap;
  },
  getImportantPlaces() {
    return locations.filter(l => l.important === true);
  }
}