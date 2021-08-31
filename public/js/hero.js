class Hero {
  constructor(charName) {
    this.name = charName;
    this.level = 1;
    this.exp = 0;
    this.neededEXP = 15;
    this.buff = '';
    this.buffCountdown = 0;
    this.status = '';
    this.statusCountdown = 0;
    this.specialMeter = 0;
    this.turn = 1;
  }
}

class Warrior extends Hero {
  constructor(charName) {
    super(charName)
    this.type = 'Warrior';
    this.weapon = 'Sword';
    this.primaryResource = 'Stamina';
    this.secondaryResource = 'Mana';
    this.attack = 'Slash';
    this.attackAmount = 17;
    this.attackCost = 25;
    this.defend = 'Second Wind';
    this.defendAmount = 100;
    this.defendCost = 25;
    this.defendType = 'Stamina';
    this.special = 'Rage';
    this.specialAmount = 100;
    this.specialCost = 80;
    this.criticalHitChance = 10;
    this.criticalHitAmount = 1.20;
    this.strength = 13;
    this.intelligence = 6;
    this.dexterity = 6;
    this.defense = 24;
    this.evade = 10;
    this.hp = 135;
    this.stamina = 1130;
    this.mana = 30;
    this.hpMax = 135;
    this.staminaMax = 1130;
    this.manaMax = 30;
  }
}

class Wizard extends Hero {
  constructor (charName) {
    super(charName);
    this.type = 'Wizard';
    this.weapon = 'Staff';
    this.primaryResource = 'Mana';
    this.secondaryResource = 'Stamina';
    this.attack = 'Fireball';
    this.attackAmount = 55;
    this.attackCost = 30;
    this.defend = 'Protective Shield';
    this.defendAmount = 20;
    this.defendCost = 60;
    this.defendType = 'Defense';
    this.special = 'Minor Healing Spell';
    this.specialAmount = 50;
    this.specialCost = 60;
    this.criticalHitChance = 10;
    this.criticalHitAmount = 1.20;
    this.strength = 6;
    this.intelligence = 13;
    this.dexterity = 6;
    this.defense = 12;
    this.evade = 10;
    this.hp = 80;
    this.stamina = 105;
    this.mana = 145;
    this.hpMax = 80;
    this.staminaMax = 105;
    this.manaMax = 145;
  }
    
}


class Ranger extends Hero {
  constructor(charName) {
    super(charName);
    this.type = 'Ranger';
    this.weapon = 'Bow';
    this.primaryResource = 'Stamina';
    this.secondaryResource = 'Mana';
    this.attack = 'Quick-Shot';
    this.attackAmount = 12;
    this.attackCost = 30;
    this.defend = 'Stealth Evade';
    this.defendAmount = 50;
    this.defendCost = 10;
    this.defendType = 'Evade';
    this.special = 'Poison Arrow';
    this.specialAmount = 50;
    this.specialCost = 60;
    this.criticalHitChance = 10;
    this.criticalHitAmount = 1.20;
    this.strength = 6;
    this.intelligence = 6;
    this.dexterity = 13;
    this.defense = 18;
    this.evade = 10;
    this.hp = 130;
    this.stamina = 120;
    this.mana = 60;
    this.hpMax = 130;
    this.staminaMax = 120;
    this.manaMax = 60;
  }
}

class Enemy {
  constructor(enemyLevel) {
    this.level = enemyLevel;
    this.turn = 0;
    this.buff = '';
    this.buffCountdown = 0;
    this.status = '';
    this.statusCountdown = 0;
  }
}

class Skeleton extends Enemy {
  constructor(enemyLevel) {
    super(enemyLevel);
    this.type = 'Skeleton';
    this.attack = 'Death Swipe';
    this.attackAmount = 10 + (5 * this.level);
    this.special = 'Screaming Terror';
    this.specialAmount = 2 + (2 * this.level);
    this.criticalHitChance = 10;
    this.criticalHitAmount = 2;
    this.strength = 5 + (1 * this.level);
    this.defense = 3 + (2 * this.level);
    this.hp = 30 + (5 * this.level);
    this.hpMax = 30 + (5 * this.level);
    // if hero defeats enemy, add hero.exp and enemy.exp
    this.exp = 2 + (2 * this.level);
  }
}

class Zombie extends Enemy {
  constructor(enemyLevel) {
    super(enemyLevel);
    this.type = 'Zombie';
    this.attack = 'Rotting Grasp';
    this.attackAmount = 15 + (5 * this.level);
    this.special = 'Infectious Bite';
    this.specialAmount = 4 + (2 * this.level);
    this.criticalHitChance = 12;
    this.criticalHitAmount = 2;
    this.strength = 5 + (1 * this.level);
    this.defense = 4 + (4 * this.level);
    this.hp = 50 + (5 * this.level);
    this.hpMax = 50 + (5 * this.level);
    // if hero defeats enemy, add hero.exp and enemy.exp
    this.exp = 4 + (4 * this.level);
  }
}

