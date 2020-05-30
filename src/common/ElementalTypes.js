// elemental advantage to capture pokemon
export const ElementalTypes = {
	normal: {
		superEffective: [],
		notEffective: ['rock', 'steel'],
		noDamage: ['ghost'],
	},
	fire: {
		superEffective: ['grass', 'ice', 'bug', 'steel'],
		notEffective: ['fire', 'water', 'rock', 'dragon'],
		noDamage: [],
	},
	water: {
		superEffective: ['fire', 'ground', 'rock'],
		notEffective: ['water', 'grass', 'dragon'],
		noDamage: [],
	},
	electric: {
		superEffective: ['water', 'flying'],
		notEffective: ['electric', 'grass'],
		noDamage: ['ground'],
	},
	grass: {
		superEffective: ['water', 'ground', 'rock'],
		notEffective: ['fire', 'grass', 'poison', 'flying', 'bug'],
		noDamage: [],
	},
	ice: {
		superEffective: ['grass', 'ground', 'flying', 'dragon'],
		notEffective: ['fire', 'water', 'ice', 'steel'],
		noDamage: [],
	},
	fighting: {
		superEffective: ['normal', 'ice', 'rock', 'steel'],
		notEffective: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
		noDamage: ['ghost'],
	},
	poison: {
		superEffective: ['grass', 'fairy'],
		notEffective: ['poison', 'ground', 'rock', 'ghost'],
		noDamage: ['steel'],
	},
	ground: {
		superEffective: ['fire', 'electric', 'poison', 'rock', 'steel'],
		notEffective: ['grass', 'bug'],
		noDamage: ['flying'],
	},
	flying: {
		superEffective: ['grass', 'fighting', 'bug'],
		notEffective: ['electric', 'rock'],
		noDamage: [],
	},
	psychic: {
		superEffective: ['fighting', 'poison'],
		notEffective: ['psychic', 'steel'],
		noDamage: [],
	},
	bug: {
		superEffective: ['grass', 'psychic'],
		notEffective: ['fire', 'fighting', 'poison', 'ghost', 'steel', 'fairy'],
		noDamage: [],
	},
	rock: {
		superEffective: ['fire', 'ice', 'flying', 'bug'],
		notEffective: ['fighting', 'ground', 'steel'],
		noDamage: [],
	},
	ghost: {
		superEffective: ['psychic'],
		notEffective: [],
		noDamage: ['normal'],
	},
	dragon: {
		superEffective: [],
		notEffective: ['steel'],
		noDamage: ['fairy'],
	},
	steel: {
		superEffective: ['ice', 'rock', 'fairy'],
		notEffective: ['fire', 'water', 'electric', 'steel'],
		noDamage: [],
	},
	fairy: {
		superEffective: ['fighting', 'dragon'],
		notEffective: ['fire', 'poison', 'steel'],
		noDamage: [],
	}
};