// Chapter 5: Seal Camp (Part Two begins)
(function (JW) {
  'use strict';
  const M = 'memory';

  JW.addChapter(5, [
    // ---------- Page 1: title ----------
    {
      rows: [[2.6, 1], [0.55, 1]],
      panels: [
        {
          bg: { scene: 'shore', hz: 0.46, clouds: [[0.72, 0.12, 0.9], [0.2, 0.2, 0.6]], sunX: 0.8 },
          props: [{ p: 'tent', x: 0.78, y: 0.72, s: 1.3 }, { p: 'kayak', x: 0.24, y: 0.7, s: 1.1 }, { p: 'driftwood', x: 0.5, y: 0.96, s: 1.6 }],
          cast: [
            { c: 'kapugen', id: 'k', pose: 'walk', expr: 'warm', x: 0.44, y: 0.92, s: 2.1 },
            { c: 'miyaxKid', id: 'm', pose: 'walk', expr: 'joy', x: 0.6, y: 0.93, s: 2.1, tweak: { arms: { n: [-40, -20], f: [30, 60] } } }
          ],
          text: [
            { t: 'title', text: 'Seal Camp', at: [0.5, 0.14], size: 100, sub: [{ text: 'Part Two · Miyax, the Girl', size: 34 }, { text: 'Chapter 5', size: 36, fill: '#b3352b', color: '#fbf6ea' }] }
          ]
        },
        {
          bg: { scene: 'plain', color: '#f3e3bf' },
          text: [{ t: 'cap', text: 'Miyax\'s mother died when Miyax was four. Her father, Kapugen, was so sad that he left the village. He took Miyax to live at [[seal camp]], by the Bering Sea, the way their people had lived long ago.', at: [0.5, 0.2], w: 0.92, center: true, fill: '#fbf1d4' }]
        }
      ]
    },

    // ---------- Page 2: life at camp ----------
    {
      rows: [[1.1, 1], [1, 0.8, 1.5, 0.8], [1, 1]],
      panels: [
        {
          bg: { scene: 'shore', hz: 0.5, sun: false, clouds: [[0.3, 0.16, 0.8]] },
          props: [{ p: 'kayak', x: 0.62, y: 0.56, s: 0.9 }],
          cast: [
            { c: 'kapugen', pose: 'sit', expr: 'warm', x: 0.62, y: 0.545, s: 0.7, tweak: { legs: { n: [90, 90], f: [90, 90] }, arms: { n: [60, 150], f: [40, 120] } } },
            { c: 'miyaxKid', id: 'm', pose: 'wave', expr: 'joy', x: 0.24, y: 0.94, s: 2 }
          ],
          text: [
            { t: 'cap', text: 'Kapugen hunted seals from his kayak.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'm', text: 'Bring back a big one, Papa!', at: [0.36, 0.4], w: 0.3 }
          ]
        },
        {
          bg: { scene: 'shore', hz: 0.35, sun: false },
          props: [{ p: 'seal', x: 0.64, y: 0.94, s: 1.6 }],
          cast: [{ c: 'miyaxKid', pose: 'kneelWork', expr: 'determined', x: 0.3, y: 0.95, s: 2.2, hold: 'ulu' }],
          text: [{ t: 'cap', text: 'Miyax helped with her own little [[ulu]].', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'shore', hz: 0.5, sun: false },
          props: [{ p: 'bird', x: 0.6, y: 0.2, s: 1.4 }, { p: 'bird', x: 0.7, y: 0.26, s: 1.1 }, { p: 'bird', x: 0.78, y: 0.18, s: 1 }],
          cast: [
            { c: 'kapugen', id: 'k', pose: 'point', expr: 'warm', x: 0.28, y: 0.95, s: 1.4, headTilt: -20, tweak: { arms: { n: [140, 150], f: [-8, -2] } } },
            { c: 'miyaxKid', pose: 'standLook', expr: 'happy', x: 0.6, y: 0.95, s: 1.4 }
          ],
          text: [{ t: 'say', who: 'k', text: 'Watch the birds. They tell you when a storm is coming.', at: [0.5, 0.2], w: 0.9 }]
        },
        {
          bg: { scene: 'shore', hz: 0.5, sun: false },
          cast: [{ c: 'miyaxKid', id: 'm', pose: 'sit', expr: 'thinking', x: 0.5, y: 0.95, s: 2.2 }],
          text: [{ t: 'cap', text: 'He taught her to read the wind, the ice and the animals.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'shore', hz: 0.55, sun: false, sky: M, clouds: [[0.8, 0.14, 0.7]] },
          props: [{ p: 'tent', x: 0.84, y: 0.74, s: 1 }, { p: 'dryRack', x: 0.58, y: 0.78, s: 0.9 }],
          cast: [
            { c: 'kapugen', pose: 'kneelHold', expr: 'joy', x: 0.24, y: 0.95, s: 1.4 },
            { c: 'miyaxKid', pose: 'frontDance', expr: 'joy', x: 0.38, y: 0.95, s: 1.4 }
          ],
          text: [{ t: 'cap', text: 'They were poor, but they were happy.', at: 'tl', w: 0.6 }]
        }
      ]
    },

    // ---------- Page 3: Kapugen's wolf story ----------
    {
      rows: [[1.2, 1], [1.1, 1, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tent' },
          props: [{ p: 'lamp', x: 0.5, y: 0.88, s: 1.6 }],
          cast: [
            { c: 'kapugen', id: 'k', pose: 'sit', expr: 'serious', x: 0.28, y: 0.9, s: 1.9 },
            { c: 'miyaxKid', id: 'm', pose: 'sit', expr: 'surprised', x: 0.74, y: 0.92, s: 1.9, flip: true }
          ],
          text: [
            { t: 'cap', text: 'At night, by the seal-oil lamp, Kapugen told stories.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'k', text: 'Once, when I was young, a blizzard trapped me far from home. I had no food.', at: [0.62, 0.22], w: 0.45 }
          ]
        },
        {
          style: 'memory',
          bg: { scene: 'tundra', sky: 'grey', hz: 0.5, sun: false, tufts: 2, polygons: false, palette: { land: '#e8eef2', land2: '#c9d3dc', far: '#9aa7b4' } },
          cast: [
            { c: 'kapugen', pose: 'sit', expr: 'tired', x: 0.3, y: 0.92, s: 1.3, hood: 'up' },
            { c: 'amaroq', pose: 'stand', x: 0.72, y: 0.8, s: 0.7, flip: true },
            { c: 'silver', pose: 'sit', x: 0.86, y: 0.82, s: 0.62, flip: true }
          ],
          fx: [{ type: 'tint', color: '#ffffff', o: 0.18 }],
          text: [{ t: 'cap', text: 'A wolf pack found him.', at: 'tl', w: 0.95 }]
        },
        {
          style: 'memory',
          bg: { scene: 'tundra', sky: 'grey', hz: 0.5, sun: false, tufts: 2, polygons: false, palette: { land: '#e8eef2', land2: '#c9d3dc', far: '#9aa7b4' } },
          props: [{ p: 'meat', x: 0.5, y: 0.92, s: 1.4 }],
          cast: [
            { c: 'kapugen', pose: 'proneReach', expr: 'hopeful', x: 0.2, y: 0.94, s: 1.2, hood: 'up' },
            { c: 'amaroq', pose: 'greet', x: 0.76, y: 0.93, s: 1, flip: true }
          ],
          text: [{ t: 'cap', text: 'He spoke to them the way wolves speak, and they shared their meat.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tent' },
          cast: [{ c: 'kapugen', id: 'k', pose: 'sit', expr: 'warm', s: 4.2, fit: ['face', 0.5, 0.58] }],
          text: [{ t: 'say', who: 'k', text: 'Wolves are brotherly. Remember that, Miyax.', at: [0.5, 0.18], w: 0.85, tailMax: 60 }]
        },
        {
          bg: { scene: 'tent' },
          props: [{ p: 'lamp', x: 0.3, y: 0.9, s: 1.3 }],
          cast: [{ c: 'miyaxKid', pose: 'sleep', expr: 'sleep', x: 0.58, y: 0.92, s: 2.2 }],
          text: [{ t: 'cap', text: 'She fell asleep dreaming of wolves.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tent' },
          cast: [{ c: 'kapugen', pose: 'sit', expr: 'warm', x: 0.5, y: 0.92, s: 2, headTilt: -20 }],
          text: [{ t: 'cap', text: 'Kapugen watched over her.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 4: the Bladder Feast ----------
    {
      rows: [[1.25, 1], [1, 1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: { scene: 'ice', sky: 'dusk', hz: 0.42 },
          cast: [
            { c: 'kapugen', pose: 'frontDance', expr: 'joy', x: 0.2, y: 0.92, s: 1.6 },
            { c: 'kidA', pose: 'frontDance', expr: 'joy', x: 0.42, y: 0.9, s: 1.5 },
            { c: 'miyaxKid', id: 'm', pose: 'frontDance', expr: 'joy', x: 0.6, y: 0.93, s: 1.6, hold: 'fan' },
            { c: 'naka', pose: 'frontHappy', expr: 'joy', x: 0.84, y: 0.9, s: 1.5 }
          ],
          text: [
            { t: 'cap', text: 'In winter, families from other camps came for the [[Bladder Feast]]. There were drums, songs and dancing.', at: 'tl', w: 0.55 },
            { t: 'sfx', text: 'BOOM BOOM', at: [0.78, 0.3], size: 44, rot: 6 }
          ]
        },
        {
          bg: { scene: 'ice', sky: 'dusk', hz: 0.4 },
          props: [{ p: 'bladder', x: 0.3, y: 0.8, s: 1.6 }, { p: 'bladder', x: 0.55, y: 0.84, s: 1.4 }, { p: 'bladder', x: 0.76, y: 0.8, s: 1.6 }],
          text: [{ t: 'cap', text: 'The bladders of the seals they had caught were blown up and painted.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'ice', sky: 'dusk', hz: 0.35, openWater: [0.55, 0.82, 0.24] },
          props: [{ p: 'bladder', x: 0.55, y: 0.84, s: 1.3 }],
          cast: [{ c: 'kapugen', pose: 'kneelWork', expr: 'serious', x: 0.26, y: 0.92, s: 1.5 }],
          text: [{ t: 'cap', text: 'Then they pushed them back into the sea...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'ice', sky: 'dusk', hz: 0.4 },
          cast: [{ c: 'miyaxKid', id: 'm', pose: 'standLook', expr: 'warm', x: 0.5, y: 0.94, s: 2.2 }],
          text: [{ t: 'cap', text: '...so the spirits of the seals could go home and come back as new seals.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'ice', sky: 'memory', hz: 0.5 },
          cast: [{ c: 'miyaxKid', id: 'm', pose: 'frontHappy', expr: 'joy', x: 0.3, y: 0.95, s: 2.3 }],
          props: [{ p: 'seal', x: 0.72, y: 0.72, s: 1.6 }],
          text: [{ t: 'cap', text: 'Miyax loved the old ways. She thought life at seal camp would go on forever.', at: 'tr', w: 0.55 }]
        }
      ]
    },

    // ---------- Page 5: Aunt Martha comes ----------
    {
      rows: [[1.2, 1], [1, 0.8, 0.8, 1.4], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'shore', hz: 0.45, sun: false, sky: 'grey' },
          props: [{ p: 'tent', x: 0.86, y: 0.7, s: 1 }],
          cast: [
            { c: 'martha', id: 'ma', pose: 'point', expr: 'serious', x: 0.3, y: 0.94, s: 1.9, tweak: { arms: { n: [70, 80], f: [-8, -2] } } },
            { c: 'kapugen', id: 'k', pose: 'stand', expr: 'sad', x: 0.6, y: 0.94, s: 1.9, flip: true },
            { c: 'miyaxKid', pose: 'stand', expr: 'worried', x: 0.74, y: 0.95, s: 1.9, flip: true, size: 1.3 }
          ],
          text: [
            { t: 'cap', text: 'When Miyax was nine, Kapugen\'s aunt, Martha, came to camp.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'ma', text: 'The law says the child must go to school!', at: [0.2, 0.24], w: 0.3 }
          ]
        },
        {
          bg: { scene: 'shore', hz: 0.3, sun: false, sky: 'grey' },
          cast: [{ c: 'kapugen', id: 'k', pose: 'stand', expr: 'sad', s: 4, fit: ['face', 0.5, 0.6] }],
          text: [{ t: 'cap', text: 'Kapugen knew she was right.', at: 'bl', w: 0.95 }]
        },
        {
          bg: { scene: 'shore', hz: 0.3, sun: false, sky: 'grey' },
          cast: [
            { c: 'kapugen', id: 'k', pose: 'kneelHold', expr: 'sad', x: 0.36, y: 0.96, s: 1.8 },
            { c: 'miyaxKid', id: 'm', pose: 'stand', expr: 'sad', x: 0.66, y: 0.96, s: 1.8, flip: true, size: 1.3, opts: { tears: true } }
          ],
          text: [{ t: 'say', who: 'k', text: 'Go to school. Learn.', at: [0.4, 0.2], w: 0.6 }]
        },
        {
          bg: { scene: 'shore', hz: 0.3, sun: false, sky: 'grey' },
          cast: [{ c: 'kapugen', id: 'k', pose: 'kneelHold', expr: 'serious', s: 3.4, fit: ['face', 0.5, 0.62] }],
          text: [{ t: 'say', who: 'k', text: 'If you are ever unhappy there, you can marry Daniel, my friend Naka\'s son, when you are thirteen.', at: [0.5, 0.2], w: 0.9, tailMax: 50 }]
        },
        {
          bg: { scene: 'shore', hz: 0.46, sun: false, sky: 'grey' },
          props: [{ p: 'kayak', x: 0.7, y: 0.52, s: 0.6 }],
          cast: [{ c: 'kapugen', pose: 'wave', expr: 'sad', x: 0.74, y: 0.94, s: 1.4 }],
          text: [{ t: 'cap', text: 'Miyax sailed away with Aunt Martha. The last thing she saw was Kapugen, waving from the shore.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.4], size: 44, color: '#f2c230' },
            { t: 'title', text: 'Mekoryuk', at: [0.5, 0.66], size: 72 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