class DeathKnight extends Enemy {
  constructor(enemyLevel) {
    super(enemyLevel);
    this.type = 'Death Knight';
    this.attack = 'Hell Fire';
    this.attackAmount = 20 + (5 * this.level);
    this.special = 'Soul Rip';
    this.specialAmount = 6 + (2 * this.level);
    this.criticalHitChance = 16;
    this.criticalHitAmount = 2;
    this.strength = 8 + (1 * this.level);
    this.defense = 6 + (4 * this.level);
    this.hp = 80 + (5 * this.level);
    this.hpMax = 80 + (5 * this.level);
    // if hero defeats enemy, add hero.exp and enemy.exp
    this.exp = 10 + (4 * this.level);
  }
}

const warriorSelect = document.getElementById('warrior-select');
const wizardSelect = document.getElementById('wizard-select');
const rangerSelect = document.getElementById('ranger-select');
const submitHeroSelection = document.getElementById('submit-hero-selection');
const heroInfoWindow = document.getElementById('hero-intro-window');
const heroStartingStats = document.getElementById('hero-starting-stats');
const warriorStatsExample = new Warrior('warriorTest');
const wizardStatsExample = new Wizard('wizardTest');
const rangerStatsExample = new Ranger('rangerTest');

let userHero;
const heroSide = document.getElementById('hero-side');
const heroSelectorCard = document.getElementById('hero-selector');
const enemySide = document.getElementById('enemy-side');
const openWorldDisplay = document.getElementById('game-map');

warriorSelect.addEventListener('click', warriorOn);
wizardSelect.addEventListener('click', wizardOn);
rangerSelect.addEventListener('click', rangerOn);
submitHeroSelection.addEventListener('click', heroSelectSubmit);

function warriorOn() {
  warriorSelect.value = 'on';
  warriorSelect.style.backgroundColor = '#333';
  heroInfoWindow.style.display = 'block';
  wizardSelect.value = 'off';
  wizardSelect.style.backgroundColor = '#4d4d4d';
  rangerSelect.value = 'off';
  rangerSelect.style.backgroundColor = '#4d4d4d';
  heroInfoWindow.innerHTML = 
    `<h2>Warrior Selected</h2><p>As the Warrior you will use brute strength to overpower any foe foolish enough to cross your path.</p>`;
    heroStartingStats.innerHTML = 
      `<h3>Stats:</h3><p>HP: ${warriorStatsExample.hp}</p><p>Stamina: ${warriorStatsExample.stamina}</p><p>Mana: ${warriorStatsExample.mana}</p>` + `<h3>Moves:</h3><p>Attack: ${warriorStatsExample.attack}</p><p>Defense: ${warriorStatsExample.defend}</p><p>Special: ${warriorStatsExample.special}</p>`;
}

function wizardOn() {
  warriorSelect.value = 'off';
  warriorSelect.style.backgroundColor = '#4d4d4d';
  wizardSelect.value = 'on';
  wizardSelect.style.backgroundColor = '#333';
  heroInfoWindow.style.display = 'block';
  rangerSelect.value = 'off';
  rangerSelect.style.backgroundColor = '#4d4d4d';
  heroInfoWindow.innerHTML = 
  `<h2>Wizard Selected</h2><p>As the Wizard you will use cunning intelligence to defeat any foe foolish enough to cross your path.</p>`;
  heroStartingStats.innerHTML = 
  `<h3>Stats:</h3><p>HP: ${wizardStatsExample.hp}</p><p>Stamina: ${wizardStatsExample.stamina}</p><p>Mana: ${wizardStatsExample.mana}</p>` + `<h3>Moves:</h3><p>Attack: ${wizardStatsExample.attack}</p><p>Defense: ${wizardStatsExample.defend}</p><p>Special: ${wizardStatsExample.special}</p>`;
}

function rangerOn() {
  warriorSelect.value = 'off';
  warriorSelect.style.backgroundColor = '#4d4d4d';
  wizardSelect.value = 'off';
  wizardSelect.style.backgroundColor = '#4d4d4d';
  rangerSelect.value = 'on';
  rangerSelect.style.backgroundColor = '#333';
  heroInfoWindow.style.display = 'block';
  heroInfoWindow.innerHTML = 
  `<h2>Ranger Selected</h2><p>As the Ranger you will use stealthy dexterity to defeat any foe foolish enough to cross your path.</p>`;
  heroStartingStats.innerHTML = 
  `<h3>Stats:</h3><p>HP: ${rangerStatsExample.hp}</p><p>Stamina: ${rangerStatsExample.stamina}</p><p>Mana: ${rangerStatsExample.mana}</p>` + `<h3>Moves:</h3><p>Attack: ${rangerStatsExample.attack}</p><p>Defense: ${rangerStatsExample.defend}</p><p>Special: ${rangerStatsExample.special}</p>`;
}

