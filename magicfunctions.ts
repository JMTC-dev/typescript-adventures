// Function type syntax
type SpellCaster = (spellName: string, manaRequired: number) => boolean;

// Function that follows this signature
const castSpell: SpellCaster = (spellName, manaRequired) => {
  console.log(`Attempting to cast ${spellName} (${manaRequired} mana)...`);
  // Logic to determine if spell was successful
  return Math.random() > 0.3;
};
