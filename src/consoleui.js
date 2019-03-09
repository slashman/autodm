import items from './generators/items';

export default {
  init() {
    this.optionListener = null;
    document.addEventListener("keydown", this.keydown.bind(this), true);
  },
  printLocationInfo(location, options) {
    this.print('------');
    this.print('It\'s Wednesday, morning'); // TODO: Simulate time passing
    this.print('You are in ' + location.name);
    this.print('What do you want to do?');
    let counter = 1;
    options.forEach(option => {
      this.print(counter + ' - ' + option.type + ' ' + option.location.name);
      counter++
    });
  },
  showMeetEvent(event) {
    this.print('You meet ' + event.description + ', he says:');
    event.dialog.forEach(dialog => this.print(dialog));
  },
  showFindEvent(event) {
    const item = items.get(event.itemId);
    this.print('You find ' + item.description);
  },
  showDiscoverConnectionEvent(event) {
    this.print(event.description);
  },
  showIntro(campaign) {
    campaign.goals.forEach(goal => {
      this.print('You must '+ goal.type + ' ' + goal.target);
    });
  },
  print(message) {
    console.log(message);
  },
  readOption() {
    return new Promise (resolve => {
      this.optionListener = (option) => resolve(option);
    })
  },
  keydown(keyEvent) {
    this.optionListener && this.optionListener(parseInt(keyEvent.key, 10));
  }
}