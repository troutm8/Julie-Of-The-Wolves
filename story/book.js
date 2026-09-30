// The book: parts, chapter list, glossary and cover.
(function (JW) {
  'use strict';
  JW.book = {
    title: 'Julie of the Wolves',
    parts: [
      { n: 1, title: 'Amaroq, the Wolf' },
      { n: 2, title: 'Miyax, the Girl' },
      { n: 3, title: 'Kapugen, the Hunter' }
    ],
    chapters: [
      { n: 1, part: 1, title: 'Lost' },
      { n: 2, part: 1, title: 'Wolf Talk' },
      { n: 3, part: 1, title: 'Food from the Pack' },
      { n: 4, part: 1, title: 'The Caribou Hunt' },
      { n: 5, part: 2, title: 'Seal Camp' },
      { n: 6, part: 2, title: 'Mekoryuk' },
      { n: 7, part: 2, title: 'Barrow' },
      { n: 8, part: 3, title: 'Traveling with the Pack' },
      { n: 9, part: 3, title: 'Jello' },
      { n: 10, part: 3, title: 'The Plane' },
      { n: 11, part: 3, title: 'Winter Journey' },
      { n: 12, part: 3, title: 'Kapugen' }
    ],
    glossary: {
      amaroq: { word: 'Amaroq', def: 'The word for "wolf." Miyax gives this name to the leader of the pack.' },
      ilaya: { word: 'Ilaya', def: 'Friend.' },
      kapugen: { word: 'Kapugen', def: 'Miyax\'s father, a great hunter. She names the boldest wolf pup Kapu after him.' },
      miyax: { word: 'Miyax', def: 'Julie\'s Yup\'ik name. In English, and at school, she is called Julie.' },
      'north slope': { word: 'North Slope', def: 'The flat, treeless land in the far north of Alaska, between the Brooks Range mountains and the Arctic Ocean.' },
      tundra: { word: 'Tundra', def: 'Treeless Arctic land. The ground just under the surface stays frozen all year, so only grass, moss, lichen and tiny flowers grow.' },
      'frost heave': { word: 'Frost heave', def: 'A dome-shaped hill pushed up from the ground when the soil freezes and swells in winter.' },
      sleeps: { word: 'Sleeps', def: 'Miyax counts time in "sleeps" because in the Arctic summer the sun never sets, so there are no nights to count.' },
      barrow: { word: 'Barrow', def: 'The town at the top of Alaska where Miyax was living. Today it is called Utqiaġvik.' },
      'point hope': { word: 'Point Hope', def: 'A village on the coast west of Barrow, where ships stop in summer.' },
      parka: { word: 'Parka', def: 'A long, hooded coat. Miyax\'s is made from sealskin, with a fur ruff around the hood.' },
      'seal camp': { word: 'Seal camp', def: 'A summer camp by the sea where families hunt seals for food, oil and skins.' },
      ulu: { word: 'Ulu', def: 'A curved knife with a handle on top, used by women for cutting and sewing.' },
      yupik: { word: 'Yup\'ik', def: 'The people Miyax belongs to, from the coasts of western Alaska. The book, written in 1972, uses the older word "Eskimo."' },
      'bladder feast': { word: 'Bladder Feast', def: 'A winter celebration. The bladders of the seals caught that year are returned to the sea, so the seals\' spirits can go home and come back as new seals.' },
      mekoryuk: { word: 'Mekoryuk', def: 'The only village on Nunivak Island, where Miyax lived with Aunt Martha and went to school.' },
      'nunivak island': { word: 'Nunivak Island', def: 'A large island in the Bering Sea, off the west coast of Alaska. Miyax was born there.' },
      kayak: { word: 'Kayak', def: 'A narrow, covered boat for one hunter, first made by Arctic peoples from skins stretched over a wooden frame.' },
      tornait: { word: 'Tornait', def: 'The name Miyax gives the little golden plover she rescues and carries in her hood.' },
      kangik: { word: 'Kangik', def: 'The village where Miyax finally finds her father, Kapugen.' },
      'san francisco': { word: 'San Francisco', def: 'A big city in California where Miyax\'s pen pal Amy lives.' }
    },
    pagesByChapter: {}
  };

  JW.addChapter = function (n, pages) { JW.book.pagesByChapter[n] = pages; };

  // Cover
  JW.book.cover = {
    rows: [[1, 1]],
    panels: [{
      rect: { x: 0, y: 0, w: 1000, h: 1500 }, border: false,
      bg: { scene: 'tundra', sky: 'gold', hz: 0.66, sun: [0.8, 0.56, 0.05], tufts: 10, cotton: 6,
        heaves: [{ x: 0.18, y: 0.7, w: 0.3, h: 0.035 }],
        fg: { x: 0.45, y: 1.04, w: 1.5, h: 0.14, cotton: 4 } },
      cast: [
        { c: 'amaroq', pose: 'faceFront', x: 0.5, y: 0.8, s: 5.4, z: 0 },
        { c: 'miyax', pose: 'standLook', expr: 'hopeful', x: 0.36, y: 0.98, s: 3.2, hood: 'down', z: 2 },
        { c: 'kapu', pose: 'sit', x: 0.74, y: 0.99, s: 2.2, flip: true, z: 3 }
      ],
      text: [
        { t: 'title', text: 'Julie of\nthe Wolves', at: [0.5, 0.11], size: 128, sub: [{ text: 'A comic from the book by Jean Craighead George', size: 30 }] }
      ]
    }]
  };
})(window.JW);
