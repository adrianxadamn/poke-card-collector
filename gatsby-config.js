require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Poke Card Collector`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    pokemon: [
      {
        name: 'bulbasaur',
        id: 1,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1050,
        types: ['poison', 'grass']
      },
      {
        name: 'ivysaur',
        id: 2,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1899,
        types: ['poison', 'grass']
      },
      {
        name: 'venusaur',
        id: 3,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 3020,
        types: ['poison', 'grass']
      },
      {
        name: 'charmander',
        id: 4,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1050,
        types: ['fire']
      },
      {
        name: 'charmeleon',
        id: 5,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1853,
        types: ['fire']
      },
      {
        name: 'charizard',
        id: 6,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 3189,
        types: ['flying', 'fire']
      },
      {
        name: 'squirtle',
        id: 7,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        encounter_rate: 75,
        capture_rate: 75,
        combat_power: 1050,
        types: ['water']
      },
      {
        name: 'wartortle',
        id: 8,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1688,
        types: ['water']
      },
      {
        name: 'blastoise',
        id: 9,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 3066,
        types: ['water']
      },
      {
        name: 'caterpie',
        id: 10,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 437,
        types: ['bug']
      },
      {
        name: 'metapod',
        id: 11,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 450,
        types: ['bug']
      },
      {
        name: 'butterfree',
        id: 12,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1827,
        types: ['psychic', 'bug']
      },
      {
        name: 'weedle',
        id: 13,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 456,
        types: ['poison', 'bug']
      },
      {
        name: 'kakuna',
        id: 14,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 432,
        types: ['poison', 'bug']
      },
      {
        name: 'beedrill',
        id: 15,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1846 ,
        types: ['poison', 'bug']
      },
      {
        name: 'pidgey',
        id: 16,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 680,
        types: ['flying', 'normal']
      },
      {
        name: 'pidgeotto',
        id: 17,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1194,
        types: ['flying', 'normal']
      },
      {
        name: 'pidgeot',
        id: 18,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2129,
        types: ['flying', 'normal']
      },
      {
        name: 'rattata',
        id: 19,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 734,
        types: ['normal']
      },
      {
        name: 'raticate',
        id: 20,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1730,
        types: ['normal']
      },
      {
        name: 'spearow',
        id: 21,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 798,
        types: ['flying', 'normal']
      },
      {
        name: 'fearow',
        id: 22,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1997,
        types: ['flying', 'normal']
      },
      {
        name: 'ekans',
        id: 23,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 927,
        types: ['poison']
      },
      {
        name: 'arbok',
        id: 24,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1921,
        types: ['poison']
      },
      {
        name: 'pikachu',
        id: 25,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1050,
        types: ['electric']
      },
      {
        name: 'raichu',
        id: 26,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2182,
        types: ['electric']
      },
      {
        name: 'sandshrew',
        id: 27,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1261,
        types: ['ground']
      },
      {
        name: 'sandslash',
        id: 28,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2374,
        types: ['ground']
      },
      {
        name: 'nidoran-f',
        id: 29,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 816,
        types: ['poison']
      },
      {
        name: 'nidorina',
        id: 30,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1309,
        types: ['poison']
      },
      {
        name: 'nidoqueen',
        id: 31,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2488,
        types: ['ground', 'poison']
      },
      {
        name: 'nidoran-m',
        id: 32,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 860,
        types: ['poison']
      },
      {
        name: 'nidorino',
        id: 33,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1393,
        types: ['poison']
      },
      {
        name: 'nidoking',
        id: 34,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2567,
        types: ['ground', 'poison']
      },
      {
        name: 'clefairy',
        id: 35,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1155,
        types: ['fairy']
      },
      {
        name: 'clefable',
        id: 36,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2437,
        types: ['fairy']
      },
      {
        name: 'vulpix',
        id: 37,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 883,
        types: ['fire']
      },
      {
        name: 'ninetales',
        id: 38,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2279,
        types: ['fire']
      },
      {
        name: 'jigglypuff',
        id: 39,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 724,
        types: ['fairy', 'normal']
      },
      {
        name: 'wigglytuff',
        id: 40,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1926,
        types: ['fairy', 'normal']
      },
      {
        name: 'zubat',
        id: 41,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 667,
        types: ['flying', 'poison']
      },
      {
        name: 'golbat',
        id: 42,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1976,
        types: ['flying', 'poison']
      },
      {
        name: 'oddish',
        id: 43,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1228,
        types: ['poison', 'grass']
      },
      {
        name: 'gloom',
        id: 44,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1681,
        types: ['poison', 'grass']
      },
      {
        name: 'vileplume',
        id: 45,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2559,
        types: ['poison', 'grass']
      },
      {
        name: 'paras',
        id: 46,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1018,
        types: ['grass', 'bug']
      },
      {
        name: 'parasect',
        id: 47,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1859,
        types: ['grass', 'bug']
      },
      {
        name: 'venonat',
        id: 48,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1004,
        types: ['poison', 'bug']
      },
      {
        name: 'venomoth',
        id: 49,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2082,
        types: ['poison', 'bug']
      },
      {
        name: 'diglett',
        id: 50,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 676,
        types: ['ground']
      },
      {
        name: 'dugtrio',
        id: 51,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1557,
        types: ['ground']
      },
      {
        name: 'meowth',
        id: 52,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 748,
        types: ['normal']
      },
      {
        name: 'persian',
        id: 53,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1689,
        types: ['normal']
      },
      {
        name: 'psyduck',
        id: 54,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1106,
        types: ['water', 'psychic']
      },
      {
        name: 'golduck',
        id: 55,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2450,
        types: ['water', 'psychic']
      },
      {
        name: 'mankey',
        id: 56,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1164,
        types: ['fighting']
      },
      {
        name: 'primeape',
        id: 57,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2288,
        types: ['fighting']
      },
      {
        name: 'growlithe',
        id: 58,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1243,
        types: ['fire']
      },
      {
        name: 'arcanine',
        id: 59,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3029,
        types: ['fire']
      },
      {
        name: 'poliwag',
        id: 60,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 829,
        types: ['water']
      },
      {
        name: 'poliwhirl',
        id: 61,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1419,
        types: ['water']
      },
      {
        name: 'poliwrath',
        id: 62,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2586,
        types: ['fighting', 'water']
      },
      {
        name: 'abra',
        id: 63,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1342,
        types: ['psychic']
      },
      {
        name: 'kadabra',
        id: 64,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1699,
        types: ['psychic']
      },
      {
        name: 'alakazam',
        id: 65,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3057,
        types: ['psychic']
      },
      {
        name: 'machop',
        id: 66,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1278,
        types: ['fighting']
      },
      {
        name: 'machoke',
        id: 67,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2031,
        types: ['fighting']
      },
      {
        name: 'machamp',
        id: 68,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3056,
        types: ['fighting']
      },
      {
        name: 'bellsprout',
        id: 69,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1033,
        types: ['poison', 'grass']
      },
      {
        name: 'weepinbell',
        id: 70,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1611,
        types: ['poison', 'grass']
      },
      {
        name: 'victreebel',
        id: 71,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2431,
        types: ['poison', 'grass']
      },
      {
        name: 'tentacool',
        id: 72,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1040,
        types: ['poison', 'water']
      },
      {
        name: 'tentacruel',
        id: 73,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2422,
        types: ['poison', 'water']
      },
      {
        name: 'geodude',
        id: 74,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1293,
        types: ['ground', 'rock']
      },
      {
        name: 'graveler',
        id: 75,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1897,
        types: ['ground', 'rock']
      },
      {
        name: 'golem',
        id: 76,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2949,
        types: ['ground', 'rock']
      },
      {
        name: 'ponyta',
        id: 77,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1697,
        types: ['fire']
      },
      {
        name: 'rapidash',
        id: 78,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2461,
        types: ['fire']
      },
      {
        name: 'slowpoke',
        id: 79,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1226,
        types: ['psychic', 'water']
      },
      {
        name: 'slowbro',
        id: 80,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2545,
        types: ['psychic', 'water']
      },
      {
        name: 'magnemite',
        id: 81,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1362,
        types: ['steel', 'electric']
      },
      {
        name: 'magneton',
        id: 82,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2485,
        types: ['steel', 'electric']
      },
      {
        name: 'farfetchd',
        id: 83,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 1236,
        types: ['flying', 'normal']
      },
      {
        name: 'doduo',
        id: 84,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1200,
        types: ['flying', 'normal']
      },
      {
        name: 'dodrio',
        id: 85,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2362,
        types: ['flying', 'normal']
      },
      {
        name: 'seel',
        id: 86,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 971,
        types: ['water']
      },
      {
        name: 'dewgong',
        id: 87,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1985,
        types: ['ice', 'water']
      },
      {
        name: 'grimer',
        id: 88,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1374,
        types: ['poison']
      },
      {
        name: 'muk',
        id: 89,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2757,
        types: ['poison']
      },
      {
        name: 'shellder',
        id: 90,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1080,
        types: ['water']
      },
      {
        name: 'cloyster',
        id: 91,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2547,
        types: ['ice', 'water']
      },
      {
        name: 'gastly',
        id: 92,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1229,
        types: ['poison', 'ghost']
      },
      {
        name: 'haunter',
        id: 93,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1963,
        types: ['poison', 'ghost']
      },
      {
        name: 'gengar',
        id: 94,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2878,
        types: ['poison', 'ghost']
      },
      {
        name: 'onix',
        id: 95,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1101,
        types: ['ground', 'rock']
      },
      {
        name: 'drowzee',
        id: 96,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1040,
        types: ['psychic']
      },
      {
        name: 'hypno',
        id: 97,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2090,
        types: ['psychic']
      },
      {
        name: 'krabby',
        id: 98,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1561,
        types: ['water']
      },
      {
        name: 'kingler',
        id: 99,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2829,
        types: ['water']
      },
      {
        name: 'voltorb',
        id: 100,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 1010,
        types: ['electric']
      },
      {
        name: 'electrode',
        id: 101,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2099,
        types: ['electric']
      },
      {
        name: 'exeggcute',
        id: 102,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1175,
        types: ['psychic', 'grass']
      },
      {
        name: 'exeggutor',
        id: 103,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3014,
        types: ['psychic', 'grass']
      },
      {
        name: 'cubone',
        id: 104,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1019,
        types: ['ground']
      },
      {
        name: 'marowak',
        id: 105,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1835,
        types: ['ground']
      },
      {
        name: 'hitmonlee',
        id: 106,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2576,
        types: ['fighting']
      },
      {
        name: 'hitmonchan',
        id: 107,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2332,
        types: ['fighting']
      },
      {
        name: 'lickitung',
        id: 108,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1411,
        types: ['normal']
      },
      {
        name: 'koffing',
        id: 109,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1214,
        types: ['poison']
      },
      {
        name: 'weezing',
        id: 110,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 2293,
        types: ['poison']
      },
      {
        name: 'rhyhorn',
        id: 111,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1651,
        types: ['rock', 'ground']
      },
      {
        name: 'rhydon',
        id: 112,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3179,
        types: ['rock', 'ground']
      },
      {
        name: 'chansey',
        id: 113,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1255,
        types: ['normal']
      },
      {
        name: 'tangela',
        id: 114,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2238,
        types: ['grass']
      },
      {
        name: 'kangaskhan',
        id: 115,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2586,
        types: ['normal']
      },
      {
        name: 'horsea',
        id: 116,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1056,
        types: ['water']
      },
      {
        name: 'seadra',
        id: 117,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2093,
        types: ['water']
      },
      {
        name: 'goldeen',
        id: 118,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1152,
        types: ['water']
      },
      {
        name: 'seaking',
        id: 119,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2162,
        types: ['water']
      },
      {
        name: 'staryu',
        id: 120,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1157,
        types: ['water']
      },
      {
        name: 'starmie',
        id: 121,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2584,
        types: ['psychic', 'water']
      },
      {
        name: 'mr-mime',
        id: 122,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2228,
        types: ['fairy', 'psychic']
      },
      {
        name: 'scyther',
        id: 123,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2706,
        types: ['flying', 'bug']
      },
      {
        name: 'jynx',
        id: 124,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2555,
        types: ['psychic', 'ice']
      },
      {
        name: 'electabuzz',
        id: 125,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2334,
        types: ['electric']
      },
      {
        name: 'magmar',
        id: 126,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png',
        encounter_rate: 50,
        capture_rate: 50,
        combat_power: 2394,
        types: ['fire']
      },
      {
        name: 'pinsir',
        id: 127,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2959,
        types: ['bug']
      },
      {
        name: 'tauros',
        id: 128,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2620,
        types: ['normal']
      },
      {
        name: 'magikarp',
        id: 129,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
        encounter_rate: 90,
        capture_rate: 90,
        combat_power: 274,
        types: ['water']
      },
      {
        name: 'gyarados',
        id: 130,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3391,
        types: ['flying', 'water']
      },
      {
        name: 'lapras',
        id: 131,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2641,
        types: ['ice', 'water']
      },
      {
        name: 'ditto',
        id: 132,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
        encounter_rate: 80,
        capture_rate: 80,
        combat_power: 832,
        types: ['normal']
      },
      {
        name: 'eevee',
        id: 133,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1071,
        types: ['normal']
      },
      {
        name: 'vaporeon',
        id: 134,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3114,
        types: ['water']
      },
      {
        name: 'jolteon',
        id: 135,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2888,
        types: ['electric']
      },
      {
        name: 'flareon',
        id: 136,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3029,
        types: ['fire']
      },
      {
        name: 'porygon',
        id: 137,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1720,
        types: ['normal']
      },
      {
        name: 'omanyte',
        id: 138,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1544,
        types: ['water', 'rock']
      },
      {
        name: 'omastar',
        id: 139,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2786,
        types: ['water', 'rock']
      },
      {
        name: 'kabuto',
        id: 140,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1370,
        types: ['water', 'rock']
      },
      {
        name: 'kabutops',
        id: 141,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2713,
        types: ['water', 'rock']
      },
      {
        name: 'aerodactyl',
        id: 142,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png',
        encounter_rate: 40,
        capture_rate: 40,
        combat_power: 2783,
        types: ['flying', 'rock']
      },
      {
        name: 'snorlax',
        id: 143,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3225,
        types: ['normal']
      },
      {
        name: 'articuno',
        id: 144,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3051,
        types: ['flying', 'ice']
      },
      {
        name: 'zapdos',
        id: 145,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png',
        encounter_rate: 20,
        capture_rate: 20,
        combat_power: 3527,
        types: ['flying', 'electric']
      },
      {
        name: 'moltres',
        id: 146,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png',
        encounter_rate: 30,
        capture_rate: 30,
        combat_power: 3465,
        types: ['flying', 'fire']
      },
      {
        name: 'dratini',
        id: 147,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png',
        encounter_rate: 70,
        capture_rate: 70,
        combat_power: 1004,
        types: ['dragon']
      },
      {
        name: 'dragonair',
        id: 148,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png',
        encounter_rate: 60,
        capture_rate: 60,
        combat_power: 1780,
        types: ['dragon']
      },
      {
        name: 'dragonite',
        id: 149,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
        encounter_rate: 20,
        capture_rate: 20,
        combat_power: 3792,
        types: ['flying', 'dragon']
      },
      {
        name: 'mewtwo',
        id: 150,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
        encounter_rate: 10,
        capture_rate: 10,
        combat_power: 4178,
        types: ['psychic']
      },
      {
        name: 'mew',
        id: 151,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
        encounter_rate: 10,
        capture_rate: 10,
        combat_power: 3265,
        types: ['psychic']
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
