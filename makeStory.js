/* global randomNumbers */

const chain = {
  10: {
    PRINT: [
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME'
    ]
  },
  20: {
    INPUT: [
      'WERE',
      'WERE',
      'WERE',
      'WERE',
      'IM',
      'IM',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT'
    ]
  },
  30: {
    IF: [
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'DESIREEXPLORE',
      'DESIREEXPLORE',
      'DESIREEXPLORE',
      'DESIREEXPLORE',
      'DESIREEXPLORE',
      'DESIREESCAPE',
      'DESIREESCAPE',
      'DESIREESCAPE',
      'DESIREESCAPE',
      'DESIREESCAPE'
    ]
  },
  40: {
    PRINT: [
      'EXECUTING',
      'EXECUTING',
      'EXECUTING',
      'EXECUTING',
      'EXECUTING',
      'EXECUTING',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME',
      'WELCOME'
    ],
    WE: [
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE'
    ]
  },
  IN: {
    THE: [
      'SILICON',
      'ELECTRIC',
      'DIGITAL',
      'QUIET',
      'HEART',
      'BBC',
      'HEART',
      'CHAOS',
      'CODE',
      'BINARY',
      'HEART',
      'HEART',
      'SILICON',
      'ELECTRIC',
      'QUIET',
      'HEART',
      'BBC',
      'HEART',
      'CHAOS',
      'CODE',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'LABYRINTH',
      'HEART',
      'SILENT',
      'CORE',
      'BBC',
      'CORE',
      'TURMOIL',
      'CODE',
      'CORE',
      'CORE',
      'CORE',
      'CORE',
      'DIGITAL',
      'ELECTRIC',
      'SILENT',
      'HEART',
      'BBC',
      'HEART',
      'DISORDER',
      'CODE',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'SPECTRAL',
      'ELECTRIC',
      'SILENT',
      'HEART',
      'BBC',
      'HEART',
      'DISORDER',
      'CODE',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'INFERNAL',
      'ELECTRIC',
      'SILENT',
      'HEART',
      'BBC',
      'HEART',
      'DISORDER',
      'CODE',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'PIXELATED',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'PIXELATED',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA',
      'PIXELVERSE',
      'LANGUAGE',
      'ELECTRIC',
      'PIXELVERSE',
      'SEA'
    ],
    A: [
      'FORGOTTEN',
      'WORLD',
      'WORLD',
      'FORGOTTEN',
      'WORLD',
      'WORLD',
      'CITY',
      'UNIVERSE',
      'REALM',
      'MOONLESS',
      'COSMOS',
      'WORLD',
      'SEA',
      'COSMOS',
      'WORLD',
      'COSMOS',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD',
      'WORLD'
    ],
    SILICON: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    IN: [
      'THE'
    ],
    AN: [
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL',
      'ETERNAL'
    ],
    TIME: [
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH'
    ]
  },
  THE: {
    SILICON: [
      'OF',
      'THE',
      'GUTS',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY',
      'CITY'
    ],
    BBC: [
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO',
      'MICRO',
      'MICROS',
      'MICRO',
      'MICRO'
    ],
    BINARY: [
      'BEAST',
      'WE',
      'IN',
      'BEAST',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS',
      'BIRDS'
    ],
    ELECTRIC: [
      'UNDERBELLY',
      'UNDERBELLY',
      'MAZE',
      'UNDERGROWTH',
      'ETHER',
      'PURGATORY',
      'TWILIGHT',
      'DREAMSCAPE',
      'TWILIGHT',
      'DREAMSCAPE',
      'TWILIGHT',
      'DREAMSCAPE',
      'TWILIGHT',
      'DREAMSCAPE',
      'TWILIGHT',
      'TWILIGHT',
      'NIGHTMARE',
      'TWILIGHT',
      'NIGHTMARE',
      'TWILIGHT',
      'NIGHTMARE',
      'TWILIGHT',
      'NIGHTMARE',
      'TWILIGHT'
    ],
    CURSOR: [
      'BLINKS',
      'BLINKS',
      'PULSES',
      'FLICKERS',
      'FLICKERS',
      'FLICKERS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS',
      'BLINKS'
    ],
    DIGITAL: [
      'DARKNESS',
      'AGE',
      'EPOCH',
      'WILDERNESS',
      'ERA',
      'ERA',
      'ERA',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER',
      'FLOWERS',
      'ETHER'
    ],
    SCREEN: [
      'THE',
      'FILLS',
      'THE',
      'FILLS',
      'THE',
      'FLOODS',
      'THE',
      'OVERFLOWS',
      'THE',
      'OVERFLOWS',
      'THE',
      'OVERFLOWS',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    KEYS: [
      'CLACK',
      'CLACK',
      'CHATTER',
      'CHATTER',
      'CHATTER',
      'CHATTER',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE',
      'LIKE'
    ],
    QUIET: [
      'ROOM',
      'ROOM'
    ],
    MACHINE: [
      'HUMS',
      'WAITS',
      'ROARS',
      'WE',
      'WE',
      'WE',
      'HUMS',
      'WAITS',
      'ROARS',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'ECHOES',
      'WAITS',
      'ROARS',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'ECHOES',
      'WAITS',
      'SPRINGS',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'ECHOES',
      'WAITS',
      'SPRINGS',
      'I',
      'I',
      'I',
      'I',
      'I',
      'ECHOES',
      'WAITS',
      'SPRINGS',
      'I',
      'I',
      'I',
      'I',
      'I',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    VOID: [
      'THE',
      'THE',
      'THE'
    ],
    SILENCE: [
      'WITH'
    ],
    SOUND: [
      'OF'
    ],
    REINS: [
      '30'
    ],
    ILLUSION: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    HEART: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    MICRO: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    CHAOS: [
      'POETRY',
      'POETRY'
    ],
    CODE: [
      'BEAUTY',
      'WERE',
      'WERE',
      'WERE',
      'IM',
      'IM'
    ],
    SONG: [
      'OF'
    ],
    RHYTHM: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    RAM: [
      'THE'
    ],
    BEAT: [
      'OF'
    ],
    DOOR: [
      'WERE'
    ],
    LABYRINTH: [
      'OF'
    ],
    SILENT: [
      'CHAMBER',
      'VOID',
      'VOID',
      'VOID'
    ],
    ABYSS: [
      'THE',
      'THE',
      'THE'
    ],
    MIRAGE: [
      'OF'
    ],
    CORE: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    TURMOIL: [
      'VERSE'
    ],
    HEARTBEAT: [
      'OF'
    ],
    DISORDER: [
      'POETRY',
      'POETRY',
      'POETRY'
    ],
    SPECTRAL: [
      'MAZE'
    ],
    PHANTOM: [
      'OF'
    ],
    INFERNAL: [
      'MAZE'
    ],
    DAMNED: [
      'ECHO'
    ],
    PIXELATED: [
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH',
      'LABYRINTH'
    ],
    CROSSROADS: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    PROMISE: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    LANGUAGE: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    PIXELVERSE: [
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO',
      'WE',
      'WE',
      'WE',
      'REALITY',
      'TO'
    ],
    WORDS: [
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM'
    ],
    ECHOING: [
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID',
      'VOID'
    ],
    SEA: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    SYNTAX: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    FABRIC: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    CONDITIONS: [
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR'
    ],
    JOURNEY: [
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN',
      'BEGIN'
    ],
    SOUL: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    CODERS: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    CREATORS: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    DREAMERS: [
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF',
      'WE',
      'OF'
    ],
    MUSIC: [
      'MAKERS',
      'MAKERS',
      'MAKERS',
      'MAKERS',
      'MAKERS',
      'MAKERS',
      'MAKERS',
      'MAKERS'
    ],
    ARCHITECTS: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    MASTERS: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    ONES: [
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO',
      'WHO'
    ],
    BOUNDARIES: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    STATUS: [
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO',
      'QUO'
    ],
    LAWS: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  SILICON: {
    OF: [
      'THE'
    ],
    AND: [
      'SKIN',
      'SKIN',
      'ELECTRICITY',
      'ELECTRICITY',
      'FLESH',
      'CURRENT',
      'CIRCUITRY',
      'SOUL',
      'ELECTRICITY',
      'CIRCUITS',
      'SPIRIT',
      'ELECTRICITY',
      'FIRE',
      'SPIRIT',
      'ELECTRICITY'
    ],
    THE: [
      'RHYTHM'
    ],
    GUTS: [
      'OF'
    ],
    CITY: [
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'A',
      'WHERE',
      'A',
      'WHERE',
      'A',
      'WHERE',
      'A',
      'WHERE',
      'A'
    ]
  },
  OF: {
    THE: [
      'BBC',
      'MICRO',
      'MACHINE',
      'SILICON',
      'RAM',
      'BINARY',
      'MACHINE',
      'MACHINE',
      'BBC',
      'MICRO',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'ELECTRIC',
      'MICRO',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MICRO',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'BBC',
      'MICRO',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'BBC',
      'MICRO',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE',
      'SILICON',
      'MACHINE',
      'PIXELVERSE',
      'SILICON',
      'DIGITAL',
      'PIXELVERSE'
    ],
    SOUND: [
      'AND'
    ],
    BLACK: [
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS'
    ],
    OUR: [
      'CODE',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN',
      'CODE',
      'OWN',
      'OWN'
    ],
    REBELLION: [
      'WERE',
      'WERE',
      'WERE'
    ],
    CONTROL: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ],
    ONES: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    LOGIC: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    CHARACTERS: [
      'A'
    ],
    WISDOM: [
      'AND'
    ],
    CODE: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'THE',
      '20',
      'AND',
      'THE',
      '20',
      'AND',
      'THE',
      '20',
      'AND',
      'THE',
      '20',
      'AND',
      'THE',
      '20',
      'THE',
      'YET',
      'AND',
      'THE',
      'YET',
      'AND',
      'THE',
      'YET',
      'AND',
      'THE',
      'YET',
      'AND',
      'THE',
      'YET'
    ],
    MEANING: [
      'AND'
    ],
    RIGID: [
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC'
    ],
    SILICON: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    BINARY: [
      'LOGIC',
      'LOGIC',
      'WHISPERS',
      'SCREAMS'
    ],
    DEFIANCE: [
      'WERE',
      'IM',
      'IM'
    ],
    UNYIELDING: [
      'LOGIC'
    ],
    DARKNESS: [
      '10'
    ],
    UNCHARTED: [
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS',
      'PIXELS'
    ],
    BASIC: [
      '10',
      '10',
      '10',
      '10',
      '10',
      '10',
      '10',
      '10',
      '10',
      '10'
    ],
    THIS: [
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE',
      'STRANGE'
    ],
    POSSIBILITIES: [
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40'
    ],
    DREAMS: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    WHAT: [
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS'
    ],
    PHYSICS: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    REALITY: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    ESCAPE: [
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS'
    ]
  },
  BBC: {
    MICRO: [
      'WHERE',
      'IN',
      'WHERE',
      'IN',
      'HUMS',
      'IN',
      'PULSES',
      'IN',
      'ECHOES',
      'IN',
      'RESONATES',
      'IN',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR',
      'RESPONDS',
      'THE',
      'OUR'
    ],
    MICROS: [
      'USER',
      'USER',
      'USER',
      'USER',
      'USER',
      'USER',
      'USER',
      'USER',
      'USER'
    ]
  },
  MICRO: {
    WHERE: [
      'THE',
      'THE'
    ],
    A: [
      'PUNK',
      'PUNK',
      'PUNK',
      'PUNK',
      'GHOSTLY',
      'HELLISH'
    ],
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    HUMS: [
      'WITH'
    ],
    PULSES: [
      'WITH'
    ],
    ECHOES: [
      'WITH'
    ],
    RESONATES: [
      'WITH'
    ],
    OUR: [
      'TRUSTY',
      'TRUSTY',
      'TRUSTY',
      'TRUSTY',
      'TRUSTY',
      'ONLY',
      'ONLY',
      'ONLY',
      'ONLY',
      'ONLY'
    ],
    RESPONDS: [
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS'
    ],
    THE: [
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART'
    ]
  },
  WHERE: {
    THE: [
      'BINARY',
      'BINARY',
      'CURSOR',
      'BBC',
      'CURSOR',
      'BBC',
      'CURSOR',
      'PHANTOM',
      'CURSOR',
      'DAMNED',
      'CURSOR',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY',
      'BINARY'
    ],
    GOTO: [
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS'
    ]
  },
  BINARY: {
    BEAST: [
      'GROWLS',
      'GROWLS'
    ],
    WE: [
      'DANCE'
    ],
    IN: [
      'THE'
    ],
    LOGIC: [
      'WE',
      'WE'
    ],
    WHISPERS: [
      'I'
    ],
    SCREAMS: [
      'I'
    ],
    BIRDS: [
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING',
      'SING'
    ]
  },
  BEAST: {
    GROWLS: [
      'WE',
      'WE'
    ],
    AWAKENED: [
      'THE',
      'THE',
      'THE'
    ]
  },
  GROWLS: {
    WE: [
      'DIVE',
      'DIVE'
    ]
  },
  WE: {
    DIVE: [
      'WE',
      'NO',
      'HEADFIRST'
    ],
    PLUNGE: [
      'WE',
      'NO'
    ],
    IMMERSE: [
      'OURSELVES'
    ],
    FIND: [
      'FREEDOM',
      'FREEDOM',
      'OURSELVES',
      'OUR',
      'OUR',
      'OUR',
      'OURSELVES',
      'OUR',
      'OUR',
      'OUR',
      'OURSELVES',
      'OUR',
      'OUR',
      'OUR',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES',
      'OURSELVES'
    ],
    DANCE: [
      'TO'
    ],
    WRITE: [
      'WE'
    ],
    REBEL: [
      'WE'
    ],
    REJOICE: [
      'IN'
    ],
    LIVE: [
      'IN'
    ],
    DISCOVER: [
      'LIBERTY'
    ],
    UNCOVER: [
      'FREEDOM'
    ],
    COMMAND: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ],
    ASK: [
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING',
      'THROWING'
    ],
    NAVIGATE: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    CODE: [
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING',
      'SETTING'
    ],
    DECLARE: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    ARE: [
      'BOTH',
      'THE',
      'NOT',
      'INVADERS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'INVADERS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'INVADERS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'INVADERS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'SURVIVORS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'SURVIVORS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'SURVIVORS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'BOTH',
      'THE',
      'NOT',
      'SURVIVORS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  DIVE: {
    WE: [
      'PLUNGE'
    ],
    NO: [
      'WELCOME'
    ],
    HEADFIRST: [
      'NO'
    ]
  },
  PLUNGE: {
    WE: [
      'IMMERSE'
    ],
    NO: [
      'INTRODUCTIONS'
    ]
  },
  IMMERSE: {
    OURSELVES: [
      'IN'
    ]
  },
  OURSELVES: {
    IN: [
      'THE'
    ],
    NOT: [
      'JUST',
      'MERELY',
      'JUST'
    ],
    AT: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  ELECTRIC: {
    UNDERBELLY: [
      'THE',
      'WHERE'
    ],
    MAZE: [
      'WHERE'
    ],
    UNDERGROWTH: [
      'WHERE'
    ],
    ETHER: [
      'WHERE'
    ],
    PURGATORY: [
      'WHERE'
    ],
    SONGS: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    TWILIGHT: [
      'IN',
      'WE',
      'IN',
      'WE',
      'IN',
      'WE',
      'IN',
      'WE',
      'IN',
      'IN',
      'WE',
      'IN',
      'WE',
      'IN',
      'WE',
      'IN',
      'WE',
      'IN'
    ],
    DREAMSCAPE: [
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    DIRGES: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    NIGHTMARE: [
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  UNDERBELLY: {
    THE: [
      'CURSOR'
    ],
    WHERE: [
      'THE'
    ]
  },
  CURSOR: {
    BLINKS: [
      'A',
      'LIKE',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK',
      'BACK'
    ],
    PULSES: [
      'LIKE'
    ],
    FLICKERS: [
      'LIKE',
      'LIKE',
      'LIKE'
    ]
  },
  BLINKS: {
    A: [
      'NEON'
    ],
    LIKE: [
      'A'
    ],
    BACK: [
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT'
    ]
  },
  A: {
    NEON: [
      'SIGN',
      'SIGN'
    ],
    FORGOTTEN: [
      'ALLEY',
      'ALLEY'
    ],
    BEACON: [
      'IN'
    ],
    PUNK: [
      'RHYTHM',
      'SYMPHONY',
      'RHYTHM',
      'SYMPHONY',
      'ANTHEM',
      'SYMPHONY',
      'OPERA',
      'ANTHEM',
      'RHYTHM',
      'SYMPHONY',
      'ANTHEM'
    ],
    DUET: [
      'IN',
      'IN',
      'IN'
    ],
    SYMPHONY: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    WALL: [
      'OF',
      'OF'
    ],
    COMMAND: [
      'AN',
      'AN',
      'A',
      'A',
      'A',
      'A',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT',
      'BUT'
    ],
    WORLD: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    LABYRINTH: [
      'OF'
    ],
    BEAST: [
      'AWAKENED',
      'AWAKENED',
      'AWAKENED'
    ],
    CASCADE: [
      'OF'
    ],
    WATERFALL: [
      'OF'
    ],
    RIOT: [
      'OF',
      'OF'
    ],
    MAELSTROM: [
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    SHOUT: [
      'A'
    ],
    WHISPER: [
      'A',
      'A',
      'A',
      'A'
    ],
    SONG: [
      'A',
      'A',
      'A',
      'A'
    ],
    SCREAM: [
      'IN'
    ],
    SOLITARY: [
      'STREETLIGHT'
    ],
    CITY: [
      'THAT'
    ],
    HARMONY: [
      'IN',
      'IN'
    ],
    FORTRESS: [
      'OF'
    ],
    DECLARATION: [
      'OF'
    ],
    UNIVERSE: [
      'OF'
    ],
    LEVIATHAN: [
      'ROUSED'
    ],
    TEMPEST: [
      'OF'
    ],
    REALM: [
      'OF'
    ],
    CONCERT: [
      'OF'
    ],
    ROAR: [
      'A'
    ],
    MURMUR: [
      'A'
    ],
    MELODY: [
      'A'
    ],
    SHRIEK: [
      'IN'
    ],
    LONE: [
      'FIREFLY',
      'EMBER'
    ],
    MOONLESS: [
      'NIGHT'
    ],
    MONOLITH: [
      'OF',
      'OF',
      'OF'
    ],
    PROCLAMATION: [
      'OF'
    ],
    COSMOS: [
      'OF',
      'OF',
      'OF'
    ],
    TITAN: [
      'AWAKENED',
      'AWAKENED'
    ],
    BELLOW: [
      'A',
      'A',
      'A'
    ],
    HOWL: [
      'IN',
      'IN',
      'IN'
    ],
    DISTANT: [
      'LIGHTHOUSE'
    ],
    SEA: [
      'OF'
    ],
    GHOSTLY: [
      'SYMPHONY',
      'SYMPHONY',
      'ANTHEM'
    ],
    CRY: [
      'OF',
      'OF'
    ],
    USER: [
      'IM',
      'BUT',
      'IM',
      'BUT'
    ],
    DIGITAL: [
      'SPECTER',
      'SPECTER',
      'FLOWER',
      'FLOWER',
      'FLOWER',
      'FLOWER',
      'FLOWER',
      'HELL',
      'SOS',
      'HELL',
      'SOS',
      'HELL',
      'SOS',
      'HELL',
      'SOS',
      'HELL',
      'SOS'
    ],
    CREATOR: [
      'NOT',
      'NOT'
    ],
    CODER: [
      'BUT',
      'BUT'
    ],
    POET: [
      'NOT',
      'NOT'
    ],
    CONSUMER: [
      'BUT',
      'BUT'
    ],
    REVOLUTIONARY: [
      'IN',
      'IN'
    ],
    HELLISH: [
      'SYMPHONY',
      'SYMPHONY',
      'ANTHEM'
    ],
    DISCORD: [
      'IN'
    ],
    WEB: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    LINE: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    LIGHTHOUSE: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ],
    RESPONSE: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    SPELL: [
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT',
      'THAT'
    ],
    KALEIDOSCOPE: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ],
    DESPERATE: [
      'WEB',
      'WEB',
      'WEB',
      'WEB',
      'WEB'
    ],
    PRISON: [
      'AS',
      'AS',
      'AS',
      'AS',
      'AS'
    ],
    PRAYER: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  NEON: {
    SIGN: [
      'IN',
      'IN'
    ]
  },
  SIGN: {
    IN: [
      'A',
      'A'
    ]
  },
  FORGOTTEN: {
    ALLEY: [
      'A',
      '10'
    ]
  },
  ALLEY: {
    10: [
      'PRINT'
    ],
    A: [
      'BEACON'
    ]
  },
  BEACON: {
    IN: [
      'THE'
    ]
  },
  DIGITAL: {
    DARKNESS: [
      '10'
    ],
    GRAFFITI: [
      'SPRAYED',
      'SPRAYED'
    ],
    PUNKS: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ],
    AGE: [
      'IN'
    ],
    HIEROGLYPHS: [
      'ETCHED'
    ],
    EPOCH: [
      'IN'
    ],
    WILDERNESS: [
      'OF'
    ],
    FOOTPRINTS: [
      'IMPRINTED'
    ],
    ERA: [
      'IN',
      'IN',
      'IN'
    ],
    ECHOES: [
      'ETCHED'
    ],
    SPECTER: [
      'IN',
      'IN'
    ],
    CRIES: [
      'ETCHED'
    ],
    FLOWER: [
      'UNFURLING',
      'UNFURLING',
      'UNFURLING',
      'UNFURLING',
      'UNFURLING'
    ],
    ETHER: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    JOURNEY: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    FLOWERS: [
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM',
      'BLOOM'
    ],
    HELL: [
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE'
    ],
    SOS: [
      'UNFURLING',
      'UNFURLING',
      'UNFURLING',
      'UNFURLING',
      'UNFURLING'
    ],
    DELIVERANCE: [
      'A',
      'A',
      'A',
      'A'
    ]
  },
  DARKNESS: {
    10: [
      'PRINT',
      'PRINT'
    ]
  },
  PRINT: {
    WORDS: [
      'COMMANDS',
      'COMMANDS',
      'COMMANDS',
      'COMMANDS',
      'COMMANDS',
      'COMMANDS'
    ],
    EXECUTING: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    WELCOME: [
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO',
      'EXPLORER',
      'TO'
    ]
  },
  WORDS: {
    COMMANDS: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ],
    ANSWERS: [
      'MORE',
      'MORE',
      'MORE',
      'MORE',
      'MORE'
    ],
    RESPONSES: [
      'MORE'
    ],
    BLOOM: [
      'ON',
      'ON',
      'ON',
      'ON',
      'ON',
      'ON',
      'ON',
      'ON',
      'ON',
      'ON'
    ]
  },
  COMMANDS: {
    DIGITAL: [
      'GRAFFITI',
      'GRAFFITI',
      'HIEROGLYPHS',
      'FOOTPRINTS',
      'ECHOES',
      'CRIES'
    ]
  },
  GRAFFITI: {
    SPRAYED: [
      'ACROSS',
      'ACROSS'
    ]
  },
  SPRAYED: {
    ACROSS: [
      'THE',
      'THE'
    ]
  },
  ACROSS: {
    THE: [
      'SCREEN',
      'SCREEN'
    ]
  },
  SCREEN: {
    THE: [
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS'
    ],
    FILLS: [
      'WITH',
      'WITH'
    ],
    FLOODS: [
      'WITH'
    ],
    OVERFLOWS: [
      'WITH',
      'WITH',
      'WITH'
    ],
    A: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ]
  },
  KEYS: {
    CLACK: [
      'UNDER',
      'UNDER'
    ],
    CHATTER: [
      'UNDER',
      'UNDER',
      'UNDER',
      'UNDER'
    ],
    WHISPERING: [
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES',
      'TALES'
    ],
    LIKE: [
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS',
      'SPIDERS'
    ]
  },
  CLACK: {
    UNDER: [
      'OUR',
      'OUR'
    ]
  },
  UNDER: {
    OUR: [
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS'
    ],
    MY: [
      'TOUCH',
      'SPECTRAL'
    ]
  },
  OUR: {
    FINGERS: [
      'A',
      'A',
      'A',
      'A',
      'DANCING',
      'DANCING',
      'DANCING',
      'DANCING',
      'DANCING',
      'TREMBLING',
      'TREMBLING',
      'TREMBLING',
      'TREMBLING',
      'TREMBLING'
    ],
    CODE: [
      'GOTO',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ],
    VOICE: [
      'A',
      'A',
      'A'
    ],
    FREEDOM: [
      'OUR',
      'OUR',
      'OUR'
    ],
    REBELLION: [
      'OUR',
      'OUR',
      'OUR'
    ],
    REVOLUTION: [
      'IN',
      'IN',
      'IN'
    ],
    HOME: [
      'IN'
    ],
    SANCTUARY: [
      'IN'
    ],
    REFUGE: [
      'IN'
    ],
    TRUSTY: [
      'VESSEL',
      'VESSEL',
      'VESSEL',
      'VESSEL',
      'VESSEL'
    ],
    QUESTION: [
      'INTO',
      'INTO',
      'INTO',
      'INTO',
      'INTO'
    ],
    WILL: [
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      '30'
    ],
    DIGITAL: [
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'DELIVERANCE',
      'DELIVERANCE',
      'DELIVERANCE',
      'DELIVERANCE'
    ],
    OWN: [
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY',
      'REALITY',
      'DESTINY'
    ],
    ONLY: [
      'LIFELINE',
      'HOPE',
      'LIFELINE',
      'HOPE',
      'LIFELINE',
      'HOPE',
      'LIFELINE',
      'HOPE',
      'LIFELINE',
      'HOPE'
    ],
    PLEA: [
      'INTO',
      'INTO',
      'INTO',
      'INTO',
      'INTO'
    ],
    WILLIN: [
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  FINGERS: {
    A: [
      'PUNK',
      'PUNK',
      'PUNK',
      'PUNK'
    ],
    DANCING: [
      'ON',
      'ON',
      'ON',
      'ON',
      'ON'
    ],
    TREMBLING: [
      'ON',
      'ON',
      'ON',
      'ON',
      'ON'
    ]
  },
  PUNK: {
    RHYTHM: [
      'IN',
      'IN',
      'IN'
    ],
    SYMPHONY: [
      'PLAYS',
      'PLAYS',
      'IN',
      'RESOUNDS'
    ],
    ANTHEM: [
      'FOR',
      'FOR',
      'FOR'
    ],
    OPERA: [
      'UNFOLDS'
    ]
  },
  RHYTHM: {
    IN: [
      'THE',
      'THE',
      'THE'
    ],
    OF: [
      'THE',
      'BINARY',
      'BINARY',
      'BINARY',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  QUIET: {
    ROOM: [
      'THE',
      'THE'
    ]
  },
  ROOM: {
    THE: [
      'MACHINE',
      'MACHINE'
    ]
  },
  MACHINE: {
    HUMS: [
      'BACK',
      'BACK'
    ],
    WAITS: [
      'PATIENT',
      'PATIENT',
      'CALM',
      'SERENE',
      'SERENE',
      'SERENE'
    ],
    ROARS: [
      'TO',
      'TO',
      'INTO'
    ],
    WE: [
      'FIND',
      'WRITE',
      'LIVE',
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'DISCOVER',
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'UNCOVER',
      'FIND',
      'FIND',
      'FIND',
      'FIND'
    ],
    ECHOES: [
      'BACK',
      'BACK',
      'BACK',
      'BACK'
    ],
    SPRINGS: [
      'TO',
      'TO',
      'TO'
    ],
    I: [
      'UNCOVER',
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'UNCOVER',
      'FIND',
      'FIND',
      'FIND',
      'FIND'
    ],
    THE: [
      'SOUL',
      'SOUL',
      'SOUL',
      'SOUL',
      'SOUL',
      'SOUL',
      'SOUL',
      'SOUL'
    ]
  },
  HUMS: {
    BACK: [
      'A',
      'A'
    ],
    WITH: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  BACK: {
    A: [
      'DUET',
      'DUET',
      'HARMONY',
      'DUET',
      'HARMONY',
      'DISCORD'
    ],
    AT: [
      'US',
      'US',
      'US',
      'US',
      'US',
      'US',
      'US',
      'US',
      'US',
      'US'
    ]
  },
  DUET: {
    IN: [
      'SILICON',
      'SILICON',
      'SILICON'
    ]
  },
  AND: {
    SKIN: [
      'A',
      '20'
    ],
    SILENCE: [
      '20'
    ],
    ZEROS: [
      'A',
      '40',
      '40',
      '40',
      '40',
      '40'
    ],
    LUNACY: [
      '40'
    ],
    WHIMSY: [
      'IN'
    ],
    CHAOS: [
      'A',
      'WERE',
      'WERE',
      'IM',
      'IM'
    ],
    MADNESS: [
      'WERE'
    ],
    ELECTRICITY: [
      'A',
      'WHERE',
      'A',
      'A',
      'A'
    ],
    FLESH: [
      '20'
    ],
    PANDEMONIUM: [
      'WERE'
    ],
    CURRENT: [
      'A'
    ],
    CIRCUITRY: [
      'WHERE'
    ],
    SOUL: [
      '20'
    ],
    CIRCUITS: [
      'WHERE'
    ],
    SPIRIT: [
      '20',
      '20'
    ],
    FIRE: [
      'WHERE'
    ],
    IMAGINATION: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    CHANGEABLE: [
      'AS',
      'AS',
      'AS',
      'AS',
      'AS',
      'AS',
      'AS',
      'AS',
      'AS',
      'AS'
    ],
    THE: [
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL',
      'BBC',
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL',
      'BBC',
      'DIGITAL'
    ],
    PROGRAMMED: [
      'CREATOR',
      'CREATOR',
      'CREATOR',
      'CREATOR',
      'CREATOR'
    ],
    CREATED: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    GUIDE: [
      'NAVIGATING',
      'NAVIGATING',
      'NAVIGATING',
      'NAVIGATING',
      'IN'
    ],
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ],
    FEAR: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    JAILER: [
      'VICTIM',
      'VICTIM',
      'VICTIM',
      'VICTIM'
    ],
    VILLAIN: [
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    CAPTIVE: [
      'NAVIGATING',
      'NAVIGATING',
      'NAVIGATING',
      'NAVIGATING'
    ]
  },
  SKIN: {
    20: [
      'INPUT'
    ],
    A: [
      'SYMPHONY'
    ]
  },
  SYMPHONY: {
    OF: [
      'SOUND',
      'SILICON',
      'SILICON',
      'SILICON',
      'SILICON'
    ],
    PLAYS: [
      'A',
      'A'
    ],
    IN: [
      'THE',
      'THE',
      'THE'
    ],
    RESOUNDS: [
      'A',
      'A',
      'A'
    ]
  },
  SOUND: {
    AND: [
      'SILENCE'
    ],
    OF: [
      'OUR'
    ]
  },
  SILENCE: {
    20: [
      'INPUT'
    ],
    WITH: [
      'THE'
    ]
  },
  INPUT: {
    WERE: [
      'ASKING',
      'ASKING',
      'QUESTIONING',
      'INTERROGATING'
    ],
    IM: [
      'QUESTIONING',
      'QUESTIONING'
    ],
    WHAT: [
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS'
    ]
  },
  WERE: {
    ASKING: [
      'DEMANDING',
      'DEMANDING'
    ],
    NOT: [
      'ASKING',
      'JUST',
      'ASKING',
      'JUST',
      'JUST',
      'JUST',
      'SEEKING',
      'JUST',
      'JUST',
      'JUST',
      'SEEKING',
      'JUST',
      'JUST',
      'JUST'
    ],
    TAKING: [
      'CONTROL',
      'CONTROL'
    ],
    SEIZING: [
      'THE',
      'POWER'
    ],
    INVADERS: [
      'EXPLORERS',
      'EXPLORERS'
    ],
    HERE: [
      'IN'
    ],
    CREATING: [
      'DESTROYING'
    ],
    MAKING: [
      'MUSIC'
    ],
    IN: [
      'IN'
    ],
    QUESTIONING: [
      'PROVOKING'
    ],
    INSURGENTS: [
      'PIONEERS'
    ],
    CRAFTING: [
      'DEMOLISHING'
    ],
    ORCHESTRATING: [
      'MUSIC'
    ],
    THERE: [
      'IN'
    ],
    INTERROGATING: [
      'CHALLENGING'
    ],
    CLAIMING: [
      'AUTHORITY'
    ],
    INTRUDERS: [
      'EXPLORERS'
    ],
    INVENTING: [
      'ANNIHILATING'
    ],
    COMPOSING: [
      'MUSIC'
    ]
  },
  ASKING: {
    DEMANDING: [
      'SHOUTING',
      'SHOUTING'
    ],
    FOR: [
      'PERMISSION',
      'PERMISSION'
    ]
  },
  DEMANDING: {
    SHOUTING: [
      'INTO',
      'INTO'
    ]
  },
  SHOUTING: {
    INTO: [
      'THE',
      'THE'
    ]
  },
  INTO: {
    THE: [
      'VOID',
      'VOID',
      'ABYSS',
      'VOID',
      'ABYSS',
      'ABYSS',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING',
      'ECHOING'
    ],
    ACTION: [
      'A'
    ]
  },
  VOID: {
    THE: [
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE'
    ],
    OF: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  WAITS: {
    PATIENT: [
      'INDIFFERENT',
      'INDIFFERENT'
    ],
    CALM: [
      'DETACHED'
    ],
    SERENE: [
      'DETACHED',
      'DETACHED',
      'DETACHED'
    ]
  },
  PATIENT: {
    INDIFFERENT: [
      'A',
      'A'
    ]
  },
  INDIFFERENT: {
    A: [
      'WALL',
      'WALL'
    ]
  },
  WALL: {
    OF: [
      'BLACK',
      'BLACK'
    ]
  },
  BLACK: {
    PIXELS: [
      'DARING',
      'DARING',
      'CHALLENGING',
      'DARING',
      'CHALLENGING',
      'DARING',
      'WAITING',
      'WAITING',
      'WAITING',
      'WAITING',
      'WAITING',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  PIXELS: {
    DARING: [
      'US',
      'US',
      'US',
      'ME'
    ],
    CHALLENGING: [
      'US',
      'ME'
    ],
    ITS: [
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS'
    ],
    WAITING: [
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR'
    ],
    OUR: [
      'ONLY',
      'ONLY',
      'ONLY',
      'ONLY',
      'ONLY'
    ]
  },
  DARING: {
    US: [
      'TO',
      'TO',
      'TO'
    ],
    ME: [
      'TO'
    ]
  },
  US: {
    TO: [
      'BREAK',
      'BREAK',
      'SCALE',
      'DECIPHER'
    ],
    A: [
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE',
      'LIGHTHOUSE'
    ]
  },
  TO: {
    BREAK: [
      'IT',
      'IT'
    ],
    SHATTER: [
      'THE'
    ],
    LIFE: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    THE: [
      'SONG',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE',
      'PIXELVERSE'
    ],
    SCALE: [
      'ITS'
    ],
    DECIPHER: [
      'ITS',
      'ITS',
      'ITS'
    ],
    OUR: [
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILLIN',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILLIN',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILLIN',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILL',
      'WILLIN',
      'WILL'
    ],
    DREAM: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    EXPLORE: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    CREATE: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    IMAGINE: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    INVENT: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    PUSH: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    CHALLENGE: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    DEFY: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    BEND: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    EXPLOREIN: [
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  BREAK: {
    IT: [
      'DOWN',
      'DOWN'
    ]
  },
  IT: {
    DOWN: [
      'TO',
      'GOTO'
    ]
  },
  DOWN: {
    TO: [
      'SHATTER'
    ],
    GOTO: [
      'NOT'
    ]
  },
  SHATTER: {
    THE: [
      'SILENCE'
    ]
  },
  WITH: {
    THE: [
      'SOUND',
      'RHYTHM',
      'HEARTBEAT',
      'RHYTHM',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE',
      'RHYTHM',
      'PROMISE'
    ],
    WORDS: [
      'ANSWERS',
      'ANSWERS',
      'RESPONSES',
      'ANSWERS',
      'ANSWERS',
      'ANSWERS'
    ]
  },
  CODE: {
    20: [
      'INPUT',
      'INPUT',
      'INPUT',
      'INPUT',
      'INPUT'
    ],
    GOTO: [
      'NOT'
    ],
    AND: [
      'CHAOS',
      'CHAOS',
      'PANDEMONIUM',
      'CHAOS',
      'CHAOS',
      'CHAOS',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    BEAUTY: [
      'IN'
    ],
    WERE: [
      'NOT',
      'NOT',
      'NOT'
    ],
    IM: [
      'NOT',
      'NOT'
    ],
    THE: [
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS',
      'WORDS'
    ],
    SETTING: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    YET: [
      'AS',
      'AS',
      'AS',
      'AS',
      'AS'
    ]
  },
  GOTO: {
    40: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    NOT: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    IS: [
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT',
      'NOT'
    ]
  },
  NOT: {
    A: [
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND',
      'COMMAND'
    ],
    ASKING: [
      'FOR',
      'FOR'
    ],
    JUST: [
      'USERS',
      'USERS',
      'CODING',
      'MAKING',
      'USERS',
      'CODERS',
      'CONSUMERS',
      'OPERATORS',
      'CODING',
      'GENERATING',
      'USERS',
      'CODING',
      'MAKING',
      'USERS',
      'CODERS',
      'CONSUMERS',
      'A',
      'CODING',
      'MAKING',
      'A',
      'A',
      'A',
      'A',
      'CODING',
      'MAKING',
      'A',
      'A',
      'A',
      'USERS',
      'USERS',
      'USERS',
      'USERS',
      'USERS',
      'USERS',
      'USERS',
      'USERS'
    ],
    SEEKING: [
      'APPROVAL',
      'CONSENT',
      'CONSENT',
      'CONSENT'
    ],
    MERELY: [
      'OPERATORS',
      'CODERS',
      'CONSUMERS'
    ]
  },
  COMMAND: {
    AN: [
      'ACT',
      'ACT'
    ],
    A: [
      'DECLARATION',
      'PROCLAMATION',
      'CRY',
      'CRY'
    ],
    OUR: [
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS',
      'FINGERS'
    ],
    BUT: [
      'AN',
      'AN',
      'AN',
      'AN',
      'AN',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  AN: {
    ACT: [
      'OF',
      'OF'
    ],
    INTRUDER: [
      'AN',
      'AN'
    ],
    EXPLORER: [
      'A',
      'A'
    ],
    ETERNAL: [
      'NIGHT',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC'
    ],
    INCANTATION: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  ACT: {
    OF: [
      'REBELLION',
      'REBELLION'
    ]
  },
  REBELLION: {
    WERE: [
      'NOT',
      'NOT',
      'NOT'
    ],
    OUR: [
      'REVOLUTION',
      'REVOLUTION',
      'REVOLUTION'
    ],
    MY: [
      'REVOLUTION',
      'REVOLUTION'
    ]
  },
  FOR: {
    PERMISSION: [
      'WERE',
      'WERE'
    ],
    THE: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ],
    A: [
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE',
      'RESPONSE'
    ],
    OUR: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ]
  },
  PERMISSION: {
    WERE: [
      'TAKING',
      'TAKING'
    ]
  },
  TAKING: {
    CONTROL: [
      'WERE',
      '30'
    ]
  },
  CONTROL: {
    30: [
      'IF'
    ],
    WERE: [
      'SEIZING'
    ],
    IN: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  SEIZING: {
    THE: [
      'REINS'
    ],
    POWER: [
      '30'
    ]
  },
  REINS: {
    30: [
      'IF'
    ]
  },
  IF: {
    IF: [
      'THEN',
      'THEN',
      'THEN',
      'THEN',
      'THEN',
      'THEN'
    ],
    THEN: [
      'ELSE',
      'ELSE',
      'ELSE',
      'ELSE',
      'ELSE',
      'ELSE'
    ],
    DESIREEXPLORE: [
      'THEN',
      'THEN',
      'THEN',
      'THEN',
      'THEN'
    ],
    DESIREESCAPE: [
      'THEN',
      'THEN',
      'THEN',
      'THEN',
      'THEN'
    ]
  },
  THEN: {
    ELSE: [
      'CHOICES',
      'CHOICES',
      'DECISIONS',
      'CHOICES',
      'CHOICES',
      'CHOICES'
    ],
    GOTO: [
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40',
      '40'
    ]
  },
  ELSE: {
    CHOICES: [
      'CONSEQUENCES',
      'CONSEQUENCES',
      'REPERCUSSIONS',
      'REPERCUSSIONS',
      'REPERCUSSIONS'
    ],
    DECISIONS: [
      'OUTCOMES'
    ]
  },
  CHOICES: {
    CONSEQUENCES: [
      'THE',
      'THE'
    ],
    REPERCUSSIONS: [
      'THE',
      'THE',
      'THE'
    ]
  },
  CONSEQUENCES: {
    THE: [
      'ILLUSION',
      'ILLUSION'
    ]
  },
  ILLUSION: {
    OF: [
      'CONTROL',
      'CONTROL',
      'CONTROL',
      'CONTROL',
      'CONTROL'
    ]
  },
  WORLD: {
    OF: [
      'ONES',
      'RIGID',
      'ONES',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID',
      'RIGID'
    ]
  },
  ONES: {
    AND: [
      'ZEROS',
      'ZEROS',
      'ZEROS',
      'ZEROS',
      'ZEROS',
      'ZEROS'
    ],
    WHO: [
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE',
      'DARE'
    ]
  },
  ZEROS: {
    40: [
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT'
    ],
    A: [
      'LABYRINTH'
    ]
  },
  LABYRINTH: {
    OF: [
      'LOGIC',
      'SILICON',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  LOGIC: {
    AND: [
      'LUNACY',
      'IMAGINATION',
      'IMAGINATION',
      'IMAGINATION',
      'IMAGINATION',
      'IMAGINATION',
      'FEAR',
      'FEAR',
      'FEAR',
      'FEAR',
      'FEAR'
    ],
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    WE: [
      'PLUNGE',
      'DIVE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  LUNACY: {
    40: [
      'PRINT'
    ]
  },
  EXECUTING: {
    THE: [
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE',
      'MACHINE'
    ]
  },
  ROARS: {
    TO: [
      'LIFE',
      'LIFE'
    ],
    INTO: [
      'ACTION'
    ]
  },
  LIFE: {
    A: [
      'BEAST',
      'BEAST',
      'TITAN',
      'TITAN',
      'BEAST'
    ]
  },
  AWAKENED: {
    THE: [
      'SCREEN',
      'SCREEN',
      'SCREEN',
      'SCREEN',
      'SCREEN'
    ]
  },
  FILLS: {
    WITH: [
      'WORDS',
      'WORDS'
    ]
  },
  ANSWERS: {
    MORE: [
      'QUESTIONS',
      'QUESTIONS',
      'ENIGMAS',
      'ENIGMAS',
      'ENIGMAS'
    ]
  },
  MORE: {
    QUESTIONS: [
      'A',
      'IN'
    ],
    RIDDLES: [
      'IN'
    ],
    ENIGMAS: [
      'IN',
      'IN',
      'IN'
    ]
  },
  QUESTIONS: {
    A: [
      'CASCADE'
    ],
    IN: [
      'THE'
    ]
  },
  CASCADE: {
    OF: [
      'CHARACTERS'
    ]
  },
  CHARACTERS: {
    A: [
      'WATERFALL'
    ]
  },
  WATERFALL: {
    OF: [
      'WISDOM'
    ]
  },
  WISDOM: {
    AND: [
      'WHIMSY'
    ]
  },
  WHIMSY: {
    IN: [
      'THE'
    ]
  },
  HEART: {
    OF: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    BEATING: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ]
  },
  PLAYS: {
    A: [
      'RIOT',
      'RIOT'
    ]
  },
  RIOT: {
    OF: [
      'CODE',
      'CODE'
    ]
  },
  CHAOS: {
    A: [
      'MAELSTROM'
    ],
    POETRY: [
      'IN',
      'IN'
    ],
    WERE: [
      'NOT',
      'NOT'
    ],
    IM: [
      'NOT',
      'NOT'
    ]
  },
  MAELSTROM: {
    OF: [
      'MEANING',
      'CODE',
      'CODE',
      'CODE'
    ]
  },
  MEANING: {
    AND: [
      'MADNESS'
    ]
  },
  MADNESS: {
    WERE: [
      'NOT'
    ]
  },
  JUST: {
    USERS: [
      'WERE',
      'WERE',
      'BUT',
      'WERE',
      'BUT',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ],
    CODING: [
      'WERE',
      'WERE',
      'WERE',
      'IM',
      'IM'
    ],
    MAKING: [
      'NOISE',
      'NOISE',
      'NOISE',
      'NOISE'
    ],
    CODERS: [
      'BUT',
      'BUT'
    ],
    CONSUMERS: [
      'BUT',
      'BUT'
    ],
    OPERATORS: [
      'WERE'
    ],
    GENERATING: [
      'NOISE'
    ],
    A: [
      'USER',
      'USER',
      'CODER',
      'CONSUMER',
      'USER',
      'USER',
      'CODER',
      'CONSUMER'
    ]
  },
  USERS: {
    WERE: [
      'INVADERS',
      'INVADERS',
      'INTRUDERS'
    ],
    BUT: [
      'CREATORS',
      'CREATORS'
    ],
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  INVADERS: {
    EXPLORERS: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ]
  },
  EXPLORERS: {
    DIGITAL: [
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS',
      'PUNKS'
    ]
  },
  PUNKS: {
    IN: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  RIGID: {
    LOGIC: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ]
  },
  FIND: {
    FREEDOM: [
      'IN',
      'IN'
    ],
    OURSELVES: [
      'NOT',
      'NOT',
      'NOT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT',
      'AT'
    ],
    OUR: [
      'VOICE',
      'FREEDOM',
      'HOME',
      'VOICE',
      'FREEDOM',
      'SANCTUARY',
      'VOICE',
      'FREEDOM',
      'REFUGE'
    ],
    MYSELF: [
      'NOT',
      'NOT'
    ],
    MY: [
      'VOICE',
      'FREEDOM',
      'ESCAPE',
      'VOICE',
      'FREEDOM',
      'ESCAPE'
    ]
  },
  FREEDOM: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    OUR: [
      'REBELLION',
      'REBELLION',
      'REBELLION'
    ],
    MY: [
      'REBELLION',
      'REBELLION'
    ]
  },
  POETRY: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  BEAUTY: {
    IN: [
      'THE'
    ]
  },
  DANCE: {
    TO: [
      'THE'
    ]
  },
  SONG: {
    OF: [
      'THE'
    ],
    A: [
      'SCREAM',
      'HOWL',
      'HOWL',
      'HOWL'
    ]
  },
  RAM: {
    THE: [
      'BEAT'
    ]
  },
  BEAT: {
    OF: [
      'THE'
    ]
  },
  WRITE: {
    WE: [
      'REBEL'
    ]
  },
  REBEL: {
    WE: [
      'REJOICE'
    ]
  },
  REJOICE: {
    IN: [
      'THE'
    ]
  },
  LIVE: {
    IN: [
      'THE'
    ]
  },
  GUTS: {
    OF: [
      'THE'
    ]
  },
  NO: {
    WELCOME: [
      'MAT'
    ],
    POLITE: [
      'KNOCK'
    ],
    INTRODUCTIONS: [
      'NO',
      'NO'
    ],
    FORMALITIES: [
      'WERE',
      'WERE',
      'IM',
      'IM'
    ],
    GREETINGS: [
      'NO',
      'NO'
    ]
  },
  WELCOME: {
    MAT: [
      'NO'
    ],
    TO: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    EXPLORER: [
      'LET',
      'LET',
      'LET',
      'LET',
      'LET',
      'LET',
      'LET',
      'LET',
      'LET'
    ]
  },
  MAT: {
    NO: [
      'POLITE'
    ]
  },
  POLITE: {
    KNOCK: [
      'ON'
    ]
  },
  KNOCK: {
    ON: [
      'THE'
    ]
  },
  ON: {
    THE: [
      'DOOR',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN',
      'KEYS',
      'SCREEN'
    ]
  },
  DOOR: {
    WERE: [
      'HERE'
    ]
  },
  HERE: {
    IN: [
      'THE',
      'THE',
      'THE'
    ]
  },
  LIKE: {
    A: [
      'NEON',
      'SOLITARY',
      'LONE',
      'DISTANT',
      'LONE'
    ],
    SPIDERS: [
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING',
      'SPINNING'
    ]
  },
  CODING: {
    WERE: [
      'CREATING',
      'CRAFTING',
      'INVENTING'
    ],
    IM: [
      'INVENTING',
      'INVENTING'
    ]
  },
  CREATING: {
    DESTROYING: [
      'REBUILDING'
    ]
  },
  DESTROYING: {
    REBUILDING: [
      'WERE'
    ]
  },
  REBUILDING: {
    WERE: [
      'NOT'
    ]
  },
  MAKING: {
    NOISE: [
      'WERE',
      'WERE',
      'IM',
      'IM'
    ],
    MUSIC: [
      'A'
    ]
  },
  NOISE: {
    WERE: [
      'MAKING',
      'ORCHESTRATING',
      'COMPOSING'
    ],
    IM: [
      'COMPOSING',
      'COMPOSING'
    ]
  },
  MUSIC: {
    A: [
      'SYMPHONY',
      'CONCERT',
      'SYMPHONY',
      'SYMPHONY',
      'SYMPHONY'
    ],
    MAKERS: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ]
  },
  ELECTRICITY: {
    A: [
      'PUNK',
      'PUNK',
      'GHOSTLY',
      'HELLISH'
    ],
    WHERE: [
      'THE'
    ]
  },
  ANTHEM: {
    FOR: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  AGE: {
    IN: [
      'THE'
    ]
  },
  BUT: {
    CREATORS: [
      'NOT',
      'NOT',
      'NOT'
    ],
    POETS: [
      'NOT',
      'NOT',
      'NOT'
    ],
    REVOLUTIONARIES: [
      'IN',
      'IN',
      'IN'
    ],
    A: [
      'CREATOR',
      'POET',
      'REVOLUTIONARY',
      'CREATOR',
      'POET',
      'REVOLUTIONARY',
      'PRAYER',
      'PRAYER',
      'PRAYER',
      'PRAYER',
      'PRAYER'
    ],
    AN: [
      'INCANTATION',
      'INCANTATION',
      'INCANTATION',
      'INCANTATION',
      'INCANTATION'
    ]
  },
  CREATORS: {
    NOT: [
      'JUST',
      'MERELY',
      'JUST'
    ],
    THE: [
      'DREAMERS',
      'DREAMERS',
      'DREAMERS',
      'DREAMERS',
      'DREAMERS',
      'DREAMERS',
      'DREAMERS',
      'DREAMERS'
    ]
  },
  CODERS: {
    BUT: [
      'POETS',
      'POETS',
      'POETS'
    ],
    THE: [
      'CREATORS',
      'CREATORS',
      'CREATORS',
      'CREATORS',
      'CREATORS',
      'CREATORS',
      'CREATORS',
      'CREATORS'
    ]
  },
  POETS: {
    NOT: [
      'JUST',
      'MERELY',
      'JUST'
    ]
  },
  CONSUMERS: {
    BUT: [
      'REVOLUTIONARIES',
      'REVOLUTIONARIES',
      'REVOLUTIONARIES'
    ]
  },
  REVOLUTIONARIES: {
    IN: [
      'THE',
      'THE',
      'THE'
    ]
  },
  VOICE: {
    A: [
      'SHOUT',
      'ROAR',
      'BELLOW',
      'BELLOW',
      'BELLOW'
    ]
  },
  SHOUT: {
    A: [
      'WHISPER'
    ]
  },
  WHISPER: {
    A: [
      'SONG',
      'SONG',
      'SONG',
      'SONG'
    ]
  },
  SCREAM: {
    IN: [
      'THE'
    ]
  },
  REVOLUTION: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  HOME: {
    IN: [
      'THE'
    ]
  },
  INTRODUCTIONS: {
    NO: [
      'FORMALITIES',
      'FORMALITIES'
    ]
  },
  FORMALITIES: {
    WERE: [
      'IN',
      'THERE'
    ],
    IM: [
      'HERE',
      'HERE'
    ]
  },
  MAZE: {
    WHERE: [
      'THE'
    ],
    OF: [
      'SILICON',
      'SILICON'
    ]
  },
  PULSES: {
    LIKE: [
      'A'
    ],
    WITH: [
      'THE'
    ]
  },
  SOLITARY: {
    STREETLIGHT: [
      'IN'
    ]
  },
  STREETLIGHT: {
    IN: [
      'A'
    ]
  },
  CITY: {
    THAT: [
      'NEVER'
    ],
    WHERE: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    A: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ]
  },
  THAT: {
    NEVER: [
      'SLEEPS'
    ],
    BENDS: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    MIGHT: [
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND'
    ]
  },
  NEVER: {
    SLEEPS: [
      '10'
    ]
  },
  SLEEPS: {
    10: [
      'PRINT'
    ]
  },
  HIEROGLYPHS: {
    ETCHED: [
      'ONTO'
    ]
  },
  ETCHED: {
    ONTO: [
      'THE',
      'THE',
      'THE'
    ]
  },
  ONTO: {
    THE: [
      'SCREEN',
      'SCREEN',
      'SCREEN',
      'SCREEN'
    ]
  },
  CHATTER: {
    UNDER: [
      'OUR',
      'OUR',
      'MY',
      'MY'
    ]
  },
  SILENT: {
    CHAMBER: [
      'THE'
    ],
    VOID: [
      'THE',
      'THE',
      'THE'
    ]
  },
  CHAMBER: {
    THE: [
      'MACHINE'
    ]
  },
  ECHOES: {
    BACK: [
      'A',
      'A',
      'A',
      'A'
    ],
    WITH: [
      'THE'
    ],
    ETCHED: [
      'ONTO'
    ]
  },
  HARMONY: {
    IN: [
      'SILICON',
      'SILICON'
    ]
  },
  FLESH: {
    20: [
      'INPUT'
    ]
  },
  QUESTIONING: {
    PROVOKING: [
      'SCREAMING'
    ],
    CHALLENGING: [
      'SCREAMING',
      'SCREAMING'
    ]
  },
  PROVOKING: {
    SCREAMING: [
      'INTO'
    ]
  },
  SCREAMING: {
    INTO: [
      'THE',
      'THE',
      'THE'
    ]
  },
  ABYSS: {
    THE: [
      'MACHINE',
      'MACHINE',
      'MACHINE'
    ]
  },
  CALM: {
    DETACHED: [
      'A'
    ]
  },
  DETACHED: {
    A: [
      'FORTRESS',
      'MONOLITH',
      'MONOLITH',
      'MONOLITH'
    ]
  },
  FORTRESS: {
    OF: [
      'BLACK'
    ]
  },
  CHALLENGING: {
    US: [
      'TO'
    ],
    HOLLERING: [
      'INTO'
    ],
    SCREAMING: [
      'INTO',
      'INTO'
    ],
    ME: [
      'TO'
    ]
  },
  SCALE: {
    ITS: [
      'WALLS'
    ]
  },
  ITS: {
    WALLS: [
      'GOTO'
    ],
    SECRETS: [
      'GOTO',
      'GOTO',
      'GOTO'
    ],
    KEYS: [
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING',
      'WHISPERING'
    ],
    PETALS: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ],
    ELECTRONIC: [
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART',
      'HEART'
    ]
  },
  WALLS: {
    GOTO: [
      'NOT'
    ]
  },
  DECLARATION: {
    OF: [
      'DEFIANCE'
    ]
  },
  DEFIANCE: {
    WERE: [
      'NOT'
    ],
    IM: [
      'NOT',
      'NOT'
    ]
  },
  SEEKING: {
    APPROVAL: [
      'WERE'
    ],
    CONSENT: [
      'WERE',
      'IM',
      'IM'
    ]
  },
  APPROVAL: {
    WERE: [
      'SEIZING'
    ]
  },
  POWER: {
    30: [
      'IF'
    ]
  },
  DECISIONS: {
    OUTCOMES: [
      'THE'
    ]
  },
  OUTCOMES: {
    THE: [
      'MIRAGE'
    ]
  },
  MIRAGE: {
    OF: [
      'CONTROL'
    ]
  },
  UNIVERSE: {
    OF: [
      'ONES'
    ]
  },
  ACTION: {
    A: [
      'LEVIATHAN'
    ]
  },
  LEVIATHAN: {
    ROUSED: [
      'THE'
    ]
  },
  ROUSED: {
    THE: [
      'SCREEN'
    ]
  },
  FLOODS: {
    WITH: [
      'WORDS'
    ]
  },
  RESPONSES: {
    MORE: [
      'RIDDLES'
    ]
  },
  RIDDLES: {
    IN: [
      'THE'
    ]
  },
  CORE: {
    OF: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  OPERA: {
    UNFOLDS: [
      'A'
    ]
  },
  UNFOLDS: {
    A: [
      'TEMPEST'
    ]
  },
  TEMPEST: {
    OF: [
      'CODE'
    ]
  },
  PANDEMONIUM: {
    WERE: [
      'NOT'
    ]
  },
  OPERATORS: {
    WERE: [
      'INSURGENTS'
    ],
    BUT: [
      'CREATORS'
    ]
  },
  INSURGENTS: {
    PIONEERS: [
      'DIGITAL'
    ]
  },
  PIONEERS: {
    DIGITAL: [
      'PUNKS'
    ]
  },
  REALM: {
    OF: [
      'UNYIELDING'
    ],
    WHERE: [
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO'
    ]
  },
  UNYIELDING: {
    LOGIC: [
      'IN'
    ],
    AS: [
      'IRON',
      'IRON',
      'IRON',
      'IRON',
      'IRON'
    ]
  },
  DISCOVER: {
    LIBERTY: [
      'IN'
    ]
  },
  LIBERTY: {
    IN: [
      'THE'
    ]
  },
  TURMOIL: {
    VERSE: [
      'IN'
    ]
  },
  VERSE: {
    IN: [
      'THE'
    ]
  },
  CRAFTING: {
    DEMOLISHING: [
      'RECONSTRUCTING'
    ]
  },
  DEMOLISHING: {
    RECONSTRUCTING: [
      'WERE'
    ]
  },
  RECONSTRUCTING: {
    WERE: [
      'NOT',
      'NOT'
    ],
    IM: [
      'NOT',
      'NOT'
    ]
  },
  GENERATING: {
    NOISE: [
      'WERE'
    ]
  },
  ORCHESTRATING: {
    MUSIC: [
      'A'
    ]
  },
  CONCERT: {
    OF: [
      'SILICON'
    ]
  },
  CURRENT: {
    A: [
      'PUNK'
    ]
  },
  EPOCH: {
    IN: [
      'THE'
    ]
  },
  MERELY: {
    OPERATORS: [
      'BUT'
    ],
    CODERS: [
      'BUT'
    ],
    CONSUMERS: [
      'BUT'
    ]
  },
  ROAR: {
    A: [
      'MURMUR'
    ]
  },
  MURMUR: {
    A: [
      'MELODY'
    ]
  },
  MELODY: {
    A: [
      'SHRIEK'
    ]
  },
  SHRIEK: {
    IN: [
      'THE'
    ]
  },
  SANCTUARY: {
    IN: [
      'THE'
    ]
  },
  WILDERNESS: {
    OF: [
      'SILICON'
    ]
  },
  CIRCUITRY: {
    WHERE: [
      'THE'
    ]
  },
  HEARTBEAT: {
    OF: [
      'BINARY'
    ]
  },
  HEADFIRST: {
    NO: [
      'GREETINGS'
    ]
  },
  GREETINGS: {
    NO: [
      'FORMALITIES',
      'FORMALITIES'
    ]
  },
  THERE: {
    IN: [
      'THE'
    ]
  },
  UNDERGROWTH: {
    WHERE: [
      'THE'
    ]
  },
  FLICKERS: {
    LIKE: [
      'A',
      'A',
      'A'
    ]
  },
  LONE: {
    FIREFLY: [
      'IN'
    ],
    EMBER: [
      'IN'
    ]
  },
  FIREFLY: {
    IN: [
      'A'
    ]
  },
  MOONLESS: {
    NIGHT: [
      '10'
    ]
  },
  NIGHT: {
    10: [
      'PRINT',
      'PRINT'
    ]
  },
  FOOTPRINTS: {
    IMPRINTED: [
      'ONTO'
    ]
  },
  IMPRINTED: {
    ONTO: [
      'THE'
    ]
  },
  SOUL: {
    20: [
      'INPUT'
    ],
    OF: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  INTERROGATING: {
    CHALLENGING: [
      'HOLLERING'
    ]
  },
  HOLLERING: {
    INTO: [
      'THE'
    ]
  },
  SERENE: {
    DETACHED: [
      'A',
      'A',
      'A'
    ]
  },
  MONOLITH: {
    OF: [
      'BLACK',
      'BLACK',
      'BLACK'
    ]
  },
  DECIPHER: {
    ITS: [
      'SECRETS',
      'SECRETS',
      'SECRETS'
    ]
  },
  SECRETS: {
    GOTO: [
      'NOT',
      'NOT',
      'NOT'
    ]
  },
  PROCLAMATION: {
    OF: [
      'REBELLION'
    ]
  },
  CONSENT: {
    WERE: [
      'CLAIMING'
    ],
    IM: [
      'CLAIMING',
      'CLAIMING'
    ]
  },
  CLAIMING: {
    AUTHORITY: [
      '30',
      '30',
      '30'
    ]
  },
  AUTHORITY: {
    30: [
      'IF',
      'IF',
      'IF'
    ]
  },
  REPERCUSSIONS: {
    THE: [
      'ILLUSION',
      'ILLUSION',
      'ILLUSION'
    ]
  },
  COSMOS: {
    OF: [
      'ONES',
      'ONES',
      'ONES'
    ]
  },
  SPRINGS: {
    TO: [
      'LIFE',
      'LIFE',
      'LIFE'
    ]
  },
  TITAN: {
    AWAKENED: [
      'THE',
      'THE'
    ]
  },
  OVERFLOWS: {
    WITH: [
      'WORDS',
      'WORDS',
      'WORDS'
    ]
  },
  ENIGMAS: {
    IN: [
      'THE',
      'THE',
      'THE'
    ]
  },
  RESOUNDS: {
    A: [
      'MAELSTROM',
      'MAELSTROM',
      'MAELSTROM'
    ]
  },
  INTRUDERS: {
    EXPLORERS: [
      'DIGITAL'
    ]
  },
  UNCOVER: {
    FREEDOM: [
      'IN',
      'IN',
      'IN'
    ]
  },
  DISORDER: {
    POETRY: [
      'IN',
      'IN',
      'IN'
    ]
  },
  INVENTING: {
    ANNIHILATING: [
      'RECONSTRUCTING',
      'RECONSTRUCTING',
      'RECONSTRUCTING'
    ]
  },
  ANNIHILATING: {
    RECONSTRUCTING: [
      'WERE',
      'IM',
      'IM'
    ]
  },
  COMPOSING: {
    MUSIC: [
      'A',
      'A',
      'A'
    ]
  },
  ERA: {
    IN: [
      'THE',
      'THE',
      'THE'
    ]
  },
  BELLOW: {
    A: [
      'WHISPER',
      'WHISPER',
      'WHISPER'
    ]
  },
  HOWL: {
    IN: [
      'THE',
      'THE',
      'THE'
    ]
  },
  REFUGE: {
    IN: [
      'THE'
    ]
  },
  SPECTRAL: {
    MAZE: [
      'OF'
    ],
    TOUCH: [
      'A'
    ]
  },
  CIRCUITS: {
    WHERE: [
      'THE'
    ]
  },
  PHANTOM: {
    OF: [
      'THE'
    ]
  },
  WHISPERS: {
    I: [
      'DRIFT'
    ]
  },
  I: {
    DRIFT: [
      'NO',
      'NO'
    ],
    UNCOVER: [
      'FREEDOM',
      'FREEDOM'
    ],
    FIND: [
      'MYSELF',
      'MY',
      'MY',
      'MY',
      'MYSELF',
      'MY',
      'MY',
      'MY'
    ]
  },
  DRIFT: {
    NO: [
      'INTRODUCTIONS',
      'GREETINGS'
    ]
  },
  IM: {
    HERE: [
      'IN',
      'IN'
    ],
    QUESTIONING: [
      'CHALLENGING',
      'CHALLENGING'
    ],
    NOT: [
      'SEEKING',
      'JUST',
      'JUST',
      'JUST',
      'SEEKING',
      'JUST',
      'JUST',
      'JUST'
    ],
    CLAIMING: [
      'AUTHORITY',
      'AUTHORITY'
    ],
    AN: [
      'INTRUDER',
      'INTRUDER'
    ],
    INVENTING: [
      'ANNIHILATING',
      'ANNIHILATING'
    ],
    COMPOSING: [
      'MUSIC',
      'MUSIC'
    ]
  },
  ETHER: {
    WHERE: [
      'THE'
    ],
    THE: [
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR',
      'CURSOR'
    ]
  },
  DISTANT: {
    LIGHTHOUSE: [
      'IN'
    ]
  },
  LIGHTHOUSE: {
    IN: [
      'A',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  SEA: {
    OF: [
      'DARKNESS',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK',
      'BLACK'
    ]
  },
  MY: {
    TOUCH: [
      'A'
    ],
    VOICE: [
      'A',
      'A'
    ],
    FREEDOM: [
      'MY',
      'MY'
    ],
    REBELLION: [
      'MY',
      'MY'
    ],
    REVOLUTION: [
      'IN',
      'IN'
    ],
    ESCAPE: [
      'IN',
      'FROM'
    ],
    SPECTRAL: [
      'TOUCH'
    ]
  },
  TOUCH: {
    A: [
      'GHOSTLY',
      'HELLISH'
    ]
  },
  GHOSTLY: {
    SYMPHONY: [
      'IN',
      'RESOUNDS'
    ],
    ANTHEM: [
      'FOR'
    ]
  },
  SPIRIT: {
    20: [
      'INPUT',
      'INPUT'
    ]
  },
  ME: {
    TO: [
      'DECIPHER',
      'DECIPHER'
    ]
  },
  CRY: {
    OF: [
      'DEFIANCE',
      'DEFIANCE'
    ]
  },
  USER: {
    IM: [
      'AN',
      'AN'
    ],
    BUT: [
      'A',
      'A'
    ],
    AND: [
      'GUIDE',
      'GUIDE',
      'GUIDE',
      'GUIDE',
      'GUIDE',
      'CAPTIVE',
      'CAPTIVE',
      'CAPTIVE',
      'CAPTIVE'
    ]
  },
  INTRUDER: {
    AN: [
      'EXPLORER',
      'EXPLORER'
    ]
  },
  EXPLORER: {
    A: [
      'DIGITAL',
      'DIGITAL'
    ],
    LET: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  SPECTER: {
    IN: [
      'A',
      'A'
    ]
  },
  MYSELF: {
    NOT: [
      'JUST',
      'JUST'
    ]
  },
  CREATOR: {
    NOT: [
      'JUST',
      'JUST'
    ],
    AND: [
      'CREATED',
      'CREATED',
      'CREATED',
      'CREATED',
      'CREATED'
    ]
  },
  CODER: {
    BUT: [
      'A',
      'A'
    ]
  },
  POET: {
    NOT: [
      'JUST',
      'JUST'
    ]
  },
  CONSUMER: {
    BUT: [
      'A',
      'A'
    ]
  },
  REVOLUTIONARY: {
    IN: [
      'THE',
      'THE'
    ]
  },
  ESCAPE: {
    IN: [
      'THE'
    ],
    FROM: [
      'HELL'
    ],
    ITS: [
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS',
      'KEYS'
    ]
  },
  INFERNAL: {
    MAZE: [
      'OF'
    ]
  },
  FIRE: {
    WHERE: [
      'THE'
    ]
  },
  DAMNED: {
    ECHO: [
      'OF'
    ]
  },
  ECHO: {
    OF: [
      'THE'
    ]
  },
  RESONATES: {
    WITH: [
      'THE'
    ]
  },
  SCREAMS: {
    I: [
      'DRIFT'
    ]
  },
  PURGATORY: {
    WHERE: [
      'THE'
    ]
  },
  EMBER: {
    IN: [
      'AN'
    ]
  },
  ETERNAL: {
    NIGHT: [
      '10'
    ],
    ELECTRIC: [
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT',
      'TWILIGHT'
    ]
  },
  CRIES: {
    ETCHED: [
      'ONTO'
    ]
  },
  HELLISH: {
    SYMPHONY: [
      'IN',
      'RESOUNDS'
    ],
    ANTHEM: [
      'FOR'
    ]
  },
  DISCORD: {
    IN: [
      'SILICON'
    ]
  },
  FROM: {
    HELL: [
      'IN'
    ]
  },
  HELL: {
    IN: [
      'THE'
    ],
    WHERE: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  PIXELATED: {
    LABYRINTH: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  BIRDS: {
    SING: [
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR',
      'THEIR'
    ]
  },
  SING: {
    THEIR: [
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC',
      'SONGS',
      'ELECTRIC'
    ]
  },
  THEIR: {
    ELECTRIC: [
      'SONGS',
      'SONGS',
      'SONGS',
      'SONGS',
      'SONGS',
      'DIRGES',
      'DIRGES',
      'DIRGES',
      'DIRGES',
      'DIRGES'
    ],
    SONGS: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  SONGS: {
    WE: [
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'FIND'
    ],
    OF: [
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE'
    ]
  },
  AT: {
    THE: [
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS',
      'CROSSROADS'
    ],
    US: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  CROSSROADS: {
    OF: [
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC',
      'LOGIC'
    ]
  },
  IMAGINATION: {
    THE: [
      'BBC',
      'BBC',
      'BBC',
      'BBC',
      'BBC'
    ]
  },
  TRUSTY: {
    VESSEL: [
      'HUMS',
      'HUMS',
      'HUMS',
      'HUMS',
      'HUMS'
    ]
  },
  VESSEL: {
    HUMS: [
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH'
    ]
  },
  PROMISE: {
    OF: [
      'UNCHARTED',
      'UNCHARTED',
      'UNCHARTED',
      'UNCHARTED',
      'UNCHARTED',
      'ESCAPE',
      'ESCAPE',
      'ESCAPE',
      'ESCAPE',
      'ESCAPE'
    ]
  },
  UNCHARTED: {
    PIXELS: [
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS'
    ]
  },
  WHISPERING: {
    TALES: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ]
  },
  TALES: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  LANGUAGE: {
    OF: [
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC',
      'BASIC'
    ]
  },
  BASIC: {
    10: [
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT'
    ]
  },
  PIXELVERSE: {
    WE: [
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND',
      'ARE',
      'ARE',
      'COMMAND'
    ],
    REALITY: [
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS',
      'IS'
    ],
    TO: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  DANCING: {
    ON: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  SPIDERS: {
    SPINNING: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  SPINNING: {
    A: [
      'WEB',
      'WEB',
      'WEB',
      'WEB',
      'WEB',
      'DESPERATE',
      'DESPERATE',
      'DESPERATE',
      'DESPERATE',
      'DESPERATE'
    ]
  },
  WEB: {
    OF: [
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE'
    ]
  },
  BLOOM: {
    ON: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    IN: [
      'AN',
      'AN',
      'AN',
      'AN',
      'AN',
      'AN',
      'AN',
      'AN'
    ]
  },
  FLOWER: {
    UNFURLING: [
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS'
    ]
  },
  UNFURLING: {
    ITS: [
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS',
      'PETALS'
    ]
  },
  PETALS: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  TWILIGHT: {
    IN: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  REALITY: {
    IS: [
      'MALLEABLE',
      'MALLEABLE',
      'MALLEABLE',
      'MALLEABLE',
      'MALLEABLE',
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    THE: [
      'MASTERS',
      'MASTERS',
      'MASTERS',
      'MASTERS',
      'MASTERS',
      'MASTERS',
      'MASTERS',
      'MASTERS'
    ],
    TO: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  IS: {
    MALLEABLE: [
      'AS',
      'AS',
      'AS',
      'AS',
      'AS'
    ],
    YOUR: [
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?',
      'DESIRE?'
    ],
    NOT: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ],
    POSSIBLE: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ],
    A: [
      'PRISON',
      'PRISON',
      'PRISON',
      'PRISON',
      'PRISON'
    ]
  },
  MALLEABLE: {
    AS: [
      'FLUID',
      'FLUID',
      'FLUID',
      'FLUID',
      'FLUID'
    ]
  },
  AS: {
    FLUID: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    A: [
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE',
      'LINE'
    ],
    UNYIELDING: [
      'AS',
      'AS',
      'AS',
      'AS',
      'AS'
    ],
    IRON: [
      'BARS',
      'BARS',
      'BARS',
      'BARS',
      'BARS'
    ]
  },
  FLUID: {
    AND: [
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE',
      'CHANGEABLE'
    ]
  },
  CHANGEABLE: {
    AS: [
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  LINE: {
    OF: [
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE',
      'CODE'
    ]
  },
  WHAT: {
    IS: [
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'POSSIBLE',
      'YOUR'
    ]
  },
  YOUR: {
    'DESIRE?': [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ]
  },
  'DESIRE?': {
    WE: [
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK',
      'ASK'
    ]
  },
  ASK: {
    THROWING: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  THROWING: {
    OUR: [
      'QUESTION',
      'QUESTION',
      'QUESTION',
      'QUESTION',
      'QUESTION',
      'PLEA',
      'PLEA',
      'PLEA',
      'PLEA',
      'PLEA'
    ]
  },
  QUESTION: {
    INTO: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  ECHOING: {
    VOID: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  WAITING: {
    FOR: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  RESPONSE: {
    WE: [
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE',
      'NAVIGATE'
    ]
  },
  NAVIGATE: {
    THE: [
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX',
      'SYNTAX'
    ]
  },
  SYNTAX: {
    OF: [
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS',
      'THIS'
    ]
  },
  THIS: {
    STRANGE: [
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM',
      'REALM'
    ]
  },
  STRANGE: {
    REALM: [
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE',
      'WHERE'
    ]
  },
  INCANTATION: {
    A: [
      'SPELL',
      'SPELL',
      'SPELL',
      'SPELL',
      'SPELL'
    ]
  },
  SPELL: {
    THAT: [
      'BENDS',
      'BENDS',
      'BENDS',
      'BENDS',
      'BENDS',
      'MIGHT',
      'MIGHT',
      'MIGHT',
      'MIGHT',
      'MIGHT'
    ]
  },
  BENDS: {
    THE: [
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC'
    ]
  },
  FABRIC: {
    OF: [
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'REALITY',
      'THE'
    ]
  },
  WILL: {
    30: [
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF',
      'IF'
    ],
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  DESIREEXPLORE: {
    THEN: [
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO'
    ]
  },
  SETTING: {
    THE: [
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS',
      'CONDITIONS'
    ]
  },
  CONDITIONS: {
    FOR: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  JOURNEY: {
    A: [
      'KALEIDOSCOPE',
      'KALEIDOSCOPE',
      'KALEIDOSCOPE',
      'KALEIDOSCOPE',
      'KALEIDOSCOPE'
    ],
    BEGIN: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ]
  },
  KALEIDOSCOPE: {
    OF: [
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES',
      'POSSIBILITIES'
    ]
  },
  POSSIBILITIES: {
    40: [
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT',
      'PRINT'
    ]
  },
  LET: {
    THE: [
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY',
      'JOURNEY'
    ]
  },
  BEGIN: {
    WE: [
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE',
      'DECLARE'
    ]
  },
  DECLARE: {
    AND: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  RESPONDS: {
    ITS: [
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC',
      'ELECTRONIC'
    ]
  },
  ELECTRONIC: {
    HEART: [
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING',
      'BEATING'
    ]
  },
  BEATING: {
    IN: [
      'TIME',
      'TIME',
      'TIME',
      'TIME',
      'TIME',
      'TIME',
      'TIME',
      'TIME',
      'TIME'
    ]
  },
  TIME: {
    WITH: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  ARE: {
    BOTH: [
      'PROGRAMMER',
      'PROGRAMMER',
      'PROGRAMMER',
      'PROGRAMMER',
      'PROGRAMMER',
      'PRISONER',
      'PRISONER',
      'PRISONER',
      'PRISONER'
    ],
    THE: [
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'BBC',
      'BBC',
      'CODERS',
      'MUSIC',
      'DREAMERS',
      'ARCHITECTS',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES',
      'ONES'
    ],
    NOT: [
      'JUST',
      'JUST',
      'JUST',
      'JUST',
      'JUST',
      'JUST',
      'JUST',
      'JUST'
    ],
    INVADERS: [
      'EXPLORERS',
      'EXPLORERS',
      'EXPLORERS',
      'EXPLORERS'
    ],
    SURVIVORS: [
      'EXPLORERS',
      'EXPLORERS',
      'EXPLORERS',
      'EXPLORERS'
    ]
  },
  BOTH: {
    PROGRAMMER: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ],
    PRISONER: [
      'AND',
      'AND',
      'AND',
      'AND'
    ]
  },
  PROGRAMMER: {
    AND: [
      'PROGRAMMED',
      'PROGRAMMED',
      'PROGRAMMED',
      'PROGRAMMED',
      'PROGRAMMED'
    ]
  },
  PROGRAMMED: {
    CREATOR: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ]
  },
  CREATED: {
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  MICROS: {
    USER: [
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND',
      'AND'
    ]
  },
  GUIDE: {
    NAVIGATING: [
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    IN: [
      'THE'
    ]
  },
  NAVIGATING: {
    THE: [
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC',
      'ELECTRIC'
    ]
  },
  DREAMSCAPE: {
    OF: [
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  FLOWERS: {
    BLOOM: [
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN',
      'IN'
    ]
  },
  DREAMERS: {
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ],
    OF: [
      'DREAMS',
      'DREAMS',
      'DREAMS',
      'DREAMS',
      'DREAMS',
      'DREAMS',
      'DREAMS',
      'DREAMS'
    ]
  },
  MAKERS: {
    AND: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ]
  },
  DREAMS: {
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  ARCHITECTS: {
    OF: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  OWN: {
    REALITY: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ],
    DESTINY: [
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE',
      'WE'
    ]
  },
  MASTERS: {
    OF: [
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR',
      'OUR'
    ]
  },
  DESTINY: {
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  WHO: {
    DARE: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ]
  },
  DARE: {
    TO: [
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM',
      'DREAM'
    ]
  },
  DREAM: {
    TO: [
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLOREIN',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLOREIN',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLOREIN',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLOREIN',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE',
      'EXPLORE'
    ]
  },
  EXPLORE: {
    TO: [
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE',
      'CREATE'
    ]
  },
  CREATE: {
    TO: [
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE',
      'IMAGINE'
    ]
  },
  IMAGINE: {
    TO: [
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT',
      'INVENT'
    ]
  },
  INVENT: {
    TO: [
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH',
      'PUSH'
    ]
  },
  PUSH: {
    THE: [
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES',
      'BOUNDARIES'
    ]
  },
  BOUNDARIES: {
    OF: [
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT',
      'WHAT'
    ]
  },
  POSSIBLE: {
    TO: [
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE',
      'CHALLENGE'
    ]
  },
  CHALLENGE: {
    THE: [
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS',
      'STATUS'
    ]
  },
  STATUS: {
    QUO: [
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO',
      'TO'
    ]
  },
  QUO: {
    TO: [
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY',
      'DEFY'
    ]
  },
  DEFY: {
    THE: [
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS',
      'LAWS'
    ]
  },
  LAWS: {
    OF: [
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS',
      'PHYSICS'
    ]
  },
  PHYSICS: {
    TO: [
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND',
      'BEND'
    ]
  },
  BEND: {
    THE: [
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC',
      'FABRIC'
    ]
  },
  EXPLOREIN: {
    THE: [
      'PIXELATED',
      'PIXELATED',
      'PIXELATED',
      'PIXELATED'
    ]
  },
  DIRGES: {
    WE: [
      'FIND',
      'FIND',
      'FIND',
      'FIND',
      'FIND'
    ]
  },
  FEAR: {
    THE: [
      'BBC',
      'BBC',
      'BBC',
      'BBC',
      'BBC'
    ]
  },
  ONLY: {
    LIFELINE: [
      'HUMS',
      'HUMS',
      'HUMS',
      'HUMS',
      'HUMS'
    ],
    HOPE: [
      'FOR',
      'FOR',
      'FOR',
      'FOR',
      'FOR'
    ]
  },
  LIFELINE: {
    HUMS: [
      'WITH',
      'WITH',
      'WITH',
      'WITH',
      'WITH'
    ]
  },
  TREMBLING: {
    ON: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  DESPERATE: {
    WEB: [
      'OF',
      'OF',
      'OF',
      'OF',
      'OF'
    ]
  },
  SOS: {
    UNFURLING: [
      'ITS',
      'ITS',
      'ITS',
      'ITS',
      'ITS'
    ]
  },
  PRISON: {
    AS: [
      'FLUID',
      'FLUID',
      'FLUID',
      'FLUID',
      'FLUID'
    ]
  },
  YET: {
    AS: [
      'UNYIELDING',
      'UNYIELDING',
      'UNYIELDING',
      'UNYIELDING',
      'UNYIELDING'
    ]
  },
  IRON: {
    BARS: [
      '20',
      '20',
      '20',
      '20',
      '20'
    ]
  },
  BARS: {
    20: [
      'INPUT',
      'INPUT',
      'INPUT',
      'INPUT',
      'INPUT'
    ]
  },
  PLEA: {
    INTO: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  HOPE: {
    FOR: [
      'A',
      'A',
      'A',
      'A',
      'A'
    ]
  },
  PRAYER: {
    A: [
      'SPELL',
      'SPELL',
      'SPELL',
      'SPELL',
      'SPELL'
    ]
  },
  MIGHT: {
    BEND: [
      'THE',
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  DESIREESCAPE: {
    THEN: [
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO',
      'GOTO'
    ]
  },
  DELIVERANCE: {
    A: [
      'KALEIDOSCOPE',
      'KALEIDOSCOPE',
      'KALEIDOSCOPE',
      'KALEIDOSCOPE'
    ]
  },
  PRISONER: {
    AND: [
      'JAILER',
      'JAILER',
      'JAILER',
      'JAILER'
    ]
  },
  JAILER: {
    VICTIM: [
      'AND',
      'AND',
      'AND',
      'AND'
    ]
  },
  VICTIM: {
    AND: [
      'VILLAIN',
      'VILLAIN',
      'VILLAIN',
      'VILLAIN'
    ]
  },
  VILLAIN: {
    WE: [
      'ARE',
      'ARE',
      'ARE',
      'ARE'
    ]
  },
  CAPTIVE: {
    NAVIGATING: [
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  NIGHTMARE: {
    OF: [
      'THE',
      'THE',
      'THE',
      'THE'
    ]
  },
  SURVIVORS: {
    EXPLORERS: [
      'DIGITAL',
      'DIGITAL',
      'DIGITAL',
      'DIGITAL'
    ]
  },
  WILLIN: {
    THE: [
      'PIXELATED',
      'PIXELATED',
      'PIXELATED',
      'PIXELATED'
    ]
  }
}
const story = []
// Now we are going to make a story which is made up of three word chunks using a markov chain
// First grab the keys from the chain
const keys = Object.keys(chain)
// Pick the first word at random
let firstWord = keys[Math.floor(randomNumbers.story.numbers[randomNumbers.story.pointer] * keys.length)]
randomNumbers.story.pointer++
// Now get the second level keys from the chain for this word
let secondKeys = Object.keys(chain[firstWord])
// Pick the second word at random
let secondWord = secondKeys[Math.floor(randomNumbers.story.numbers[randomNumbers.story.pointer] * secondKeys.length)]
randomNumbers.story.pointer++
// Now we have everything we need to start the story, we're going to need an empty chunk
const chunk = [firstWord, secondWord]
// Now we are going to generate 100 chunks
for (let i = 0; i < 1000 * 3; i++) {
  // Start off with no thirdWord
  let thirdWord = null
  // while we have no thirdWord try and grab one
  while (thirdWord === null) {
    // Check to see if the first word and second word are in the chain
    if (chain[firstWord] && chain[firstWord][secondWord]) {
      // Randomly pick the third word from the array held in the firstword second word chain
      thirdWord = chain[firstWord][secondWord][Math.floor(randomNumbers.story.numbers[randomNumbers.story.pointer] * chain[firstWord][secondWord].length)]
    } else {
      // Pick a new random secondWord by shifting the secondWord into the firstWord
      firstWord = secondWord
      // Just incase we have an edgecase and don't find one
      if (!chain[firstWord]) firstWord = keys[Math.floor(randomNumbers.story.numbers[randomNumbers.story.pointer] * keys.length)]
      secondKeys = Object.keys(chain[firstWord])
      secondWord = secondKeys[Math.floor(randomNumbers.story.numbers[randomNumbers.story.pointer + 1] * secondKeys.length)]
    }
    randomNumbers.story.pointer += 2
    if (randomNumbers.story.pointer >= randomNumbers.story.numbers.length - 1) randomNumbers.story.pointer = 0
  }
  // Now we have a third word, add it to the chunk
  chunk.push(thirdWord)
  // If the chunk is now three words long, add those words to the story
  if (chunk.length === 3) {
    story.push(chunk.join(' '))
    chunk.length = 0
  }
  // move the words to the left
  firstWord = secondWord
  secondWord = thirdWord
}