function heroSelectSubmit() {
  if(userHeroName.value == '') {
    heroInfoWindow.innerHTML = `<h2>Please Enter A Name</h2>`;
    heroStartingStats.innerHTML = ` `;
    setTimeout(function(){ heroInfoWindow.innerHTML = ` `;; }, 3000);
      } else if(warriorSelect.value == 'off' && wizardSelect.value == 'off' && rangerSelect.value == 'off') {
        heroInfoWindow.innerHTML = `<h2>Please Select A Hero</h2>`;
        heroStartingStats.innerHTML = ` `;
        setTimeout(function(){ heroInfoWindow.innerHTML = ` `;; }, 3000);
  } else  {
    if(warriorSelect.value == 'on') {
        userHero = new Warrior(userHeroName.value);
        
    } else if(wizardSelect.value == 'on') {
        userHero = new Wizard(userHeroName.value);
    } else if(rangerSelect.value == 'on') {
        userHero = new Ranger(userHeroName.value);
    }
    fightScreenDisplay();
    loadEnemy();
    loadHero();
    currentStats();
    setInterval(currentStats, 500);
    turns();
  }
}

function fightScreenDisplay() {
  heroSelectorCard.style.display = 'none';
  heroSide.style.display = 'block';
  specialMeterDisplay.display = 'block';
  enemySide.style.display = 'block';
  heroStatDisplay.style.display = 'block';
  narrationCard.style.display = 'block';
}

function displayBirdsEye() {
  openWorldDisplay.style.display = 'block';
  heroSelectorCard.style.display = 'none';
  heroSide.style.display = 'none';
  specialMeterDisplay.display = 'none';
  enemySide.style.display = 'none';
  heroStatDisplay.style.display = 'none';
  narrationCard.style.display = 'none';
}

// Hero DOM Vars
const heroCard = document.getElementById('hero-card');
const heroName = document.getElementById('hero-name');
const heroClass = document.getElementById('hero-class');
const heroLevel = document.getElementById('hero-level');
const heroEXP = document.getElementById('hero-exp');
// Hero Move Location
const heroAttack = document.getElementById('hero-attack');
const heroDefend = document.getElementById('hero-defense');
const heroSpecial = document.getElementById('hero-special');
// Hero Move Name Genzerators
const heroAttackName = document.getElementById('hero-attack-name');
const heroDefenseName = document.getElementById('hero-defense-name');
const heroSpecialName = document.getElementById('hero-special-name');
// Hero Move Selector
const heroMoveSelector = document.getElementById('move-group');
// Hero Stat Gens
const heroHP = document.getElementById('hero-hp');
const heroMana = document.getElementById('hero-mana');
const heroStamina = document.getElementById('hero-stamina');
const heroStrength = document.getElementById('hero-strength');
const heroIntelligence = document.getElementById('hero-intelligence');
const heroDexterity = document.getElementById('hero-dexterity');
const heroEvade = document.getElementById('hero-evade');

// Hero Vars
let baseHealth;
let baseStamina;
let baseMana;

// Special Meter
const specialMeterDisplay = document.getElementById('special-meter-display');
// Hero Stat Display
const heroStatDisplay = document.getElementById('hero-stat-display');
const moveStatDisplay = document.getElementById('stat-interface');
// Event Description
const narTitle = document.getElementById('event-title');
const describe = document.getElementById('event-description');
const narrationCard = document.getElementById('narration');

// Event Listeners for Hero Moves
// submit move for player turn
const submitMove = document.getElementById('submit-move');
let submitMoveOnOff = 'off';

heroAttack.addEventListener('click', attackOn);
heroDefend.addEventListener('click', defendOn);
heroSpecial.addEventListener('click', specialOn);
submitMove.addEventListener('click', heroTypeMoveSelector);

function attackOn() {
  describe.innerHTML = ' ';
  heroAttack.value = 'on';
  heroAttack.style.backgroundColor = '#333';
  heroDefend.value = 'off';
  heroDefend.style.backgroundColor = '#4d4d4d';
  heroSpecial.value = 'off';
  heroSpecial.style.backgroundColor = '#4d4d4d';
  moveStatDisplay.innerHTML = `<h3 class="damageText">${userHero.attack}</h3><p>${userHero.attackAmount} Damage</p><p>-${userHero.attackCost} ${userHero.primaryResource}</p>`;
}

