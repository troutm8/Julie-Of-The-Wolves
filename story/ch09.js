// Chapter 9: Jello
(function (JW) {
  'use strict';
  const SNOW = { sky: 'snow', tufts: 0, polygons: false };
  const snowBg = (extra) => Object.assign({ scene: 'tundra', sun: false }, SNOW, extra);

  JW.addChapter(9, [
    // ---------- Page 1: title ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.55, sky: 'snowDusk', sun: [0.2, 0.5, 0.04] }),
          props: [{ p: 'snowHouse', x: 0.72, y: 0.84, s: 1.3 }, { p: 'pack', x: 0.9, y: 0.86, s: 1.2 }],
          cast: [{ c: 'jello', id: 'j', pose: 'cower', x: 0.3, y: 0.86, s: 1.3, eye: 'wide' }],
          text: [
            { t: 'title', text: 'Jello', at: [0.5, 0.15], size: 110, sub: [{ text: 'Chapter 9', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'Jello was always hungry and always last. Now the other wolves were driving him away from the pack.', at: 'bl', w: 0.5 }
          ]
        },
        {
          bg: snowBg({ hz: 0.45 }),
          cast: [
            { c: 'nails', pose: 'glare', x: 0.34, y: 0.93, s: 1.1 },
            { c: 'jello', pose: 'cower', x: 0.78, y: 0.95, s: 1, flip: true }
          ],
          text: [{ t: 'sfx', text: 'GRRR!', at: [0.4, 0.3], size: 50, color: '#b3352b' }]
        },
        {
          bg: snowBg({ hz: 0.45 }),
          cast: [{ c: 'jello', id: 'j', pose: 'lookBack', x: 0.5, y: 0.93, s: 1.2, ears: 'back', eye: 'wide' }],
          text: [{ t: 'cap', text: 'He began to watch Miyax\'s camp.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 2: the theft ----------
    {
      // 2 + 1 + 2 = 5 panels
      rows: [[1, 1, 1], [1.2, 1], [1, 1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.5 }),
          cast: [{ c: 'miyax', pose: 'walk', expr: 'neutral', x: 0.46, y: 0.95, s: 1.8, hood: 'down' }],
          text: [{ t: 'cap', text: 'One day Miyax left her camp to gather moss for her lamp.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.5 }),
          props: [{ p: 'snowHouse', x: 0.5, y: 0.9, s: 1.1 }, { p: 'tracks', x: 0.5, y: 0.96, s: 0.9 }],
          text: [
            { t: 'cap', text: 'When she came back, her camp was torn apart.', at: 'tl', w: 0.95 },
            { t: 'sfx', text: '!!', at: [0.8, 0.3], size: 70 }
          ]
        },
        {
          bg: snowBg({ hz: 0.55 }),
          cast: [
            { c: 'jello', pose: 'run', x: 0.62, y: 0.78, s: 0.7 },
            { c: 'miyax', id: 'm', pose: 'wave', expr: 'scared', x: 0.18, y: 0.95, s: 1.9, hood: 'down' }
          ],
          props: [{ p: 'pack', x: 0.72, y: 0.66, s: 0.6, rot: 20 }],
          text: [
            { t: 'shout', who: 'm', text: 'Jello! Bring it back!', at: [0.42, 0.28], w: 0.36 },
            { t: 'cap', text: 'Jello was running off with her pack in his jaws!', at: 'br', w: 0.5 }
          ]
        },
        {
          bg: snowBg({ hz: 0.4 }),
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'sad', x: 0.5, y: 0.95, s: 1.8, hood: 'up' }],
          text: [{ t: 'cap', text: 'Her food, her needles and her sleeping skin were all gone.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowNight' }),
          cast: [{ c: 'miyax', pose: 'sit', expr: 'tired', x: 0.4, y: 0.95, s: 1.8, hood: 'up' }],
          fx: [{ type: 'snow' }],
          text: [{ t: 'cap', text: 'That night was bitterly cold.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 3: Kapu keeps her warm ----------
    {
      // 1 + 1 = 2 panels... plus a row of 2 = 4
      rows: [[1.4, 1], [1, 1, 1], [0.8, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.5, sky: 'snowNight', aurora: true }),
          cast: [
            { c: 'miyax', pose: 'sleep', expr: 'sleep', x: 0.42, y: 0.9, s: 1.9, hood: 'up', opts: { sleepSkin: '#86705c' } },
            { c: 'kapu', pose: 'sleep', x: 0.3, y: 0.95, s: 1.5, z: 2 }
          ],
          text: [{ t: 'cap', text: 'Then Kapu came. He curled up against her and kept her warm all night long.', at: 'tl', w: 0.55 }]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowDusk' }),
          cast: [{ c: 'miyax', id: 'm', pose: 'sleep', expr: 'warm', x: 0.5, y: 0.9, s: 2.4, hood: 'up', opts: { sleepSkin: '#86705c' } }],
          text: [{ t: 'whisper', who: 'm', text: 'Thank you, Kapu.', at: [0.4, 0.3], w: 0.6 }]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowDusk' }),
          cast: [{ c: 'kapu', id: 'k', pose: 'sit', x: 0.5, y: 0.94, s: 1.6, mouth: 'pant' }],
          text: [{ t: 'cue', who: 'k', part: 'head', text: '"That\'s what packs do."', at: [0.5, 0.2], w: 0.8 }]
        },
        {
          bg: { scene: 'plain', color: '#e4e9ee' },
          text: [{ t: 'cap', text: 'The next morning, Miyax followed Jello\'s tracks.', at: [0.5, 0.36], w: 0.8, center: true }]
        }
      ]
    },

    // ---------- Page 4: what the pack did ----------
    {
      // 2 + 1 + 1 = 4 panels
      rows: [[1, 1, 1], [1.2, 1], [0.9, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.45 }),
          props: [{ p: 'pack', x: 0.52, y: 0.92, s: 1.8 }],
          text: [{ t: 'cap', text: 'She found her pack, dropped in the snow.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.35 }),
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'sad', s: 4.2, fit: ['face', 0.5, 0.62], hood: 'up' }],
          text: [{ t: 'cap', text: 'And nearby, she found Jello. The wolves had turned on him. He was dead.', at: 'bl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.55 }),
          props: [{ p: 'pack', x: 0.62, y: 0.9, s: 1.2 }],
          cast: [{ c: 'miyax', pose: 'kneelHold', expr: 'serious', x: 0.4, y: 0.94, s: 1.8, hood: 'up', hold: 'ulu' }],
          text: [{ t: 'cap', text: 'Her ulu, her needles and her matches were still there. But most of her food was gone.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          props: [],
          text: [
            { t: 'cap', text: 'Miyax thought: out here, a wolf who breaks the pack\'s rules cannot survive.', at: [0.5, 0.18], w: 0.8, center: true },
            { t: 'title', text: 'Next: The Plane', at: [0.5, 0.78], size: 56 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
