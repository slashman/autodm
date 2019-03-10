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
    // TODO: Compare distance
    return this.randomLocation();
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