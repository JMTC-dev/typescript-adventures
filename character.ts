// Basic character stats with explicit types
let characterName: string = "Jack";
let level: number = 1;
let health: number = 100;
let mana: number = 75;
let strength: number = 5;
let intelligence: number = 7;
let isHero: boolean = true;
let characterClass: string = "Rogue";
let abilities: string[] = ["Poison", "Backstab", "Steal"];

// An array of strings for inventory

let inventory: string[] = ["Dagger", "Health Potion", "Omen's Ring"];

// Add new item to inventory
inventory.push("Legend's Sting");

// We can also let TypeScript infer the type
let experiencePoints = 0; // TypeScript knows this is a number

// Display character information
const displayCharacterSheet = () => {
  console.log("\n");
  console.log(`Character: ${characterName} the ${characterClass}`);
  console.log(`Level ${level} | Health: ${health} | Mana: ${mana}`);
  console.log(
    `Hero Status: ${isHero ? "Legendary Hero" : "Ordinary Adventurer"}`
  );
  console.log(`Inventory: ${inventory.join(", ")}`);
  console.log(`XP: ${experiencePoints}`);
  console.log(`Abilities: ${abilities.join(", ")}`);
};

// Learn Ability
const learnAbility = (ability: string) => {
  abilities.push(ability);
};

// Simulate gaining experience and leveling up

const gainExperience = (xp: number): void => {
  experiencePoints += xp;
  console.log(`Gained ${xp} XP! Total XP: ${experiencePoints}/100`);

  if (experiencePoints >= 100) {
    levelUp();
  }
};

const levelUp = (): void => {
  level += 1;
  health += 20;
  strength += 3;
  intelligence += 5;
  mana += 10;
  console.log(`\n ⭐ LEVEL UP! ⭐`);
  console.log(`${characterName} is now level ${level}!`);
  console.log(`Health increased to ${health}`);
  console.log(`Mana increase to ${mana}`);
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