function defendOn() {
  describe.innerHTML = ' ';
  heroAttack.value = 'off';
  heroAttack.style.backgroundColor = '#4d4d4d';
  heroDefend.value = 'on';
  heroDefend.style.backgroundColor = '#333';
  heroSpecial.value = 'off';
  heroSpecial.style.backgroundColor = '#4d4d4d';
  moveStatDisplay.innerHTML = `<h3 class="defenseText">${userHero.defend}</h3><p>+${userHero.defendAmount} ${userHero.defendType}</p><p>-${userHero.defendCost} ${userHero.secondaryResource}</p>`;
}

function specialOn() {
  describe.innerHTML = ' ';
  heroAttack.value = 'off';
  heroAttack.style.backgroundColor = '#4d4d4d';
  heroDefend.value = 'off';
  heroDefend.style.backgroundColor = '#4d4d4d';
  heroSpecial.value = 'on';
  heroSpecial.style.backgroundColor = '#333';
  moveStatDisplay.innerHTML = `<h3 class="specialText">${userHero.special}</h3><p>${userHero.specialAmount} Damage</p><p>-${userHero.specialCost} Resource</p>`;
}

function heroTypeMoveSelector() {
  submitMove.style.display = 'none';
  if(userHero.type !== 'Warrior' && userHero.type !== 'Wizard' && userHero.type !== 'Ranger') {
    alert('There was an errror with your character type.');
  } else if(heroAttack.value == 'off' && heroDefend.value == 'off' && heroSpecial.value == 'off') {
    narTitle.innerHTML = `<h2>Select A Move</h2>`;
  } else {
    if(userHero.type == 'Warrior') {
      warMoves();
    } else if(userHero.type == 'Wizard') {
      wizMoves();
    } else {
      rangMoves();
      
    }
  }
}

function warMoves() {
  if(heroAttack.value == 'on') {
    function slash() {
      // attack makes sure there is enough pp to execute
      if(userHero.stamina < userHero.attackCost) {
        describe.innerHTML = '<p>Not Enough Stamina</p>';
        submitMove.style.display = 'block';
        return;
      } else {
        describe.innerHTML = '<p>Hero Attacks</p>';
      // attack takes away hero pp
        userHero.stamina = userHero.stamina - userHero.attackCost;
      // attack takes away Enemy Damage
        basicEnemy.hp = basicEnemy.hp - Math.floor(userHero.attackAmount - (basicEnemy.defense * .33));
        endTurn();
        }
      }
    slash();
    
  } else if(heroDefend.value == 'on') {
    function secondWind() {
      userHero.defendType = 'Health';
      if(userHero.stamina >= baseStamina) {
        describe.innerHTML = '<p>Hero is at Full Stamina</p>';
        submitMove.style.display = 'block';
        return;
      } else if(userHero.mana < userHero.defendCost) {
        describe.innerHTML = '<p>Not Enough Mana</p>';
        submitMove.style.display = 'block';
        return;
      } else if(userHero.stamina <= baseStamina - userHero.defendAmount){
    // Heals Missing Stamina
        describe.innerHTML = '<p>Hero Regains Composure</p>';
        userHero.mana = userHero.mana - userHero.defendCost;
        userHero.stamina = userHero.stamina + userHero.defendAmount;
        endTurn();
      } else {
    // Regains Full Amount
        describe.innerHTML = '<p>Hero Regains Composure</p>';
        userHero.mana = userHero.mana - userHero.defendCost;
        userHero.stamina = userHero.staminaMax;
        endTurn();
      }
    }
    secondWind();
  } else if(heroSpecial.value == 'on') {
    function rage() {
      // attack makes sure there is enough pp to execute
      if(userHero.stamina < userHero.specialCost) {
        describe.innerHTML = '<p>Not Enough Stamina</p>';
        submitMove.style.display = 'block';
        return;
      } else {
        describe.innerHTML = '<p>Hero Rages</p>';
      // attack takes away hero pp
        userHero.stamina = userHero.stamina - userHero.specialCost;
        function raging() {
          // attack takes away Enemy Damage
          basicEnemy.hp = basicEnemy.hp - Math.floor(userHero.attackAmount - (basicEnemy.defense * .33));
          enemyDeath();
        }
        setTimeout(raging, 0);
        setTimeout(raging, 1000);
        setTimeout(raging, 2000);
        setTimeout(endTurn, 6000);
        }
      }
    rage();
  } else {
    alert('There was an error with your move');
  }
}

