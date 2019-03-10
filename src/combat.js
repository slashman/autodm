import persons from './generators/persons';
import random from './random';

let ui = null;
let combatantIndex = 0;
let combatants = null;
let party = null;
let status = null;

function combat(_ui, _status, _enemies) {
  status = _status;
  ui = _ui;
  party = status.party;
  const level = status.level;
  let enemies;
  if (_enemies) {
    if (_enemies.length) {
      enemies = _enemies;
    } else {
      enemies = [_enemies];
    }
  } else {
    enemies = [];
  }
  const padding = random.choice(party.length - enemies.length);
  for (let i = 0; i < padding; i++) {
    enemies.push(persons.randomEnemy(level))
  }
  combatants = party.concat(enemies);
  combatantIndex = 0;
  return ui.showCombatStart(enemies)
    .then(() => doCombat())
    .then(victory => {
      const outcome = {
        xpPrize: 0,
        victory
      };
      if (victory) {
        outcome.xpPrize = enemies.length * level * 20;
        status.xp += outcome.xpPrize;
        if (status.xp > status.nextLevel) {
          outcome.levelUp = true;
          status.party.forEach(member => {
            const baseStats = {
              atk: member.attack / status.level,
              def: member.defense / status.level,
              hp: member.hp.current / status.level
            }
            baseStats.atk *= (status.level + 1);
            baseStats.def *= (status.level + 1);
            baseStats.hp *= (status.level + 1);
            member.attack = baseStats.atk;
            member.defense = baseStats.def;
            member.hp.max = baseStats.hp;
            member.hp.current = baseStats.hp;
          });
          status.level++;
          status.nextLevel *= 2;
          outcome.newLevel = status.level;
        }
      }
      return ui.showCombatOutcome(outcome)
        .then(() => victory);
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
  return Promise.resolve()
    .then(() => {
      const enemies = combatants.filter(c => c.enemy != currentCombatant.enemy && !c.dead);
      if (currentCombatant.isPlayer) {
        return ui.selectCombatAction(currentCombatant, enemies);
      } else {
        return selectActionFor(currentCombatant, enemies);
      }
    })
    .then(({ action, target }) => {
      if (action === 'nothing') {
        return ui.displayCombatAction(currentCombatant, undefined, currentCombatant.name + ' does nothing.');
      } else if (action === 'attack') {
        return attack(currentCombatant, target);
      }
    })
    .then(() => doCombat());
}

function selectActionFor(combatant, enemies) {
  if (combatant.dead) {
    return { action: 'dead' };
  }
  const choice = random.choice(3);
  // TODO: Use special skill if choice === 3
  if (enemies.length === 0 /* || choice === 1 */) {
    // Do nothing
    return { action: 'nothing' };
  } else {
    return { action: 'attack', target: random.from(enemies) };
  }
}

function attack(attacker, defender) {
  let damage = random.choice(attacker.attack) * 2;
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