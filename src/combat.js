import persons from './generators/persons';

let ui = null;
let combatantIndex = 0;
let combatants = null;

function combat(_ui, party) {
  ui = _ui;
  const enemies = [
    persons.randomEnemy()
  ];
  combatants = party.concat(enemies);
  combatantIndex = 0;
  return doCombat().then(victory => ui.showCombatVictory());
}

function doCombat() {
  const enemies = combatants.filter(c => c.enemy === true);
  if (enemies.length === 0) {
    return Promise.resolve(true);
  }
  const currentCombatant = combatants[combatantIndex++];
  if (combatantIndex == combatants.length) {
    combatantIndex = 0;
  }
  if (currentCombatant.isPlayer) {

  } else {
    return combatTurn(currentCombatant).then(() => doCombat());
  }
}

function combatTurn(combatant) {
  return ui.displayCombatAction(combatant, combatant, combatant.name + ' does nothing.');
}

export default combat;