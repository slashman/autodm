import persons from './generators/persons';
import random from './random';

let ui = null;
let combatantIndex = 0;
let combatants = null;
let party = null;

function combat(_ui, _party) {
  ui = _ui;
  party = _party;
  const enemies = [
    persons.randomEnemy(),
    persons.randomEnemy()
  ];
  combatants = party.concat(enemies);
  combatantIndex = 0;
  return ui.showCombatStart(enemies).then(() => doCombat()).then(victory => {
    ui.showCombatVictory(victory);
    return victory;
  });
}

function doCombat() {
  const enemies = combatants.filter(c => c.enemy === true && !c.dead);
  if (enemies.length === 0) {
    return Promise.resolve(true);
  }
  if (party.filter(c => !c.dead).length === 0) {
    return Promise.resolve(false); 
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
  if (combatant.dead) {
    return Promise.resolve();
  }
  const enemies = combatants.filter(c => c.enemy != combatant.enemy && !c.dead);
  const choice = random.choice(3);
  if (enemies.length === 0 /* || choice === 1 */) {
    // Do nothing
    return ui.displayCombatAction(combatant, undefined, combatant.name + ' does nothing.');
  } else {
    const target = random.from(enemies);
    // TODO: Use special skill if choice === 3
    return attack(combatant, target);
  }
}

function attack(attacker, defender) {
  let damage = random.choice(attacker.attack);
  damage -= random.choice(defender.defense);
  let message = attacker.name + ' attacks ' + defender.name;
  if (damage > 0) {
    defender.damage(damage);
    if (defender.dead) {
      message += '.\n' + defender.name + ' dies!';
    } else {
      message += ' causing ' + damage + ' damage.';
    }
  } else {
    message += ', but causes no damage!';
  }
  return ui.displayCombatAction(attacker, defender, message);
}

export default combat;