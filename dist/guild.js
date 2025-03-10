"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adventurersGuild = {
    name: "Adventurer's Guild",
    memberCount: 0,
    treasury: 0,
    fee: 100,
    guildMembers: [],
    assignQuest: (member, quest) => {
        if (adventurersGuild.guildMembers.includes(member) &&
            !member.activeQuests?.includes(quest) &&
            quest.isAvailable(member.level)) {
            member.activeQuests?.push(quest);
            console.log(`${member.name} has been assigned ${quest.title}.`);
        }
        else if (adventurersGuild.guildMembers.includes(member) &&
            member.activeQuests?.includes(quest)) {
            console.log(`${member.name} has already been assigned ${quest.title}. `);
        }
        else if (adventurersGuild.guildMembers.includes(member) &&
            !member.activeQuests?.includes(quest) &&
            !quest.isAvailable(member.level)) {
            console.log(`${member.name} (Level ${member.level}) is not high enough level. The quest requirement is Level ${quest.minLevel}`);
        }
        else {
            console.log(`${member.name} is not part of the ${adventurersGuild.name}.`);
        }
    },
    addMember: (member) => {
        if (adventurersGuild.guildMembers.includes(member)) {
            return console.log(`${member.name} is already part of ${adventurersGuild.name}.`);
        }
        if (member.goldBalance >= adventurersGuild.fee) {
            member.goldBalance -= adventurersGuild.fee;
            adventurersGuild.treasury += adventurersGuild.fee;
            member.guild = adventurersGuild;
            member.duespaid = true;
            adventurersGuild.guildMembers.push(member);
            console.log(`${member.name} has paid the ${adventurersGuild.name} fee of $${adventurersGuild.fee} and is now a member of the guild.`);
        }
        else {
            console.log(`${member.name} does not have enough money to pay the ${adventurersGuild.name} fee of $${adventurersGuild.fee}. ${adventurersGuild.fee - member.goldBalance} gold remaining.`);
        }
    },
    removeMember: (member) => {
        if (adventurersGuild.guildMembers.includes(member)) {
            let newGuildMembers = adventurersGuild.guildMembers.filter((guildMember) => guildMember.name != member.name);
            member.guild = undefined;
            member.duespaid = false;
            adventurersGuild.guildMembers = newGuildMembers;
            console.log(`${member.name} has been removed from the ${adventurersGuild.name}`);
        }
        else {
            console.log(`${member.name} is not part of the ${adventurersGuild.name}`);
        }
    },
    duesPaid: (member) => {
        if (member.duespaid === false &&
            member.goldBalance <= adventurersGuild.fee &&
            adventurersGuild.guildMembers.includes(member)) {
            console.log(`${member.name} cannot pay the Adventurer's Guild fee of $${adventurersGuild.fee} and will now be removed from the guild.`);
            const newGuildMembers = adventurersGuild.guildMembers.filter((guildMember) => guildMember.name != member.name);
            member.guild = undefined;
            member.duespaid = false;
            adventurersGuild.guildMembers = newGuildMembers;
        }
        else if (member.duespaid === false &&
            member.goldBalance >= adventurersGuild.fee &&
            adventurersGuild.guildMembers.includes(member)) {
            member.goldBalance -= adventurersGuild.fee;
            adventurersGuild.treasury += adventurersGuild.fee;
            console.log(`${member.name} has paid the Adventurer's Guild fee of $${adventurersGuild.fee} and remains in the guild.`);
            member.duespaid = true;
        }
        else {
            console.log(`${member.name} has paid all fees for ${adventurersGuild.name}`);
        }
    },
};
// Create a quest object
const dragonSlaying = {
    title: "Slay the Dragon of Mount Doom",
    description: "A fearsome dragon has been terrorizing nearby villages. Put an end to it!",
    difficulty: "Hard",
    reward: 1000,
    location: "Mount Doom",
    minLevel: 10,
    recommendedPartySize: 4,
    isAvailable: (memberLevel) => {
        return memberLevel >= dragonSlaying.minLevel;
    },
    complete: (member) => {
        if (member.activeQuests?.includes(dragonSlaying) &&
            dragonSlaying.isAvailable(member.level)) {
            console.log(`${member.name} has completed the quest "${dragonSlaying.title}"`);
            member.questsCompleted += 1;
            console.log(`${member.name} earned ${dragonSlaying.reward} gold.`);
        }
        else {
            if (!dragonSlaying.isAvailable(member.level)) {
                console.log(`${member.name} (Level ${member.level}) is not high enough level. The quest requirement is Level ${dragonSlaying.minLevel}`);
            }
            if (!member.activeQuests?.includes(dragonSlaying)) {
                console.log(`You are not assigned to ${dragonSlaying.title}! Speak with your guildmaster.`);
            }
        }
    },
};
const cooksAssistant = {
    title: "Cook's Assistant",
    description: "A cook for the royal duke needs assistance to complete his cake.",
    difficulty: "Easy",
    reward: 500,
    location: "Eldoria",
    minLevel: 1,
    itemsRequired: ["Egg", "Bucket of Milk", "Pot of Flour"],
    isAvailable: (memberLevel) => {
        return memberLevel >= cooksAssistant.minLevel;
    },
    complete: (member) => {
        if (member.inventory.includes("Egg") &&
            member.inventory.includes("Bucket of Milk") &&
            member.inventory.includes("Pot of Flour") &&
            member.activeQuests?.includes(cooksAssistant) &&
            cooksAssistant.isAvailable(member.level)) {
            let memberInventory = member.inventory.filter((item) => !cooksAssistant.itemsRequired?.includes(item));
            member.inventory = memberInventory;
            let memberQuests = member.activeQuests?.filter((quest) => quest.title != cooksAssistant.title);
            member.activeQuests = memberQuests;
            console.log(`${member.name} has completed the quest "${cooksAssistant.title}"`);
            member.questsCompleted += 1;
            console.log(`${member.name} earned ${cooksAssistant.reward} gold.`);
        }
        else {
            if (cooksAssistant.itemsRequired != undefined) {
                let missingQuestItems = cooksAssistant.itemsRequired.filter((item) => !member.inventory.includes(item));
                console.log("You don't have all the required items to complete this quest!");
                console.log(`You are missing: ${missingQuestItems.join(", ")} `);
            }
            if (!member.activeQuests?.includes(cooksAssistant)) {
                console.log(`You are not assigned to ${cooksAssistant.title}! Speak with your guildmaster.`);
            }
            if (!cooksAssistant.isAvailable(member.level)) {
                console.log(`${member.name} (Level ${member.level}) is not high enough level. The quest requirement is Level ${cooksAssistant.minLevel}`);
            }
        }
    },
};
const availableQuests = {
    quests: [cooksAssistant, dragonSlaying],
};
// Create specialized guild members
const thorgar = {
    name: "Thorgar Hammerfist",
    rank: "Elite",
    guild: undefined,
    goldBalance: 100,
    level: 20,
    joined: new Date(2021, 3, 10),
    active: true,
    duespaid: true,
    specialSkills: ["Cleave", "Shield Wall", "Heroic Strike"],
    inventory: ["Thorgar's Trusty Two Hand Axe", "Leather Boots", "Nightshade"],
    activeQuests: undefined,
    questsCompleted: 42,
    // Warrior-specific properties
    weaponType: "Two-Handed Axe",
    armorClass: 18,
    battleCries: ["For the North!", "Taste my steel!", "Victory or death!"],
};
const elindra = {
    name: "Elinda Moonwhisper",
    rank: "Archmage",
    guild: undefined,
    joined: new Date(2020, 7, 22),
    active: true,
    goldBalance: 50,
    level: 15,
    duespaid: true,
    specialSkills: ["Enchanting", "Scrying", "Alchemy"],
    inventory: ["Elemental Spelltome", "Fire Staff", "Potion of Mana"],
    activeQuests: [],
    questsCompleted: 28,
    // Mage-specific properties
    magicSchool: "Evocation",
    manaPool: 150,
    spellBook: ["Fireball", "Teleport", "Arcance Intellect", "Polymorph"],
};
const druun = {
    name: "Druun Nightcaller",
    rank: "Assassin",
    guild: undefined,
    goldBalance: 1000,
    level: 30,
    joined: new Date(2023, 1, 24),
    active: true,
    duespaid: false,
    specialSkills: ["Lockpicking", "Parkour", "Persuasion"],
    inventory: [
        "Lucky Devils",
        "Poison Berries",
        "Assassin's Cowl",
        "Egg",
        "Bucket of Milk",
        "Pot of Flour",
    ],
    activeQuests: [],
    questsCompleted: 60,
    // Rogue-specific properties
    specialisation: "Shadows",
    agilityPoints: 20,
    techniques: ["Poisons", "Shadow-weaving", "Soul-breather"],
};
// Create objects that implement the GuildMember interface
const warrior = {
    name: "Thorgrim Ironfist",
    rank: "Veteran",
    guild: undefined,
    goldBalance: 400,
    level: 19,
    joined: new Date(2022, 1, 15),
    active: true,
    duespaid: true,
    specialSkills: ["Berserker Rage", "Shield Bash", "Intimidation"],
    inventory: ["Iron Fists", "Sweet Roll"],
    activeQuests: [],
    questsCompleted: 37,
};
const mage = {
    name: "Lysandra Starweaver",
    rank: "Adept",
    guild: undefined,
    goldBalance: 50,
    level: 7,
    joined: new Date(2022, 6, 3),
    active: true,
    duespaid: false,
    specialSkills: ["Fireball", "Teleport", "Arcane Missile"],
    inventory: ["Devil's Breath", "Adept Robes"],
    activeQuests: [],
    questsCompleted: 19,
};
// Function to display guild member information
const displayMemberInfo = (member) => {
    console.log(`\n=== GUILD MEMBER: ${member.name} ===`);
    console.log(`Rank: ${member.rank}`);
    console.log(`Joined: ${member.joined.toDateString()}`);
    console.log(`Status: ${member.active ? "Active" : "Inactive"}`);
    console.log(`Dues: ${member.duespaid ? "Paid" : "Unpaid"}`);
    console.log(`Special Skills: ${member.specialSkills.join(", ")}`);
    console.log(`Quests Completed: ${member.questsCompleted}`);
};
displayMemberInfo(warrior);
displayMemberInfo(mage);
// Display specialised member info
const displayWarriorInfo = (warrior) => {
    displayMemberInfo(warrior); // Reuse the base display function
    console.log(`\n WARRIOR DETAILS:`);
    console.log(`Weapon: ${warrior.weaponType}`);
    console.log(`Armor Class: ${warrior.armorClass}`);
    console.log(`Battle Cries: ${warrior.battleCries.join(", ")}`);
};
const displayMageInfo = (mage) => {
    displayMemberInfo(mage); // Reuse the base display function
    console.log(`\nMAGE DETAILS:`);
    console.log(`Magic School: ${mage.magicSchool}`);
    console.log(`Mana Pool: ${mage.manaPool}`);
    console.log(`Spellbook: ${mage.spellBook.join(", ")}`);
};
const displayRogueInfo = (rogue) => {
    displayMemberInfo(rogue);
    console.log(`\nROGUE DETAILS:`);
    console.log(`Specialisation: ${rogue.specialisation}`);
    console.log(`Agility Points: ${rogue.agilityPoints}`);
    console.log(`Techniques: ${rogue.techniques.join(", ")}`);
};
displayWarriorInfo(thorgar);
displayMageInfo(elindra);
displayRogueInfo(druun);
// Check if members can take the quest
console.log(`\n=== QUEST: ${dragonSlaying.title} ===`);
console.log(`Description: ${dragonSlaying.description}`);
console.log(`Can Thorgar take the quest? ${dragonSlaying.isAvailable(thorgar.level) ? "Yes" : "No"}`);
console.log(`Can a new recruit take the quest? ${dragonSlaying.isAvailable(5) ? "Yes" : "No"}`);
// Complete the quest with Thorgar
dragonSlaying.complete(thorgar);
console.log(`Thorgar has now completed ${thorgar.questsCompleted} quests.`);
console.log(`\n=== QUEST: ${cooksAssistant.title}`);
console.log(`Description: ${cooksAssistant.description}`);
console.log(`Items Required: ${cooksAssistant.itemsRequired?.join(", ")}`);
console.log("\n");
const questTitles = availableQuests.quests.map((quest) => quest.title);
console.log(`Available Quests: ${questTitles.join(", ")}`);
console.log(`Druun's Quest Log: ${druun.activeQuests?.join(", ") === ""
    ? "None"
    : druun.activeQuests?.join(", ")}`);
adventurersGuild.addMember(druun);
adventurersGuild.assignQuest(druun, cooksAssistant);
console.log(`Druun's Quest Log: ${druun.activeQuests
    ?.map((quest) => quest.title)
    .join(", ")}`);
cooksAssistant.complete(druun);
