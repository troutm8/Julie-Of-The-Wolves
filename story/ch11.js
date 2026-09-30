// Chapter 11: Winter Journey
(function (JW) {
  'use strict';
  const snowBg = (extra) => Object.assign({ scene: 'tundra', sky: 'snow', sun: false, tufts: 0, polygons: false }, extra);
  const dog = (c, x, y, s, flip) => ({ c, pose: 'trot', x, y, s, flip, tweak: { tail: -160, tailBend: 70 } });

  JW.addChapter(11, [
    // ---------- Page 1: title ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.55, sky: 'snowNight', aurora: true, moon: [0.82, 0.2, 0.03], flat: true }),
          props: [{ p: 'plover', x: 0.39, y: 0.64, s: 0.55, z: 5 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'determined', x: 0.42, y: 0.84, s: 1.3, hood: 'down', hold: 'pack' }],
          text: [
            { t: 'title', text: 'Winter Journey', at: [0.5, 0.15], size: 90, sub: [{ text: 'Chapter 11', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'Winter came, dark and cold. Miyax traveled on alone, with only Tornait for company.', at: 'br', w: 0.45 }
          ]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowNight' }),
          props: [{ p: 'snowHouse', x: 0.5, y: 0.92, s: 1.1, lit: true }],
          text: [{ t: 'cap', text: 'Each night she built a snow house.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#dfe7ee' },
          props: [{ p: 'lamp', x: 0.24, y: 0.94, s: 1 }, { p: 'plover', x: 0.66, y: 0.6, s: 1.4, z: 5 }],
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'warm', x: 0.56, y: 0.95, s: 1.7, hood: 'down' }],
          text: [{ t: 'say', who: 'm', text: 'We will be fine, Tornait.', at: [0.4, 0.2], w: 0.7 }]
        }
      ]
    },

    // ---------- Page 2: the storm ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.3, 1], [1, 1, 1], [0.9, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.55 }),
          props: [{ p: 'snowHouse', x: 0.6, y: 0.9, s: 1.3 }],
          fx: [{ type: 'snow', heavy: true }],
          text: [
            { t: 'cap', text: 'A blizzard roared across the tundra for days.', at: 'tl', w: 0.55 },
            { t: 'sfx', text: 'WHOOOOSH', at: [0.4, 0.5], size: 60, rot: -10, color: '#e4e9ee' }
          ]
        },
        {
          bg: { scene: 'plain', color: '#cfd8e0' },
          props: [{ p: 'lamp', x: 0.2, y: 0.94, s: 1 }, { p: 'meat', x: 0.74, y: 0.9, s: 1 }],
          cast: [{ c: 'miyax', pose: 'sit', expr: 'tired', x: 0.5, y: 0.95, s: 1.8, hood: 'up' }],
          text: [{ t: 'cap', text: 'She stayed inside and made her food last.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#cfd8e0' },
          props: [{ p: 'plover', x: 0.5, y: 0.82, s: 3.2 }],
          text: [{ t: 'cap', text: 'Tornait grew quiet and still.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.55, sun: [0.8, 0.3, 0.04] }),
          props: [{ p: 'snowHouse', x: 0.3, y: 0.9, s: 1.1 }],
          cast: [{ c: 'miyax', pose: 'standLook', expr: 'hopeful', x: 0.62, y: 0.92, s: 1.6, hood: 'up' }],
          text: [{ t: 'cap', text: 'At last the storm ended.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 3: sled tracks ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.2, 1], [1, 1, 1], [1.2, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.5, sun: [0.85, 0.24, 0.04], flat: true }),
          props: [{ p: 'tracks', x: 0.55, y: 0.8, s: 1.6 }],
          cast: [{ c: 'miyax', pose: 'crouch', expr: 'surprised', x: 0.2, y: 0.9, s: 1.5, hood: 'up' }],
          text: [{ t: 'cap', text: 'Then she found tracks in the snow: sled runners, and dogs!', at: 'tl', w: 0.6 }]
        },
        {
          bg: snowBg({ hz: 0.5, sky: 'snowDusk' }),
          props: [{ p: 'sled', x: 0.2, y: 0.92, s: 0.9, line: 140 }],
          cast: [dog('husky', 0.58, 0.9, 0.8), dog('husky2', 0.84, 0.9, 0.8)],
          text: [{ t: 'cap', text: 'A hunter and his wife were traveling by dogsled.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.45, sky: 'snowDusk' }),
          props: [{ p: 'fire', x: 0.5, y: 0.93, s: 1.4 }, { p: 'pot', x: 0.5, y: 0.84, s: 1, empty: false }],
          cast: [
            { c: 'hunterWife', id: 'w', pose: 'sit', expr: 'happy', x: 0.24, y: 0.95, s: 1.5 },
            { c: 'miyax', pose: 'sit', expr: 'happy', x: 0.78, y: 0.95, s: 1.5, flip: true, hood: 'down' }
          ],
          text: [{ t: 'say', who: 'w', text: 'Come, child. Have some hot tea.', at: [0.4, 0.2], w: 0.7 }]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowDusk' }),
          props: [{ p: 'fire', x: 0.5, y: 0.94, s: 1.3 }],
          cast: [
            { c: 'hunter', id: 'h', pose: 'sit', expr: 'happy', x: 0.24, y: 0.95, s: 1.8 },
            { c: 'miyax', id: 'm', pose: 'sit', expr: 'neutral', x: 0.78, y: 0.95, s: 1.8, flip: true, hood: 'down' }
          ],
          text: [
            { t: 'say', who: 'm', text: 'My father was a great hunter too. His name was Kapugen.', at: [0.72, 0.2], w: 0.42 },
            { t: 'say', who: 'h', text: 'Kapugen? I know him! He lives in Kangik.', at: [0.26, 0.36], w: 0.36 }
          ]
        }
      ]
    },

    // ---------- Page 4: he is alive ----------
    {
      // 1 + 1 + 1 = 3 panels
      rows: [[1.3, 1], [1, 1], [0.8, 1]],
      panels: [
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.5, cy: 0.6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'surprised', s: 4.6, fit: ['face', 0.5, 0.6], hood: 'down' }],
          text: [{ t: 'shout', who: 'm', text: 'Kapugen is ALIVE?!', at: [0.5, 0.16], w: 0.6 }]
        },
        {
          bg: snowBg({ hz: 0.55, sun: [0.2, 0.3, 0.04] }),
          props: [{ p: 'plover', x: 0.62, y: 0.52, s: 0.8, z: 5 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'joy', x: 0.66, y: 0.92, s: 1.9, hood: 'down', flip: true, hold: 'pack' }],
          text: [{ t: 'cap', text: 'All her plans to find a ship to San Francisco melted away. She set out for [[Kangik]], to find her father.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.38], size: 40, color: '#f2c230' },
            { t: 'title', text: 'Kapugen', at: [0.5, 0.72], size: 72 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