function wizMoves() {
  if(heroAttack.value == 'on') {
    function fireball() {
      // attack makes sure there is enough pp to execute
      if(userHero.mana < userHero.attackCost) {
        describe.innerHTML = '<p>Not Enough Mana</p>';
        submitMove.style.display = 'block'
        return;
      } else {
        describe.innerHTML = '<p>Hero Attacks</p>';
      // attack takes away hero pp
        userHero.mana = userHero.mana - userHero.attackCost;
      // attack takes away Enemy Damage
        basicEnemy.hp = basicEnemy.hp - Math.floor(userHero.attackAmount - (basicEnemy.defense * .33));
        endTurn;
        }
      }
      fireball();
  } else if(heroDefend.value == 'on') {
    function shield() {
      userHero.defendType = 'Defense';
      if(userHero.stamina < userHero.defendCost) {
        describe.innerHTML = '<p>Not Enough Stamina</p>';
        submitMove.style.display = 'block'
        return;
      } else {
        describe.innerHTML = '<p>Hero Defends</p>';
        userHero.stamina = userHero.stamina - userHero.defendCost;
        userHero.defense = userHero.defense + userHero.defendAmount;
        endTurn();
      }
    }
    shield();
  } else if(heroSpecial.value == 'on') {
    function minorHeal() {
      if(userHero.hp >= baseHealth) {
        describe.innerHTML = '<p>Hero is at Full Health</p>';
        submitMove.style.display = 'block'
        return;
      } else if(userHero.mana < userHero.specialCost) {
        describe.innerHTML = '<p>Not Enough Mana</p>';
        submitMove.style.display = 'block'
        return;
      } else if(userHero.hp <= baseHealth - userHero.specialAmount){
    // Heals missing health
        describe.innerHTML = '<p>Hero Heals</p>';
        userHero.mana = userHero.mana - userHero.specialCost;
        userHero.hp = userHero.hp + userHero.specialAmount;
        endTurn();
      } else {
    // Heals full amount
        describe.innerHTML = '<p>Hero Heals</p>';
        userHero.mana = userHero.mana - userHero.specialCost;
        userHero.hp = userHero.hpMax;
        endTurn();
      }
    }
    minorHeal();
  } else {
    alert('There was an error with your move');
  }
}

function rangMoves() {
  if(heroAttack.value == 'on') {
    function quickShot() {
      // attack makes sure there is enough pp to execute
      if(userHero.stamina < userHero.attackCost) {
        describe.innerHTML = '<p>Not Enough Stamina</p>';
        submitMove.style.display = 'block'
      } else {
        describe.innerHTML = '<p>Hero Attacks<p>';
      // attack takes away hero pp
        userHero.stamina = userHero.stamina - userHero.attackCost;
      // attack takes away Enemy Damage
        basicEnemy.hp = basicEnemy.hp - Math.floor(userHero.attackAmount - (basicEnemy.defense * .33));
        endTurn();
        }
      }
    quickShot();
  } else if(heroDefend.value == 'on') {
    function stealthEvade() {
      userHero.defendType = 'Evade';
      if(userHero.mana < userHero.defendCost) {
        describe.innerHTML = '<p>Not Enough Mana</p>';
        submitMove.style.display = 'block'
      } else if(userHero.buff !== '') {
        describe.innerHTML = `<p>Player has ${userHero.buff} applied for ${userHero.buffCountdown} more turns. Please select a different move</p>`;
        submitMove.style.display = 'block';
      } else {
        describe.innerHTML = '<p>Hero Increased Evade Chance!</p>';
        userHero.mana = userHero.mana - userHero.defendCost;
        userHero.evade = userHero.evade + userHero.defendAmount;
        userHero.buff = 'evade';
        userHero.buffCountdown = 3;
        console.log(userHero.evade);
        endTurn();
        }
    }
    stealthEvade();
  } else if(heroSpecial.value == 'on') {
    function poisonArrow() {
      if(userHero.mana < userHero.specialCost) {
        describe.innerHTML = '<p>Not Enough Mana</p>';
        submitMove.style.display = 'block';
      } else {
        describe.innerHTML = 'Hero Poisons Enemy';
      // attack takes away hero mana
        userHero.mana = userHero.mana - userHero.specialCost;
      // attack takes away Enemy Damage
        basicEnemy.hp = basicEnemy.hp - Math.floor(userHero.specialAmount - (basicEnemy.defense * .33));
        basicEnemy.status = 'poison';
        basicEnemy.statusCountdown = 4;
        endTurn();
        }
    }
    poisonArrow();
  } else {
    alert('There was an error with your move');
  }
}

function heroPoisonEffect() {
  describe.innerHTML = '<p>The Enemy takes damage from the poison!</p>';
  setTimeout(function(){ basicEnemy.hp = basicEnemy.hp - 10; }, 2000);
}

function heroDeath() {
  if(userHero.hp <= 0){
    alert('You Are Dead');
    userHero.hp = userHero.hp + (10 * userHero.level);
    loadHero();
  }
}

