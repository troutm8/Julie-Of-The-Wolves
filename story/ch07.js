// Chapter 7: Barrow (end of Part Two)
(function (JW) {
  'use strict';
  const HOUSE = ['#c9b79c', '#9fb2b8', '#c98f73', '#d9d1bd', '#b8c98f'];
  const home = (extra) => Object.assign({ scene: 'room', wall: '#cdd7d9', floor: '#6f5a48' }, extra);

  JW.addChapter(7, [
    // ---------- Page 1: arrival ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'grey', hz: 0.5, snow: true, houses: 8, poles: true, dome: 0.88, flakes: 30, colors: HOUSE },
          props: [{ p: 'plane', x: 0.2, y: 0.74, s: 1.3 }],
          cast: [
            { c: 'naka', id: 'n', pose: 'stand', expr: 'serious', x: 0.5, y: 0.95, s: 1.7, flip: true },
            { c: 'nusan', id: 'nu', pose: 'wave', expr: 'happy', x: 0.64, y: 0.95, s: 1.65, flip: true },
            { c: 'daniel', id: 'd', pose: 'stand', expr: 'neutral', x: 0.8, y: 0.95, s: 1.7, flip: true, hood: 'up' },
            { c: 'miyax', id: 'm', pose: 'stand', expr: 'worried', x: 0.36, y: 0.96, s: 1.65, hold: 'bag' }
          ],
          text: [
            { t: 'title', text: 'Barrow', at: [0.5, 0.14], size: 100, sub: [{ text: 'Chapter 7', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: '[[Barrow]]: flat, windy and cold, at the very top of Alaska.', at: 'bl', w: 0.34 }
          ]
        },
        {
          bg: home({ items: [{ t: 'window', x: 0.75, y: 0.18, snow: true }, { t: 'stove', x: 0.12 }] }),
          cast: [
            { c: 'nusan', id: 'nu', pose: 'kneelHold', expr: 'joy', x: 0.36, y: 0.95, s: 1.6 },
            { c: 'miyax', pose: 'stand', expr: 'happy', x: 0.66, y: 0.95, s: 1.6, flip: true }
          ],
          text: [
            { t: 'cap', text: 'Naka\'s wife, Nusan, welcomed her.', at: 'tl', w: 0.95 },
            { t: 'say', who: 'nu', text: 'Welcome, daughter!', at: [0.5, 0.3], w: 0.6 }
          ]
        },
        {
          bg: home({ items: [{ t: 'window', x: 0.3, y: 0.18, snow: true }] }),
          cast: [{ c: 'daniel', id: 'd', pose: 'stand', expr: 'worried', x: 0.5, y: 0.95, s: 1.6, headTilt: -10 }],
          text: [{ t: 'cap', text: 'Daniel was older than Miyax, but he was shy and slow to learn, and the other boys teased him.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 2: a new family ----------
    {
      // 2 + 1 + 2 = 5 panels
      rows: [[1, 1, 1], [1.2, 1], [1, 1, 1]],
      panels: [
        {
          bg: home({ items: [{ t: 'frame', x: 0.5, y: 0.14, color: '#e8c98d' }] }),
          cast: [
            { c: 'naka', pose: 'stand', expr: 'happy', x: 0.16, y: 0.95, s: 1.25 },
            { c: 'daniel', pose: 'stand', expr: 'neutral', x: 0.42, y: 0.95, s: 1.25 },
            { c: 'miyax', pose: 'stand', expr: 'worried', x: 0.62, y: 0.95, s: 1.25, flip: true },
            { c: 'nusan', pose: 'stand', expr: 'happy', x: 0.86, y: 0.95, s: 1.25, flip: true }
          ],
          text: [{ t: 'cap', text: 'The wedding was only a few words and a paper to sign. Miyax and Daniel were still children, and they lived like brother and sister.', at: 'tl', w: 0.95 }]
        },
        {
          bg: home({ items: [{ t: 'window', x: 0.5, y: 0.2, snow: true }] }),
          cast: [{ c: 'miyax', id: 'm', pose: 'stand', expr: 'hopeful', s: 4, fit: ['face', 0.5, 0.64] }],
          text: [{ t: 'think', who: 'm', text: 'At least now I have a family.', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        },
        {
          bg: home({ items: [{ t: 'parkas', x: 0.55, y: 0.12, s: 1.2 }, { t: 'table', x: 0.5 }], lamp: [0.5, 0.6] }),
          cast: [
            { c: 'nusan', id: 'nu', pose: 'kneelHold', expr: 'happy', x: 0.3, y: 0.95, s: 1.8 },
            { c: 'miyax', id: 'm', pose: 'kneelHold', expr: 'determined', x: 0.7, y: 0.95, s: 1.8, flip: true }
          ],
          text: [
            { t: 'cap', text: 'Nusan was kind. She taught Miyax to sew fur parkas to sell to visitors.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'nu', text: 'Small stitches. Like this.', at: [0.5, 0.52], w: 0.3 }
          ]
        },
        {
          bg: { scene: 'village', sky: 'grey', hz: 0.55, houses: 6, poles: true, colors: HOUSE },
          cast: [
            { c: 'pearl', id: 'p', pose: 'walk', expr: 'happy', x: 0.36, y: 0.95, s: 1.6 },
            { c: 'miyax', id: 'm', pose: 'walk', expr: 'happy', x: 0.62, y: 0.95, s: 1.6, flip: true }
          ],
          text: [
            { t: 'cap', text: 'She made a friend, Pearl.', at: 'tl', w: 0.95 },
            { t: 'say', who: 'p', text: 'Ships stop at Point Hope in summer. Some go all the way to San Francisco!', at: [0.5, 0.3], w: 0.9 }
          ]
        },
        {
          bg: { scene: 'city' },
          fx: [{ type: 'vignette', color: '#fff6d8', o: 0.9 }],
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'hopeful', s: 3.8, fit: ['face', 0.5, 0.7] }],
          text: [{ t: 'think', who: 'm', text: 'San Francisco... Amy...', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        }
      ]
    },

    // ---------- Page 3: trouble in the house ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.1, 1], [1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'night', hz: 0.55, houses: 5, lit: true, colors: HOUSE, sea: false },
          text: [
            { t: 'cap', text: 'But some nights Naka came home late, loud and angry, and the whole house shook.', at: 'tl', w: 0.55 },
            { t: 'sfx', text: 'CRASH!', at: [0.62, 0.45], size: 64, rot: -8, color: '#e98c3a' }
          ]
        },
        {
          bg: home({ items: [{ t: 'bed', x: 0.5, s: 1.2, color: '#5f7f9a' }, { t: 'door', x: 0.88, s: 1.1 }], lamp: [0.3, 0.3] }),
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'scared', x: 0.44, y: 0.78, s: 1.5, tweak: { arms: { n: [150, 220], f: [140, 210] } } }],
          text: [{ t: 'cap', text: 'Miyax hid in her room.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'village', sky: 'grey', hz: 0.55, houses: 5, colors: HOUSE },
          cast: [
            { c: 'kidA', id: 'b1', pose: 'point', expr: 'joy', x: 0.2, y: 0.95, s: 1.6, size: 1.2 },
            { c: 'kidB', pose: 'stand', expr: 'joy', x: 0.4, y: 0.95, s: 1.6, size: 1.2, opts: { hair: 'short', bangs: false } },
            { c: 'daniel', id: 'd', pose: 'stand', expr: 'determined', x: 0.78, y: 0.95, s: 1.6, flip: true }
          ],
          text: [{ t: 'say', who: 'b1', text: 'Ha ha! Your wife won\'t even talk to you, Daniel!', at: [0.36, 0.28], w: 0.62 }]
        },
        {
          bg: { scene: 'burst', color: '#c9573f', ray: '#d97a5f', cx: 0.5, cy: 0.6 },
          cast: [{ c: 'daniel', id: 'd', pose: 'stand', expr: 'determined', s: 4, fit: ['face', 0.5, 0.64], flip: true }],
          text: [{ t: 'cap', text: 'Daniel grew angry and ashamed.', at: 'bl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 4: Daniel frightens her ----------
    {
      // 2 + 2 + 1 = 5 panels
      rows: [[1, 1, 1], [1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: home({ items: [{ t: 'door', x: 0.3, s: 1.2 }], lamp: [0.3, 0.4] }),
          cast: [{ c: 'daniel', id: 'd', pose: 'stand', expr: 'determined', x: 0.36, y: 0.95, s: 1.8 }],
          text: [
            { t: 'cap', text: 'That evening, Daniel burst into her room.', at: 'tl', w: 0.95 },
            { t: 'shout', who: 'd', text: 'They all laugh at me!', at: [0.66, 0.6], w: 0.5 }
          ]
        },
        {
          bg: home({}),
          cast: [{ c: 'miyax', id: 'm', pose: 'stand', expr: 'scared', s: 4, fit: ['face', 0.5, 0.62], flip: true }],
          text: []
        },
        {
          bg: { scene: 'burst', color: '#7a3a4a', ray: '#94505e', cx: 0.5, cy: 0.5 },
          cast: [
            { c: 'daniel', pose: 'reach', expr: 'determined', x: 0.3, y: 0.97, s: 1.7 },
            { c: 'miyax', id: 'm', pose: 'stand', expr: 'scared', x: 0.72, y: 0.97, s: 1.6, flip: true, tweak: { torso: 170, arms: { n: [-60, -80], f: [-40, -60] } } }
          ],
          text: [
            { t: 'cap', text: 'He grabbed her roughly.', at: 'tl', w: 0.95 },
            { t: 'shout', who: 'm', text: 'Stop! Let go!', at: [0.66, 0.34], w: 0.4 }
          ]
        },
        {
          bg: { scene: 'plain', color: '#101218' },
          text: [{ t: 'cap', text: 'She pulled free, and at last he left. But Daniel had frightened her badly.', at: [0.08, 0.36], w: 0.84, fill: '#d8e2ef' }]
        },
        {
          bg: home({ items: [{ t: 'window', x: 0.7, y: 0.18, night: true, sky: '#1f2d5c' }], lamp: [0.3, 0.7] }),
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'determined', x: 0.34, y: 0.95, s: 2 }],
          text: [{ t: 'think', who: 'm', text: 'I cannot stay here. Not one more day.', at: [0.62, 0.3], w: 0.5 }]
        }
      ]
    },

    // ---------- Page 5: running away ----------
    {
      // 2 + 1 + 1 = 4 panels
      rows: [[1, 1, 1], [1.3, 1], [1, 1]],
      panels: [
        {
          bg: { scene: 'plain', color: '#8a6a4a' },
          props: [
            { p: 'pot', x: 0.2, y: 0.9, s: 1.5 }, { p: 'ulu', x: 0.42, y: 0.84, s: 1.8 }, { p: 'pack', x: 0.68, y: 0.92, s: 1.6 },
            { p: 'meat', x: 0.85, y: 0.9, s: 1.3 }, { p: 'hide', x: 0.5, y: 0.98, s: 1.2, z: -1 }
          ],
          text: [{ t: 'cap', text: 'Before dawn she packed: her ulu, needles, matches, a pot, her sleeping skin and a little food.', at: 'tl', w: 0.95 }]
        },
        {
          bg: home({ items: [{ t: 'door', x: 0.5, s: 1.3 }] }),
          cast: [{ c: 'miyax', pose: 'walk', expr: 'determined', x: 0.36, y: 0.95, s: 1.8, hold: 'pack' }],
          text: [{ t: 'cap', text: 'Quietly, she slipped out the door.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'grey', hz: 0.5, sun: false, tufts: 14, cotton: 4 },
          props: [{ p: 'houses', x: 0.82, y: 0.5, s: 0.7 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'determined', x: 0.34, y: 0.93, s: 1.9, flip: true, hold: 'pack' }],
          text: [{ t: 'cap', text: 'It was summer. She walked out onto the tundra, toward [[Point Hope]] and a ship that could take her to San Francisco.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'tundra', sky: 'lime', hz: 0.62, sun: [0.8, 0.3, 0.04], tufts: 8, flat: true },
          cast: [{ c: 'miyax', pose: 'frontLook', expr: 'worried', x: 0.5, y: 0.8, s: 0.5 }],
          text: [{ t: 'cap', text: 'But the tundra went on and on, with no roads and no trees. Soon she was lost...', at: 'tl', w: 0.6 }]
        }
      ]
    },

    // ---------- Page 6: back to the wolves ----------
    {
      rows: [[1.4, 1], [1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.5, sun: [0.86, 0.44, 0.045], tufts: 10, fg: { x: 0.45, y: 1.05, w: 1.4, h: 0.3 } },
          props: [{ p: 'sodHouse', x: 0.3, y: 0.88, s: 1.3 }],
          cast: [
            { c: 'miyax', id: 'm', pose: 'sit', expr: 'warm', x: 0.56, y: 0.88, s: 1.6 },
            { c: 'kapu', pose: 'sit', x: 0.74, y: 0.88, s: 1.2, flip: true }
          ],
          text: [{ t: 'cap', text: '...and that was how she came to the wolves.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'End of Part Two', at: [0.5, 0.36], size: 56, color: '#f2c230' },
            { t: 'title', text: 'Part Three: Kapugen, the Hunter', at: [0.5, 0.66], size: 46 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
