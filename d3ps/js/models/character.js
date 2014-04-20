(function (Calc) {
  //
  // Helpers
  function prop(callback) {
    var dependencies = Array.prototype.slice.call(arguments, 1),
        wrapper = function () {
          var strValues = dependencies.map(this.get.bind(this)),
              numValues = strValues.map(function (e) { return (+e); });
          return callback.apply(this, numValues);
        };
    return Function.prototype.property.apply(wrapper, dependencies);
  }

  function sum(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function percent(num) {
    return num * 0.01;
  }

  function plusOne(a) {
    return a + 1;
  }

  function plusOneHalf(a) {
    return a + 0.5;
  }

  function trunc(num, dec) {
    return Math.floor(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }

  //
  // Calculations
  function weaponDamagePerSecond(min, max, aps) {
    return +(aps * (min + max) / 2).toFixed(1);
  }

  function primaryAttributeDamageModifier() {
    var total = Array.prototype.reduce.call(arguments, sum);
    return 1 + percent(total);
  }

  function criticalChance() {
    return Array.prototype.reduce.call(arguments, sum);
  }

  function criticalDamage() {
    return Array.prototype.reduce.call(arguments, sum);
  }

  function criticalDamageModifier(chance, damage) {
    return 1 + (percent(chance) * percent(damage));
  }

  function attackSpeed() {
    return Array.prototype.reduce.call(arguments, sum);
  }

  function attackSpeedDamageModifier(attackSpeed, aps1, aps2) {
    var apsIncrease = 1 + percent(attackSpeed),
        dualAps = (2 * aps1 * aps2) / (aps1 + aps2);
    return apsIncrease * (aps2 ? dualAps : aps1);
  }

  function averageDamageModifier(min1, max1, min2, max2, aps1, aps2) {
    return (min1 + max1 + min2 + max2) / (aps2 ? 4 : 2);
  }

  function passiveDamageModifier() {
    var total = Array.prototype.reduce.call(arguments, sum);
    return 1 + percent(total);
  }

  function elementalDamageModifier() {
    var total = Array.prototype.reduce.call(arguments, sum);
    return 1 + percent(total);
  }

  function eliteDamageModifier() {
    var total = Array.prototype.reduce.call(arguments, sum);
    return 1 + percent(total);
  }

  function totalDamage(s, c, r, a, m) {
    return Math.round(s * c * r * a * m);
  }

  function totalElementalDamage(s, c, r, a, m, e) {
    return Math.round(s * c * r * a * m * e);
  }

  function totalEliteDamage(s, c, r, a, m, e, l) {
    return Math.round(s * c * r * a * m * e * l);
  }


  Calc.Character = DS.Model.extend({
    name: DS.attr('string'),

    weaponMinDamage1: DS.attr('number'),
    weaponMaxDamage1: DS.attr('number'),
    weaponAttacksPerSecond1: DS.attr('number'),
    weaponDamagePerSecond1: prop(weaponDamagePerSecond, 'weaponMinDamage1', 'weaponMaxDamage1', 'weaponAttacksPerSecond1'),

    weaponMinDamage2: DS.attr('number'),
    weaponMaxDamage2: DS.attr('number'),
    weaponAttacksPerSecond2: DS.attr('number'),
    weaponDamagePerSecond2: prop(weaponDamagePerSecond, 'weaponMinDamage2', 'weaponMaxDamage2', 'weaponAttacksPerSecond2'),

    weaponMinDamagePlusOne: prop(plusOne, 'weaponMinDamage1'),
    averageDamageMultiplier: prop(averageDamageModifier, 'weaponMinDamage1', 'weaponMaxDamage1', 'weaponMinDamage2', 'weaponMaxDamage2', 'weaponAttacksPerSecond1', 'weaponAttacksPerSecond2'),
    averageDamagePlusOneMultiplier: prop(averageDamageModifier, 'weaponMinDamagePlusOne', 'weaponMaxDamage1', 'weaponMinDamage2', 'weaponMaxDamage2', 'weaponAttacksPerSecond1', 'weaponAttacksPerSecond2'),

    primaryAttribute: DS.attr('number'),
    primaryAttributePlusOne: prop(plusOne, 'primaryAttribute'),
    primaryAttributeMultiplier: prop(primaryAttributeDamageModifier, 'primaryAttribute'),
    primaryAttributePlusOneMultiplier: prop(primaryAttributeDamageModifier, 'primaryAttributePlusOne'),

    criticalHitChance: DS.attr('number'),
    criticalHitChancePlusOne: prop(plusOneHalf, 'criticalHitChance'),
    criticalHitDamage: DS.attr('number'),
    criticalHitDamagePlusOne: prop(plusOne, 'criticalHitDamage'),
    criticalDamageMultiplier: prop(criticalDamageModifier, 'criticalHitChance', 'criticalHitDamage'),
    criticalDamagePlusOneChanceMultiplier: prop(criticalDamageModifier, 'criticalHitChancePlusOne', 'criticalHitDamage'),
    criticalDamagePlusOneDamageMultiplier: prop(criticalDamageModifier, 'criticalHitChance', 'criticalHitDamagePlusOne'),

    attackSpeed: DS.attr('number'),
    attackSpeedPlusOne: prop(plusOne, 'attackSpeed'),
    attackSpeedMultiplier: prop(attackSpeedDamageModifier, 'attackSpeed', 'weaponAttacksPerSecond1', 'weaponAttacksPerSecond2'),
    attackSpeedPlusOneMultiplier: prop(attackSpeedDamageModifier, 'attackSpeedPlusOne', 'weaponAttacksPerSecond1', 'weaponAttacksPerSecond2'),

    passiveDamage: DS.attr('number'),
    passiveDamagePlusOne: prop(plusOne, 'passiveDamage'),
    passiveDamageMultiplier: prop(passiveDamageModifier, 'passiveDamage'),
    passiveDamagePlusOneMultiplier: prop(passiveDamageModifier, 'passiveDamagePlusOne'),

    elementalDamage: DS.attr('number'),
    elementalDamagePlusOne: prop(plusOne, 'elementalDamage'),
    elementalDamageMultiplier: prop(elementalDamageModifier, 'elementalDamage'),
    elementalDamagePlusOneMultiplier: prop(elementalDamageModifier, 'elementalDamagePlusOne'),

    eliteDamage: DS.attr('number'),
    eliteDamagePlusOne: prop(plusOne, 'eliteDamage'),
    eliteDamageMultiplier: prop(eliteDamageModifier, 'eliteDamage'),
    eliteDamagePlusOneMultiplier: prop(eliteDamageModifier, 'eliteDamagePlusOne'),

    totalDamage: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOneWeaponDamage: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamagePlusOneMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOnePrimaryAttribute: prop(totalDamage, 'primaryAttributePlusOneMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOneCriticalHitChance: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamagePlusOneChanceMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOneCriticalHitDamage: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamagePlusOneDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOneAttackSpeed: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedPlusOneMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier'),
    totalDamagePlusOnePassiveDamage: prop(totalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamagePlusOneMultiplier'),

    totalElementalDamage: prop(totalElementalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier', 'elementalDamageMultiplier'),
    totalElementalDamagePlusOne: prop(totalElementalDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier', 'elementalDamagePlusOneMultiplier'),

    totalEliteDamage: prop(totalEliteDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier', 'elementalDamageMultiplier', 'eliteDamageMultiplier'),
    totalEliteDamagePlusOne: prop(totalEliteDamage, 'primaryAttributeMultiplier', 'criticalDamageMultiplier', 'attackSpeedMultiplier', 'averageDamageMultiplier', 'passiveDamageMultiplier', 'elementalDamageMultiplier', 'eliteDamagePlusOneMultiplier'),
    
    diffPlusOneWeaponDamage: prop(sub, 'totalDamagePlusOneWeaponDamage', 'totalDamage'),
    diffPlusOnePrimaryAttribute: prop(sub, 'totalDamagePlusOnePrimaryAttribute', 'totalDamage'),
    diffPlusOneCriticalHitChance: prop(sub, 'totalDamagePlusOneCriticalHitChance', 'totalDamage'),
    diffPlusOneCriticalHitDamage: prop(sub, 'totalDamagePlusOneCriticalHitDamage', 'totalDamage'),
    diffPlusOneAttackSpeed: prop(sub, 'totalDamagePlusOneAttackSpeed', 'totalDamage'),
    diffPlusOnePassiveDamage: prop(sub, 'totalDamagePlusOnePassiveDamage', 'totalDamage'),

    diffPlusOneElementalDamage: prop(sub, 'totalElementalDamagePlusOne', 'totalElementalDamage'),
    diffPlusOneEliteDamage: prop(sub, 'totalEliteDamagePlusOne', 'totalEliteDamage')
  });

  Calc.Character.FIXTURES = [{
    id: 1,
    name: 'Maurduron', // (739094)

    weaponMinDamage1: 1343,
    weaponMaxDamage1: 1841,
    weaponAttacksPerSecond1: 1.47,

    weaponMinDamage2: 1287,
    weaponMaxDamage2: 1763,
    weaponAttacksPerSecond2: 1.4,

    primaryAttribute: 7490,

    criticalHitChance: 41.5,
    criticalHitDamage: 423,

    attackSpeed: 46.4,

    passiveDamage: 8,

    elementalDamage: 54,

    eliteDamage: 0
  }];
})(window.Calc);
