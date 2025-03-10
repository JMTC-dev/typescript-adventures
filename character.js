// Basic character stats with explicit types
var characterName = "Jack";
var level = 1;
var health = 100;
var mana = 75;
var strength = 5;
var intelligence = 7;
var isHero = true;
var characterClass = "Rogue";
var abilities = ["Poison", "Backstab", "Steal"];
// An array of strings for inventory
var inventory = ["Dagger", "Health Potion", "Omen's Ring"];
// Add new item to inventory
inventory.push("Legend's Sting");
// We can also let TypeScript infer the type
var experiencePoints = 0; // TypeScript knows this is a number
// Display character information
var displayCharacterSheet = function () {
    console.log("\n");
    console.log("Character: ".concat(characterName, " the ").concat(characterClass));
    console.log("Level ".concat(level, " | Health: ").concat(health, " | Mana: ").concat(mana));
    console.log("Hero Status: ".concat(isHero ? "Legendary Hero" : "Ordinary Adventurer"));
    console.log("Inventory: ".concat(inventory.join(", ")));
    console.log("XP: ".concat(experiencePoints));
    console.log("Abilities: ".concat(abilities.join(", ")));
};
// Learn Ability
var learnAbility = function (ability) {
    abilities.push(ability);
};
// Simulate gaining experience and leveling up
var gainExperience = function (xp) {
    experiencePoints += xp;
    console.log("Gained ".concat(xp, " XP! Total XP: ").concat(experiencePoints, "/100"));
    if (experiencePoints >= 100) {
        levelUp();
    }
};
var levelUp = function () {
    level += 1;
    health += 20;
    strength += 3;
    intelligence += 5;
    mana += 10;
    console.log("\n \u2B50 LEVEL UP! \u2B50");
    console.log("".concat(characterName, " is now level ").concat(level, "!"));
    console.log("Health increased to ".concat(health));
    console.log("Mana increase to ".concat(mana));
};
// Simulate some adventure actions
displayCharacterSheet();
console.log("\n--- ADVENTURE LOG ---");
console.log("Encountered a goblin!");
gainExperience(50);
console.log("Found a hidden treasure!");
gainExperience(30);
console.log("Defeated a wolf!");
gainExperience(40);
learnAbility("Shadow Walk");
displayCharacterSheet();
// Try adding a non-string to invetory - this would cause a compile error
// inventory.push(42); // Uncomment to see error
