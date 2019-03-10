import Button from './ui/Button';
import PartyStatus from './ui/PartyStatus';
import Dialog from './ui/Dialog';
import PlotDialog from './ui/PlotDialog';
import items from './generators/items';
import Time from './Time';
import CombatDialog from './ui/CombatDialog';

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
    this.locationTxt = this.game.add.text(850, 340, '', { font: '32px Augusta', fill: '#f4bf42', align: 'center' });
    this.locationTxt.anchor.setTo(0.5);
    this.locationTxt.stroke = "#995900";
    this.locationTxt.strokeThickness = 8;
    this.locationTxt.setShadow(2, 2, "#333333", 2, true, false);

    this.dialog = new Dialog(game, 100, 50, undefined)
    for (let i = 0; i < 3; i++) {
      this.partyStatuses.push(new PartyStatus(game, 150 + i * 300, this.game.height, undefined));
    }

    this.plotDialog = new PlotDialog(game, 100, 50, 'dialog', undefined);
    this.smallPlotDialog = new PlotDialog(game, 100, 50, 'dialog2', undefined);
    this.combatDialog = new CombatDialog(game, 100, 50, undefined);
    this.disableButtons();
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
    this.locationTxt.visible = true;
  },
  travelToLocation(location) {
    // TODO: Calculate time based on distance to travel
    this.disableButtons();
    this.locationTxt.visible = false;
    this.game.add.tween(this.map).to({x: -location.x + 1024 / 2, y: -location.y + 768 / 2 }, 1000, null, true)
    return Time.wait(1500);
  },
  showMeetEvent(event) {
    return this.dialog.display(event);
  },
  showFindEvent(event) {
    const item = items.get(event.itemId);
    return this.smallPlotDialog.display('You find ' + item.description);
  },
  showDiscoverConnectionEvent(event) {
    return this.smallPlotDialog.display(event.description);
  },
  showIntro(campaignIntro) {
    return this.plotDialog.display(campaignIntro);
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
      this.optionListener = (option) => resolve(option);
    });
  },
  selectOption(index) {
    this.optionListener && this.optionListener(index);
  },
  showCombatStart (enemies) {
    this.disableButtons();
    this.locationTxt.visible = false;
    return this.smallPlotDialog.display('We have been ambushed by ' + enemies.length + ' enemies!');
  },
  showCombatVictory(victory) {
    return this.smallPlotDialog.display(victory ? 'Victory!' : 'Your party has been defeated...');
  },
  displayCombatAction(attacker, defender, action) {
    return this.combatDialog.display(attacker, defender, action);
  },
  showBossDefeated(boss) {
    return this.dialog.display({
      person: boss,
      dialog: ['How could this happen!']
    });
  }
}