function levelUp() { 
  if(userHero.exp >= userHero.neededEXP) {
    describe.innerHTML = '<h3>Hero Leveled Up!</h3>';
    userHero.level++;
    userHero.exp = userHero.exp - userHero.neededEXP;
    userHero.neededEXP = userHero.neededEXP = 5 + (10 * userHero.level);
    if(userHero.type == 'Warrior') {
      userHero.attackAmount += 5 * userHero.level;
      userHero.criticalHitChance += 1 * userHero.level;
      userHero.criticalHitAmount += .05 * userHero.level;
      userHero.strength += 3 * userHero.level;
      userHero.intelligence += 1 * userHero.level;
      userHero.dexterity += 1 * userHero.level;
      userHero.defense += 4 * userHero.level;
      userHero.evade += 1.5 * userHero.level;
      userHero.hp += 15 * userHero.level;
      userHero.stamina += 10 * userHero.level;
      userHero.mana += 5 * userHero.level;
      userHero.hpMax += 15 * userHero.level;
      userHero.staminaMax += 10 * userHero.level;
      userHero.manaMax += 5 * userHero.level;
    }
    if(userHero.type == 'Wizard') {
      userHero.attackAmount += 5 * userHero.level;
      userHero.criticalHitChance += 1 * userHero.level;
      userHero.criticalHitAmount += .05 * userHero.level;
      userHero.strength += 1 * userHero.level;
      userHero.intelligence += 3 * userHero.level;
      userHero.dexterity += 1 * userHero.level;
      userHero.defense += 2 * userHero.level;
      userHero.evade += 1.5 * userHero.level;
      userHero.hp += 10 * userHero.level;
      userHero.stamina += 5 * userHero.level;
      userHero.mana += 15 * userHero.level;
      userHero.hpMax += 10 * userHero.level;
      userHero.staminaMax += 5 * userHero.level;
      userHero.manaMax += 15 * userHero.level;
    }
    if(userHero.type == 'Ranger') {
      userHero.attackAmount += 5 * userHero.level;
      userHero.criticalHitChance += 1 * userHero.level;
      userHero.criticalHitAmount += .05 * userHero.level;
      userHero.strength += 1 * userHero.level;
      userHero.intelligence += 1 * userHero.level;
      userHero.dexterity += 3 * userHero.level;
      userHero.defense += 3 * userHero.level;
      userHero.evade += 1.5 * userHero.level;
      userHero.hp += 10 * userHero.level;
      userHero.stamina += 10 * userHero.level;
      userHero.mana += 10 * userHero.level;
      userHero.hpMax += 10 * userHero.level;
      userHero.staminaMax += 10 * userHero.level;
      userHero.manaMax += 10 * userHero.level;
      }
    loadHero();
  } else return;
}

function currentStats() {
  let hpStatDisplay = userHero.hp + '/' + userHero.hpMax;
  let staminaStatDisplay = userHero.stamina + '/' + userHero.staminaMax;
  let manaStatDisplay = userHero.mana + '/' + userHero.manaMax;
  let enemyHPStatDisplay = basicEnemy.hp + '/' + basicEnemy.hpMax;
  heroEXP.innerHTML = userHero.exp + '/' + userHero.neededEXP;
  heroStrength.innerHTML = userHero.strength;
  heroIntelligence.innerHTML = userHero.intelligence;
  heroDexterity.innerHTML = userHero.dexterity;
  heroEvade.innerHTML = userHero.evade;

  enemyHP.innerHTML = enemyHPStatDisplay;
  heroHP.innerHTML = hpStatDisplay;
  heroStamina.innerHTML = staminaStatDisplay;
  heroMana.innerHTML = manaStatDisplay;
function heroStatProgBars() {
  function healthBar() {
    let healthProgBar = document.getElementById('health-prog');
    let heroHPLvl = ((userHero.hp / userHero.hpMax) * 101);
    
    if(userHero.hp >= userHero.hpMax) {
      healthProgBar.style.backgroundColor = 'rgba(166, 16, 30, 1)';
      healthProgBar.style.width = '100%';
      } else {
        // adding back opacity to work around prog bar auto showing before exp
        healthProgBar.style.backgroundColor = 'rgba(166, 16, 30, 1)';
        // expProgBar.style.backgroundColor = '#ff8c00';
        healthProgBar.style.width = heroHPLvl + '%';
        }
  }
  healthBar();
  
  function staminaBar() {
    let staminaProgBar = document.getElementById('stamina-prog');
    let heroStaminaLvl = ((userHero.stamina / userHero.staminaMax) * 101);
    
    if(userHero.stamina >= userHero.staminaMax) {
      staminaProgBar.style.backgroundColor = 'rgba(0, 100, 0, 1)';
      staminaProgBar.style.width = '100%';
      } else {
        // adding back opacity to work around prog bar auto showing before exp
        staminaProgBar.style.backgroundColor = 'rgba(0, 100, 0, 1)';
        // expProgBar.style.backgroundColor = '#ff8c00';
        staminaProgBar.style.width = heroStaminaLvl + '%';
        }
  }
  staminaBar();

  function manaBar() {
    let manaProgBar = document.getElementById('mana-prog');
    let heroManaLvl = ((userHero.mana / userHero.manaMax) * 101);
    
    if(userHero.mana >= userHero.manaMax) {
      manaProgBar.style.backgroundColor = 'rgba(0, 0, 139, 1)';
      manaProgBar.style.width = '100%';
      } else {
        // adding back opacity to work around prog bar auto showing before exp
        manaProgBar.style.backgroundColor = 'rgba(0, 0, 139, 1)';
        // expProgBar.style.backgroundColor = '#ff8c00';
        manaProgBar.style.width = heroManaLvl + '%';
        }
  }
  manaBar();

  function expBar() {
    let expProgBar = document.getElementById('exp-prog');
    let heroExpLvl = ((userHero.exp / userHero.neededEXP) * 100);
    
    if(userHero.exp >= userHero.neededEXP) {
      expProgBar.style.backgroundColor = '#f0f0f0';
      expProgBar.style.width = '100%';
      }

      expProgBar.style.backgroundColor = '#f0f0f0';
      expProgBar.style.width = heroExpLvl + '%';
  }
  expBar();
}

  levelUp();
  heroStatProgBars();
  enemyHealthBar();
}

