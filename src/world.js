import locations from './data/locations';

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