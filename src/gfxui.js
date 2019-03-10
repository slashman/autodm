import Button from './ui/Button';
import PartyStatus from './ui/PartyStatus';
import Dialog from './ui/Dialog';
import PlotDialog from './ui/PlotDialog';
import items from './generators/items';
import Time from './Time';

export default {
  init(game) {
    this.game = game;
    this.optionListener = null;

    this.map = this.game.add.image(0, 0, 'map')
    const partyMarker = this.game.add.sprite(this.game.width / 2, this.game.height / 2 - 30, 'marker');
    partyMarker.anchor.setTo(0.5);
    this.buttons = [];
    this.partyStatuses = [];
    for (let i = 0; i < 5; i++) {
      this.buttons.push(new Button(game, 850, i * 70 + 400, '-', () => this.selectOption(i + 1), undefined  ));
    }
    this.dialog = new Dialog(game, 100, 50, undefined)
    for (let i = 0; i < 3; i++) {
      this.partyStatuses.push(new PartyStatus(game, 100 + i * 250, this.game.height, undefined));
    }
    
    this.locationTxt = this.game.add.text(50, 550, 'Location', {fill: "#000000"});
    this.eventTxt = this.game.add.text(80, 50, '', {fill: "#000000"});

    this.plotDialog = new PlotDialog(game, 100, 50, undefined)
    
  },
  disableButtons() {
    this.buttons.forEach(button => button.setVisible(false));
  },
  printLocationInfo(location, options) {
    options.forEach((option, i) => {
      this.buttons[i].setVisible(true)
      this.buttons[i].setText(option.location.name);
    });
    this.locationTxt.text = location.name;
  },
  travelToLocation(location) {
    // TODO: Calculate time based on distance to travel
    this.disableButtons();
    this.game.add.tween(this.map).to({x: -location.x + 1024 / 2, y: -location.y + 768 / 2 }, 1000, null, true)
    return Time.wait(1500);
  },
  showMeetEvent(event) {
    this.dialog.display(event);
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
    let text = '';
    campaign.goals.forEach(goal => {
      text += 'You must '+ goal.type + ' ' + goal.target;
    });
    return this.plotDialog.display(text);
  },
  updatePartyData(party) {
    this.partyStatuses.forEach(status => status.setVisible(false));
    party.forEach((member, i) => {
      this.partyStatuses[i].setVisible(true);
      this.partyStatuses[i].update(member);
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