function loadHero() {
  heroName.innerHTML = userHero.name;
  heroClass.innerHTML = userHero.type;
  heroAttack.innerHTML = userHero.attack;
  heroDefend.innerHTML = userHero.defend;
  heroSpecial.innerHTML = userHero.special;
  heroLevel.innerHTML = userHero.level;
  heroStrength.innerHTML = userHero.strength;
  heroIntelligence.innerHTML = userHero.intelligence;
  heroDexterity.innerHTML = userHero.dexterity;
  heroEvade.innerHTML = userHero.evade;
  // Hero Vars
  baseHealth = userHero.hpMax;
  baseStamina = userHero.staminaMax;
  baseMana = userHero.manaMax;

  // Regen Functions
  function healthRegen() {
    if(userHero.hp < baseHealth) {
      userHero.hp = userHero.hp + (1 * userHero.level);
      // heroHP.innerHTML = userHero.hp;
    } 
  }

  setInterval(healthRegen, 3000);

  function staminaRegen() {
    if(userHero.stamina < baseStamina) {
      userHero.stamina = userHero.stamina + (1 * userHero.level);
      // heroStamina.innerHTML = userHero.stamina;
    }
  }

  setInterval(staminaRegen, 2000);

  function manaRegen() {
      if(userHero.mana < baseMana) {
        userHero.mana = userHero.mana + (1 * userHero.level);
        // heroMana.innerHTML = userHero.mana;
      }
  }
     
  setInterval(manaRegen, 1000);
}

// Load Enemy
let basicEnemy;
// let basicEnemy = new Skeleton(2);
// Enemy DOM Vars
const enemyCard = document.getElementById('first-enemy');
const enemyType = document.getElementById('load-enemy-type');
const enemyLevel = document.getElementById('enemy-level');
const enemyHP = document.getElementById('enemy-hp');
const enemyAttack = document.getElementById('enemy-attack');
const enemySpecial = document.getElementById('enemy-special');
const firstEnemy = document.getElementById('first-enemy');
const enemyHealthProgBar = document.getElementById('enemy-health-prog');

// Enemy Attack
function enemyMoves() {
  // Check Evade before Attack
  let evadeChance = Math.floor(Math.random() * 100);
  let moveChance = Math.floor(Math.random() * 100);
  let enemyCritChance = Math.floor(Math.random() * 100);
  const basicEnemyAttack = basicEnemy.attackAmount;
  const critEnemyAttack = basicEnemy.criticalHitAmount * basicEnemyAttack;

  if(userHero.evade >= evadeChance) {
    describe.innerHTML = '<p>Enemy Missed!</p>';
  } else {
    if(moveChance <= 50){
      if(enemyCritChance <= basicEnemy.criticalHitChance) {
        describe.innerHTML = '<p>Enemy Attacks Hero With A Critical Hit!!</p>';
        userHero.hp = userHero.hp - Math.floor(critEnemyAttack - (userHero.defense * .33));
      } else {;
         // attack takes away Enemy Damage
        describe.innerHTML = '<p>Enemy Attacks Hero</p>';
        userHero.hp = userHero.hp - Math.floor(basicEnemyAttack - (userHero.defense * .33));
      }
    } else {
      if(enemyCritChance <= basicEnemy.criticalHitChance) {
        describe.innerHTML = '<p>Enemy Attacks Hero With A Critical Hit Using The Second Move!!</p>';
        userHero.hp = userHero.hp - Math.floor(critEnemyAttack - (userHero.defense * .33));
      } else {
         // attack takes away Enemy Damage
        describe.innerHTML = '<p>Enemy Attacks Hero With The Second Move</p>';
        userHero.hp = userHero.hp - Math.floor(basicEnemyAttack - (userHero.defense * .33));
      }
    }
    heroDeath();
  }
  endEnemyTurn();
}

