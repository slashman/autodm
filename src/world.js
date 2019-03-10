import locations from './data/locations';
import random from './random';

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
      location.connections = location.connections.filter(c => {
        return locationsMap[c.to] !== undefined;
      });
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
    this.locationsMap = locationsMap;
    return locationsMap;
  },
  getLocationNear(locationId) {
    const walks = random.choice(2) + 1;
    let currentLocation = this.getLocationById(locationId);
    for (let i = 0; i < walks; i++) {
      currentLocation = random.from(currentLocation.connections).to
    }
    return currentLocation;
  },
  randomLocation() {
    return random.from(locations);
  },
  getImportantPlaces() {
    return locations.filter(l => l.important === true);
  },
  getLocationById(locationId) {
    return this.locationsMap[locationId];
  }
}