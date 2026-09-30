// Chapter 4: The Caribou Hunt (end of Part One)
(function (JW) {
  'use strict';
  const L = 'lime';

  JW.addChapter(4, [
    // ---------- Page 1: the herd ----------
    {
      rows: [[1.6, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.5, sun: [0.85, 0.3, 0.035], tufts: 14, cotton: 3,
            fg: { x: 0.18, y: 1.05, w: 0.8, h: 0.3 } },
          cast: [
            { c: 'caribou', pose: 'graze', x: 0.46, y: 0.62, s: 0.5 },
            { c: 'caribouCow', pose: 'stand', x: 0.6, y: 0.6, s: 0.48, flip: true },
            { c: 'caribou', pose: 'trot', x: 0.74, y: 0.63, s: 0.5 },
            { c: 'caribouCow', pose: 'graze', x: 0.88, y: 0.61, s: 0.45 },
            { c: 'caribou', pose: 'stand', x: 0.54, y: 0.66, s: 0.55 },
            { c: 'caribouCow', pose: 'trot', x: 0.36, y: 0.64, s: 0.46, flip: true },
            { c: 'amaroq', pose: 'standTall', x: 0.2, y: 0.78, s: 0.9 },
            { c: 'nails', pose: 'stand', x: 0.36, y: 0.9, s: 0.9 }
          ],
          text: [
            { t: 'title', text: 'The Caribou\nHunt', at: [0.5, 0.13], size: 90, sub: [{ text: 'Chapter 4', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'One day a herd of caribou came wandering across the tundra.', at: 'br', w: 0.45 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'amaroq', pose: 'howl', x: 0.3, y: 0.93, s: 1.1 },
            { c: 'silver', pose: 'howl', x: 0.82, y: 0.94, s: 0.95, flip: true }
          ],
          text: [{ t: 'sfx', text: 'AROOOO!', at: [0.5, 0.22], size: 44, color: '#fbf6ea' }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'nails', pose: 'greet', x: 0.36, y: 0.93, s: 1.1 },
            { c: 'amaroq', pose: 'standTall', x: 0.74, y: 0.93, s: 1.1, flip: true }
          ],
          text: [{ t: 'cap', text: 'Before a hunt, the wolves gathered, wagging and singing.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'surprised', s: 5, fit: ['face', 0.5, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'They\'re going to hunt!', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        }
      ]
    },

    // ---------- Page 2: the chase ----------
    {
      rows: [[1.2, 1], [1, 1, 1, 1], [1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 10, flat: true },
          cast: [
            { c: 'caribou', pose: 'run', x: 0.78, y: 0.66, s: 0.7 },
            { c: 'caribouCow', pose: 'run', x: 0.9, y: 0.62, s: 0.62 },
            { c: 'caribou', pose: 'run', x: 0.64, y: 0.6, s: 0.6 },
            { c: 'amaroq', pose: 'run', x: 0.4, y: 0.84, s: 1.05 },
            { c: 'silver', pose: 'run', x: 0.22, y: 0.8, s: 0.95 },
            { c: 'nails', pose: 'run', x: 0.12, y: 0.92, s: 1 }
          ],
          text: [
            { t: 'cap', text: 'The pack raced after the herd.', at: 'tl', w: 0.5 },
            { t: 'sfx', text: 'THUDDA THUDDA', at: [0.62, 0.3], size: 46, rot: -4 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'caribou', id: 'c', pose: 'trot', x: 0.55, y: 0.92, s: 0.95, tweak: { neck: 100, head: -30 } }
          ],
          text: [{ t: 'cap', text: 'Amaroq did not chase the whole herd. He picked one old caribou that could not keep up.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'burst', color: '#e7c07a', ray: '#f1d6a0', cx: 0.5, cy: 0.7 },
          props: [{ p: 'dust', x: 0.5, y: 0.92, s: 1.4 }],
          text: [
            { t: 'sfx', text: 'WHUMP!', at: [0.5, 0.3], size: 70, rot: -6 },
            { t: 'cap', text: 'It was over quickly.', at: 'bl', w: 0.95 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.5, sun: false, tufts: 6, flat: true },
          props: [{ p: 'hide', x: 0.52, y: 0.72, s: 0.8 }],
          cast: [
            { c: 'amaroq', pose: 'sniff', x: 0.36, y: 0.72, s: 0.6 },
            { c: 'silver', pose: 'sniff', x: 0.68, y: 0.73, s: 0.55, flip: true },
            { c: 'nails', pose: 'lie', x: 0.84, y: 0.76, s: 0.5, flip: true }
          ],
          text: [{ t: 'cap', text: 'Far off, the wolves ate their fill.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'serious', s: 5, fit: ['face', 0.3, 0.64] }],
          text: [
            { t: 'cap', text: 'Her people always thank the animals that feed them.', at: 'tr', w: 0.55 },
            { t: 'think', who: 'm', text: 'Thank you, caribou.', at: [0.7, 0.62], w: 0.45, tailMax: 80 }
          ]
        }
      ]
    },

    // ---------- Page 3: gathering the gift ----------
    {
      rows: [[1, 1, 1], [1.2, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 8 },
          props: [{ p: 'hide', x: 0.62, y: 0.94, s: 1.6 }],
          cast: [{ c: 'miyax', pose: 'kneelWork', expr: 'determined', x: 0.3, y: 0.96, s: 1.7, hold: 'ulu' }],
          text: [{ t: 'cap', text: 'When the wolves were full, Miyax came with her [[ulu]].', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 8 },
          props: [{ p: 'meatPile', x: 0.6, y: 0.94, s: 2 }, { p: 'antlers', x: 0.25, y: 0.95, s: 1.2 }],
          text: [{ t: 'cap', text: 'The pack had left plenty: meat, fat, and the warm skin.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.52, sun: [0.1, 0.24, 0.04], tufts: 10,
            fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.3 } },
          props: [{ p: 'sodHouse', x: 0.28, y: 0.88, s: 1.1 }, { p: 'dryRack', x: 0.66, y: 0.9, s: 1.3 }],
          cast: [{ c: 'miyax', pose: 'reach', expr: 'happy', x: 0.88, y: 0.9, s: 1.4, flip: true }],
          text: [{ t: 'cap', text: 'She cut the meat into strips and hung them in the wind to dry, the way her people always had.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          props: [{ p: 'hide', x: 0.66, y: 0.95, s: 1.4 }],
          cast: [{ c: 'miyax', pose: 'kneelWork', expr: 'neutral', x: 0.3, y: 0.96, s: 1.6, hold: 'ulu' }],
          text: [{ t: 'cap', text: 'She scraped the skin to make warm things for winter.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          props: [{ p: 'pot', x: 0.7, y: 0.95, s: 1.6, empty: false }],
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'joy', x: 0.36, y: 0.96, s: 1.7 }],
          text: [{ t: 'say', who: 'm', text: 'A full pot!', at: [0.62, 0.24], w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          props: [{ p: 'meat', x: 0.66, y: 0.93, s: 1.4 }],
          cast: [
            { c: 'kapu', id: 'k', pose: 'sit', x: 0.36, y: 0.94, s: 1.3, mouth: 'pant' },
            { c: 'zing', pose: 'crouch', x: 0.8, y: 0.96, s: 1, flip: true }
          ],
          text: [{ t: 'cap', text: 'And she shared with the pups.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 4: the sun sets ----------
    {
      rows: [[1.3, 1], [1, 1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'sunset', hz: 0.62, sun: [0.55, 0.625, 0.07], rays: false, tufts: 10, flat: true },
          props: [{ p: 'bird', x: 0.3, y: 0.3, s: 1.4 }, { p: 'bird', x: 0.36, y: 0.24, s: 1.1 }, { p: 'bird', x: 0.42, y: 0.29, s: 1 }],
          text: [
            { t: 'cap', text: 'Then, one evening, something new happened.', at: 'tl', w: 0.5 },
            { t: 'cap', text: 'The sun slipped below the edge of the world.', at: 'br', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'sunset', hz: 0.55, sun: false, tufts: 6, fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.3 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'surprised', x: 0.4, y: 0.84, s: 1.7 }],
          text: [{ t: 'say', who: 'm', text: 'The sun is setting!', at: [0.5, 0.14], w: 0.8 }]
        },
        {
          bg: { scene: 'tundra', sky: 'sunset', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'worried', s: 4.5, fit: ['face', 0.5, 0.64] }],
          text: [{ t: 'think', who: 'm', text: 'Summer is ending. Winter is coming.', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        },
        {
          bg: { scene: 'tundra', sky: 'sunset', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'determined', s: 4.5, fit: ['face', 0.5, 0.64], flip: true }],
          text: [{ t: 'think', who: 'm', text: 'I have to get to Point Hope before the sea freezes.', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        },
        {
          bg: { scene: 'tundra', sky: 'night', hz: 0.62, sun: false, tufts: 6, flat: true, moon: [0.82, 0.16, 0.035] },
          props: [{ p: 'sodHouse', x: 0.3, y: 0.86, s: 1 }],
          cast: [{ c: 'miyax', pose: 'sitLook', expr: 'hopeful', x: 0.62, y: 0.88, s: 1.4 }],
          text: [{ t: 'cap', text: 'And for the first time in months, the stars came out.', at: 'tl', w: 0.55 }]
        },
        {
          bg: { scene: 'sky', sky: 'night', northStar: [0.6, 0.35] },
          text: [
            { t: 'cue', tail: [0.6, 0.35], text: 'The North Star', at: [0.34, 0.62], w: 0.5 },
            { t: 'cap', text: 'The North Star! Now she could find her way.', at: 'bl', w: 0.95 }
          ]
        }
      ]
    },

    // ---------- Page 5: the song ----------
    {
      rows: [[1.5, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'night', hz: 0.64, sun: false, tufts: 8, aurora: true,
            heaves: [{ x: 0.66, y: 0.72, w: 0.6, h: 0.1 }], fg: { x: 0.15, y: 1.05, w: 0.7, h: 0.28 } },
          props: [{ p: 'sodHouse', x: 0.12, y: 0.84, s: 0.8 }],
          cast: [
            { c: 'amaroq', pose: 'howl', x: 0.6, y: 0.64, s: 0.75 },
            { c: 'silver', pose: 'howl', x: 0.72, y: 0.645, s: 0.68, flip: true },
            { c: 'nails', pose: 'howl', x: 0.5, y: 0.655, s: 0.68 },
            { c: 'kapu', pose: 'howl', x: 0.82, y: 0.66, s: 0.55, flip: true },
            { c: 'miyax', pose: 'sitLook', expr: 'warm', x: 0.3, y: 0.86, s: 1.3 }
          ],
          text: [
            { t: 'cap', text: 'That night the wolves sang to the stars, and the northern lights danced over them.', at: 'tl', w: 0.5 },
            { t: 'sfx', text: 'AROOOOO', at: [0.66, 0.3], size: 56, color: '#d6f3e4', rot: -4 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'night' },
          cast: [{ c: 'kapu', pose: 'howl', x: 0.52, y: 1.02, s: 2.4 }],
          text: [{ t: 'sfx', text: 'ooo!', at: [0.72, 0.2], size: 40, color: '#d6f3e4' }]
        },
        {
          bg: { scene: 'sky', sky: 'night' },
          cast: [{ c: 'miyax', id: 'm', pose: 'sitLook', expr: 'joy', s: 4.2, fit: ['face', 0.46, 0.6] }],
          text: [{ t: 'say', who: 'm', text: 'Ooo-ooo!', at: [0.5, 0.18], w: 0.8, tailMax: 60 }]
        },
        {
          bg: { scene: 'sky', sky: 'night', moon: [0.7, 0.3, 0.1] },
          text: [{ t: 'cap', text: 'Miyax sang with them. She was part of the pack now.', at: 'bl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 6: remembering ----------
    {
      rows: [[1, 1, 1], [1.3, 1], [0.9, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'night', hz: 0.55, sun: false, tufts: 6, flat: true },
          props: [{ p: 'sodHouse', x: 0.5, y: 0.92, s: 1.6 }],
          text: [{ t: 'cap', text: 'Warm in her sod house, full at last...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#2b2230' },
          cast: [{ c: 'miyax', pose: 'sleep', expr: 'warm', x: 0.5, y: 0.8, s: 1.6 }],
          text: [{ t: 'cap', text: '...Miyax began to remember.', at: 'tl', w: 0.95 }]
        },
        {
          style: 'memory',
          bg: { scene: 'shore', hz: 0.42, clouds: [[0.3, 0.14, 0.8]] },
          props: [{ p: 'tent', x: 0.8, y: 0.66, s: 1 }, { p: 'kayak', x: 0.3, y: 0.7, s: 0.9 }],
          cast: [
            { c: 'kapugen', pose: 'point', expr: 'warm', x: 0.4, y: 0.95, s: 1.7 },
            { c: 'miyaxKid', pose: 'wave', expr: 'joy', x: 0.6, y: 0.95, s: 1.7 }
          ],
          text: [{ t: 'cap', text: 'She remembered seal camp by the sea, long ago, when she was little and her father, Kapugen, was always beside her.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'End of Part One', at: [0.5, 0.36], size: 56, color: '#f2c230' },
            { t: 'title', text: 'Part Two: Miyax, the Girl', at: [0.5, 0.66], size: 50 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