function enemyHealthBar() {
  let enemyHPLvl = ((basicEnemy.hp / basicEnemy.hpMax) * 100) + 1;
  
  if(basicEnemy.hp == basicEnemy.hpMax) {
    enemyHealthProgBar.style.backgroundColor = 'rgba(166, 16, 30, 1)';
    enemyHealthProgBar.style.width = '100%';
    } else {
      // adding back opacity to work around prog bar auto showing before exp
      enemyHealthProgBar.style.backgroundColor = 'rgba(166, 16, 30, 1)';
      // expProgBar.style.backgroundColor = '#ff8c00';
      enemyHealthProgBar.style.width = enemyHPLvl + '%';
      }
}

function enemyPoisonEffect() {
  console.log('Enemy Poison Effect Works');
  describe.innerHTML = '<p>The Hero takes damage from the poison!</p>';
  setTimeout(function(){ userHero.hp = userHero.hp - 10; }, 2000);
}

function enemyDeath() {
  if(basicEnemy.hp <= 0){
    narTitle.innerHTML = '<h2>Enemy Died</h2>';
    userHero.exp = userHero.exp + basicEnemy.exp;
    basicEnemy.hp = 0;
    basicEnemy = '';
    submitMove.style.display = 'block';
    enemySide.style.display = 'none';
    setTimeout(function() { enemySide.style.display = 'block'; }, 2000);
    randomEnemy();
  }
}

function randomEnemy() {
  let i = userHero.level + Math.floor(Math.random() * 4);
  let enemyChance = Math.floor(Math.random() * 101);
  let zombieChance = 0;
  let deathKnightChance = 0;
  console.log(i);

  if(userHero.level >= 5) {
    zombieChance = 40;
  }
  if(userHero.level >=8) {
    deathKnightChance = 20;
  }
  if(enemyChance <= deathKnightChance) {
    basicEnemy = new DeathKnight(i);
  } else if(enemyChance <= zombieChance && enemyChance > deathKnightChance) {
    basicEnemy = new Zombie(i);
  } else {
    basicEnemy = new Skeleton(i);
  }   
}

function loadEnemy() {
  randomEnemy();
  narTitle.innerHTML = `<h3>A New ${basicEnemy.type} Wants To Fight</h3>`;
  enemyType.innerHTML = basicEnemy.type;
  enemyLevel.innerHTML = basicEnemy.level;
  enemyAttack.innerHTML = basicEnemy.attack;
  enemySpecial.innerHTML = basicEnemy.special;

  enemyHealthBar();
  setInterval(enemyHealthBar, 500);
  setInterval(enemyDeath, 500);
}

function turns() {
  // Check for Enemy Turn
  if(basicEnemy.turn == 1 && userHero.turn == 0) {
    if(userHero.statusCountdown !== 0 && userHero.status !== '') {
      if(userHero.status == 'poison') {
        enemyPoisonEffect();
      }
      userHero.statusCountdown--;
    }
    submitMoveOnOff = 'off';
    narTitle.innerHTML = '<h3>Enemy\'s move</h3>';
    describe.innerHTML = '<p>Enemy is thinking...</p>';
    setTimeout(enemyMoves, 2000);
    //Check for Hero Turn
  } else {
    if(basicEnemy.statusCountdown !== 0 && basicEnemy.status !== '') {
      heroPoisonEffect();
      basicEnemy.statusCountdown--;
    }
    if(userHero.buffCountdown !== 0) {
      userHero.statusCountdown--;
    }
    if(userHero.buffCountdown == 0){
      userHero.buff = '';
    }
    submitMove.style.display = 'block';
    narTitle.innerHTML = '<h3>Your Turn</h3>';
    describe.innerHTML = '<p>Please select a move and hit choose to end your turn. Choose your move wisely and see if you can defeat your enemy!</p>';
  }
}

function endTurn() {
  submitMoveOnOff = 'on';
  userHero.turn = 0;
  basicEnemy.turn = 1;
  setTimeout(turns, 3000);
}

function endEnemyTurn() {
  userHero.turn = 1;
  basicEnemy.turn = 0;
  setTimeout(turns, 3000);
}

