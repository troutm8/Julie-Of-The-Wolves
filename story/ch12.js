// Chapter 12: Kapugen (the end)
(function (JW) {
  'use strict';
  const snowBg = (extra) => Object.assign({ scene: 'tundra', sky: 'snow', sun: false, tufts: 0, polygons: false }, extra);
  const HOUSE = ['#c9b79c', '#9fb2b8', '#c98f73', '#d9d1bd', '#b8c98f'];
  const house = (extra) => Object.assign({ scene: 'room', wall: '#e6dcc4', floor: '#8a6a4a' }, extra);

  JW.addChapter(12, [
    // ---------- Page 1: Kangik ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'snowDusk', hz: 0.55, snow: true, houses: 6, lit: true, poles: true, colors: HOUSE, sea: false },
          props: [{ p: 'plane', x: 0.82, y: 0.64, s: 0.9 }, { p: 'plover', x: 0.2, y: 0.66, s: 0.6, z: 5 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'hopeful', x: 0.23, y: 0.92, s: 1.6, hood: 'down', hold: 'pack' }],
          text: [
            { t: 'title', text: 'Kapugen', at: [0.5, 0.14], size: 110, sub: [{ text: 'Chapter 12', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'Kangik. Warm lights glowed in every window.', at: 'br', w: 0.45 }
          ]
        },
        {
          bg: house({ items: [{ t: 'door', x: 0.5, s: 1.3 }] }),
          cast: [{ c: 'kapugen', id: 'k', pose: 'stand', expr: 'surprised', x: 0.5, y: 0.95, s: 1.5 }],
          text: [{ t: 'shout', who: 'k', text: 'Miyax?!', at: [0.5, 0.2], w: 0.6 }]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.5, cy: 0.6 },
          cast: [
            { c: 'kapugen', pose: 'kneelHold', expr: 'joy', x: 0.36, y: 0.96, s: 1.7 },
            { c: 'miyax', pose: 'reach', expr: 'joy', x: 0.66, y: 0.96, s: 1.6, flip: true, hood: 'down', opts: { tears: true } }
          ],
          text: [{ t: 'cap', text: 'Her father was alive!', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 2: a different Kapugen ----------
    {
      // 1 + 2 + 2 = 5 panels
      rows: [[1.25, 1], [1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: house({ items: [{ t: 'bulb', x: 0.5, y: 0.06 }, { t: 'radio', x: 0.2, y: 0.4 }, { t: 'table', x: 0.5 }, { t: 'window', x: 0.84, y: 0.18, snow: true }] }),
          cast: [
            { c: 'kapugen', id: 'k', pose: 'point', expr: 'happy', x: 0.3, y: 0.95, s: 1.5, tweak: { arms: { n: [60, 70], f: [-8, -2] } } },
            { c: 'ellen', id: 'e', pose: 'stand', expr: 'happy', x: 0.5, y: 0.95, s: 1.45 },
            { c: 'miyax', pose: 'stand', expr: 'surprised', x: 0.76, y: 0.95, s: 1.45, flip: true, hood: 'down' }
          ],
          text: [
            { t: 'cap', text: 'Kapugen\'s house had electric lights, a radio, and a new wife from far away. Her name was Ellen.', at: 'tl', w: 0.55 },
            { t: 'say', who: 'e', text: 'Welcome home, Julie!', at: [0.62, 0.42], w: 0.3 }
          ]
        },
        {
          bg: house({ items: [{ t: 'photoPlane', x: 0.5, y: 0.2, s: 1.6 }] }),
          text: [{ t: 'cap', text: 'On the wall was a picture of an airplane.', at: 'tl', w: 0.95 }]
        },
        {
          bg: house({}),
          cast: [{ c: 'kapugen', id: 'k', pose: 'stand', expr: 'happy', s: 3.6, fit: ['face', 0.5, 0.62] }],
          text: [{ t: 'say', who: 'k', text: 'That is my plane. I hunt with it now.', at: [0.5, 0.18], w: 0.9, tailMax: 50 }]
        },
        {
          bg: { scene: 'burst', color: '#8e9fb4', ray: '#a9b8c8', cx: 0.5, cy: 0.6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'scared', s: 4.2, fit: ['face', 0.5, 0.64], hood: 'down' }],
          text: [{ t: 'think', who: 'm', text: 'A plane... like the one that killed Amaroq.', at: [0.5, 0.2], w: 0.9, tailMax: 50 }]
        },
        {
          bg: house({ items: [{ t: 'window', x: 0.5, y: 0.18, night: true, sky: '#1f2d5c' }] }),
          cast: [{ c: 'miyax', pose: 'sit', expr: 'sad', x: 0.5, y: 0.95, s: 1.8, hood: 'down' }],
          text: [{ t: 'cap', text: 'Kapugen had changed. He had given up the old ways.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 3: Tornait ----------
    {
      // 2 + 1 = 3 panels
      rows: [[1, 1, 1], [1.4, 1]],
      panels: [
        {
          bg: house({ items: [{ t: 'window', x: 0.5, y: 0.18, night: true, sky: '#1f2d5c' }] }),
          props: [{ p: 'plover', x: 0.5, y: 0.82, s: 3, rot: 80 }],
          text: [{ t: 'cap', text: 'That night, little Tornait died. The long cold journey had been too much for him.', at: 'tl', w: 0.95 }]
        },
        {
          bg: house({ items: [{ t: 'window', x: 0.7, y: 0.18, night: true, sky: '#1f2d5c' }] }),
          cast: [{ c: 'miyax', id: 'm', pose: 'kneelHold', expr: 'sad', x: 0.4, y: 0.95, s: 1.8, hood: 'down', opts: { tears: true } }],
          text: [{ t: 'cap', text: 'Miyax held him and cried.', at: 'tl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.55, sky: 'snowNight', aurora: true, flat: true }),
          props: [{ p: 'houses', x: 0.82, y: 0.55, s: 0.6 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'sad', x: 0.3, y: 0.9, s: 1.6, hood: 'up', flip: true }],
          text: [{ t: 'cap', text: 'She wrapped him gently and carried him out onto the snow, away from the village, to bury him.', at: 'tl', w: 0.55 }]
        }
      ]
    },

    // ---------- Page 4: the song ----------
    {
      // 1 + 1 + 1 = 3 panels
      rows: [[1.5, 1], [1, 1], [0.8, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.62, sky: 'snowNight', aurora: true, moon: [0.8, 0.18, 0.035], flat: true }),
          cast: [{ c: 'miyax', id: 'm', pose: 'sitLook', expr: 'sad', x: 0.4, y: 0.9, s: 1.7, hood: 'down' }],
          text: [
            { t: 'cap', text: 'Under the northern lights, she sang to the spirit of Amaroq.', at: 'tl', w: 0.55 },
            { t: 'say', who: 'm', text: 'Amaroq, ilaya... the hour of the wolf and the Eskimo is over.', at: [0.7, 0.44], w: 0.4 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'snowNight', aurora: true },
          cast: [{ c: 'amaroq', pose: 'howl', x: 0.5, y: 1.02, s: 2.2, opacity: 0.55 }],
          fx: [{ type: 'tint', color: '#9fd8ff', o: 0.12 }],
          text: [{ t: 'cap', text: 'The old ways were ending, for the wolves and for her people.', at: 'bl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowNight' }),
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'serious', s: 4.4, fit: ['face', 0.5, 0.62], hood: 'down' }],
          text: [{ t: 'think', who: 'm', text: 'But Kapugen is still my father.', at: [0.5, 0.18], w: 0.9, tailMax: 50 }]
        }
      ]
    },

    // ---------- Page 5: home ----------
    {
      rows: [[1, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'snowNight', hz: 0.5, snow: true, houses: 5, lit: true, colors: HOUSE, sea: false, aurora: true },
          cast: [{ c: 'miyax', pose: 'walk', expr: 'determined', x: 0.36, y: 0.9, s: 2.4, hood: 'up' }],
          text: [
            { t: 'cap', text: 'Julie turned around, and pointed her boots toward Kapugen.', at: [0.5, 0.06], w: 0.8, center: true },
            { t: 'title', text: 'The End', at: [0.5, 0.97], size: 90, color: '#f2c230' }
          ]
        }
      ]
    }
  ]);
})(window.JW);
