// elemental advantage to capture pokemon
export const ElementalTypes = {
	normal: {
		superEffective: [],
		notEffective: ['rock', 'steel']
	},
	fire: {
		superEffective: ['grass', 'ice', 'bug', 'steel'],
		notEffective: ['fire', 'water', 'rock', 'dragon'],
	},
	water: {
		superEffective: ['fire', 'ground', 'rock'],
		notEffective: ['water', 'grass', 'dragon']
	},
	electric: {
		superEffective: ['water', 'flying'],
		notEffective: ['electric', 'grass']
	},
	grass: {
		superEffective: ['water', 'ground', 'rock'],
		notEffective: ['fire', 'grass', 'poison', 'flying', 'bug']
	},
	ice: {
		superEffective: ['grass', 'ground', 'flying', 'dragon'],
		notEffective: ['fire', 'water', 'ice', 'steel']
	},
	fighting: {
		superEffective: ['normal', 'ice', 'rock', 'steel'],
		notEffective: ['poison', 'flying', 'psychic', 'bug', 'fairy']
	},
	poison: {
		superEffective: ['grass', 'fairy'],
		notEffective: ['poison', 'ground', 'rock', 'ghost']
	},
	ground: {
		superEffective: ['fire', 'electric', 'poison', 'rock', 'steel'],
		notEffective: ['grass', 'bug']
	},
	flying: {
		superEffective: ['grass', 'fighting', 'bug'],
		notEffective: ['electric', 'rock']
	},
	psychic: {
		superEffective: ['fighting', 'poison'],
		notEffective: ['psychic', 'steel']
	},
	bug: {
		superEffective: ['grass', 'psychic'],
		notEffective: ['fire', 'fighting', 'poison', 'ghost', 'steel', 'fairy']
	},
	rock: {
		superEffective: ['fire', 'ice', 'flying', 'bug'],
		notEffective: ['fighting', 'ground', 'steel']
	},
	ghost: {
		superEffective: ['psychic'],
		notEffective: []
	},
	dragon: {
		superEffective: [],
		notEffective: ['steel']
	},
	steel: {
		superEffective: ['ice', 'rock', 'fairy'],
		notEffective: ['fire', 'water', 'electric', 'steel']
	},
	fairy: {
		superEffective: ['fighting', 'dragon'],
		notEffective: ['fire', 'poison', 'steel']
	}
};