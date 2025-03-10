// Create a quest object
var dragonSlaying = {
    title: "Slay the Dragon of Mount Doom",
    description: "A fearsome dragon has been terrorizing nearby villages. Put an end to it!",
    difficulty: "Hard",
    reward: 1000,
    location: "Mount Doom",
    minLevel: 10,
    recommendedPartySize: 4,
    isAvailable: function (memberLevel) {
        return memberLevel >= dragonSlaying.minLevel;
    },
    complete: function (member) {
        console.log("".concat(member.name, " has completed the quest \"").concat(dragonSlaying.title, "\""));
        member.questsCompleted += 1;
        console.log("".concat(member.name, " earned ").concat(dragonSlaying.reward, " gold."));
    },
};
var cooksAssistant = {
    title: "Cook's Assistant",
    description: "A cook for the royal duke needs assistance to complete his cake.",
    difficulty: "Easy",
    reward: 500,
    location: "Eldoria",
    minLevel: 1,
    itemsRequired: ["Egg", "Bucket of Milk", "Pot of Flour"],
    isAvailable: function (memberLevel) {
        return memberLevel >= cooksAssistant.minLevel;
    },
    complete: function (member) {
        if (member.inventory.includes("Egg") &&
            member.inventory.includes("Bucket of Milk") &&
            member.inventory.includes("Pot of Flour")) {
            var memberInventory = member.inventory.filter(function (item) { var _a; return !((_a = cooksAssistant.itemsRequired) === null || _a === void 0 ? void 0 : _a.includes(item)); });
            member.inventory = memberInventory;
            console.log("".concat(member.name, " has completed the quest \"").concat(cooksAssistant.title, "\""));
            member.questsCompleted += 1;
            console.log("".concat(member.name, " earned ").concat(cooksAssistant.reward, " gold."));
        }
        else {
            console.log("You don't have all the required items to complete this quest!");
        }
    },
};
// Create specialized guild members
var thorgar = {
    name: "Thorgar Hammerfist",
    rank: "Elite",
    goldBalance: 100,
    level: 20,
    joined: new Date(2021, 3, 10),
    active: true,
    duespaid: true,
    specialSkills: ["Cleave", "Shield Wall", "Heroic Strike"],
    inventory: ["Thorgar's Trusty Two Hand Axe", "Leather Boots", "Nightshade"],
    questsCompleted: 42,
    // Warrior-specific properties
    weaponType: "Two-Handed Axe",
    armorClass: 18,
    battleCries: ["For the North!", "Taste my steel!", "Victory or death!"],
};
var elindra = {
    name: "Elinda Moonwhisper",
    rank: "Archmage",
    joined: new Date(2020, 7, 22),
    active: true,
    goldBalance: 200,
    level: 15,
    duespaid: true,
    specialSkills: ["Enchanting", "Scrying", "Alchemy"],
    inventory: ["Elemental Spelltome", "Fire Staff", "Potion of Mana"],
    questsCompleted: 28,
    // Mage-specific properties
    magicSchool: "Evocation",
    manaPool: 150,
    spellBook: ["Fireball", "Teleport", "Arcance Intellect", "Polymorph"],
};
var druun = {
    name: "Druun Nightcaller",
    rank: "Assassin",
    goldBalance: 1000,
    level: 30,
    joined: new Date(2023, 1, 24),
    active: true,
    duespaid: true,
    specialSkills: ["Lockpicking", "Parkour", "Persuasion"],
    inventory: ["Lucky Devils", "Poison Berries", "Assassin's Cowl"],
    questsCompleted: 60,
    // Rogue-specific properties
    specialisation: "Shadows",
    agilityPoints: 20,
    techniques: ["Poisons", "Shadow-weaving", "Soul-breather"],
};
// Create objects that implement the GuildMember interface
var warrior = {
    name: "Thorgrim Ironfist",
    rank: "Veteran",
    goldBalance: 400,
    level: 19,
    joined: new Date(2022, 1, 15),
    active: true,
    duespaid: true,
    specialSkills: ["Berserker Rage", "Shield Bash", "Intimidation"],
    inventory: ["Iron Fists", "Sweet Roll"],
    questsCompleted: 37,
};
var mage = {
    name: "Lysandra Starweaver",
    rank: "Adept",
    goldBalance: 50,
    level: 12,
    joined: new Date(2022, 6, 3),
    active: true,
    duespaid: false,
    specialSkills: ["Fireball", "Teleport", "Arcane Missile"],
    inventory: ["Devil's Breath", "Adept Robes"],
    questsCompleted: 19,
};
// Function to display guild member information
var displayMemberInfo = function (member) {
    console.log("\n=== GUILD MEMBER: ".concat(member.name, " ==="));
    console.log("Rank: ".concat(member.rank));
    console.log("Joined: ".concat(member.joined.toDateString()));
    console.log("Status: ".concat(member.active ? "Active" : "Inactive"));
    console.log("Dues: ".concat(member.duespaid ? "Paid" : "Unpaid"));
    console.log("Special Skills: ".concat(member.specialSkills.join(", ")));
    console.log("Quests Completed: ".concat(member.questsCompleted));
};
displayMemberInfo(warrior);
displayMemberInfo(mage);
// Display specialised member info
var displayWarriorInfo = function (warrior) {
    displayMemberInfo(warrior); // Reuse the base display function
    console.log("\n WARRIOR DETAILS:");
    console.log("Weapon: ".concat(warrior.weaponType));
    console.log("Armor Class: ".concat(warrior.armorClass));
    console.log("Battle Cries: ".concat(warrior.battleCries.join(", ")));
};
var displayMageInfo = function (mage) {
    displayMemberInfo(mage); // Reuse the base display function
    console.log("\nMAGE DETAILS:");
    console.log("Magic School: ".concat(mage.magicSchool));
    console.log("Mana Pool: ".concat(mage.manaPool));
    console.log("Spellbook: ".concat(mage.spellBook.join(", ")));
};
var displayRogueInfo = function (rogue) {
    displayMemberInfo(rogue);
    console.log("\nROGUE DETAILS:");
    console.log("Specialisation: ".concat(rogue.specialisation));
    console.log("Agility Points: ".concat(rogue.agilityPoints));
    console.log("Techniques: ".concat(rogue.techniques.join(", ")));
};
displayWarriorInfo(thorgar);
displayMageInfo(elindra);
displayRogueInfo(druun);
// Check if members can take the quest
console.log("\n=== QUEST: ".concat(dragonSlaying.title, " ==="));
console.log("Description: ".concat(dragonSlaying.description));
console.log("Can Thorgar take the quest? ".concat(dragonSlaying.isAvailable(thorgar.level) ? "Yes" : "No"));
console.log("Can a new recruit take the quest? ".concat(dragonSlaying.isAvailable(5) ? "Yes" : "No"));
// Complete the quest with Thorgar
dragonSlaying.complete(thorgar);
console.log("Thorgar has now completed ".concat(thorgar.questsCompleted, " quests."));
console.log("\n=== QUEST: ".concat(cooksAssistant.title));
console.log("Description: ".concat(cooksAssistant.description));
cooksAssistant.complete(druun);
