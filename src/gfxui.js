import Button from './ui/Button';
import items from './generators/items';

export default {
  init(game) {
    this.game = game;
    this.optionListener = null;

    this.map = this.game.add.image(0, 0, 'map')
    this.buttons = [];
    for (let i = 0; i < 5; i++) {
      this.buttons.push(new Button(game, 850, i * 70 + 400, '-', () => this.selectOption(i + 1), undefined  ));
    }
    this.locationTxt = this.game.add.text(50, 550, 'Location', {fill: "#000000"});
    this.eventTxt = this.game.add.text(80, 50, '', {fill: "#000000"});
  },
  printLocationInfo(location, options) {
    this.buttons.forEach(button => button.setVisible(false));
    options.forEach((option, i) => {
      this.buttons[i].setVisible(true)
      this.buttons[i].setText(option.location.name);
    });
    this.locationTxt.text = location.name;
    this.map.x = -2599 + 1024 / 2;
    this.map.y = -3199 + 768 / 2;
    //TODO: Move Map
  },
  showMeetEvent(event) {
    //TODO: Show dialog window and portrait
    let text = this.eventTxt.text + '\n';
    text += 'You meet ' + event.description + ', he says:\n';
    event.dialog.forEach(dialog => text += dialog + '\n');
    this.eventTxt.text = text; 
  },
  showFindEvent(event) {
    //TODO: Show event window and item
    const item = items.get(event.itemId);
    this.eventTxt.text += '\nYou find ' + item.description;
  },
  showDiscoverConnectionEvent(event) {
    //TODO: Show event window and item
    this.eventTxt.text += '\n' + event.description;
  },
  showIntro(campaign) {
    campaign.goals.forEach(goal => {
      this.eventTxt.text += 'You must '+ goal.type + ' ' + goal.target;
    });
  },
  readOption() {
    return new Promise (resolve => {
      this.optionListener = (option) => {
        this.eventTxt.text = '';
        resolve(option);
      }
    });
  },
  selectOption(index) {
    this.optionListener && this.optionListener(index);
  }
}