// Chapter 6: Mekoryuk
(function (JW) {
  'use strict';
  const M = 'memory';
  // Miyax at nine to twelve years old, in a school kuspuk.
  const julie = (extra) => Object.assign({ c: 'miyaxKuspuk', size: 0.84 }, extra);

  JW.addChapter(6, [
    // ---------- Page 1: the village ----------
    {
      // rows: 1 + 3 = 4 panels
      rows: [[1.6, 1], [1, 1.5, 0.8, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: M, hz: 0.5, church: 0.72, school: 0.2, houses: 6, sun: [0.88, 0.18, 0.04] },
          cast: [
            { c: 'martha', id: 'ma', pose: 'walk', expr: 'serious', x: 0.46, y: 0.95, s: 1.9 },
            julie({ id: 'm', pose: 'walk', expr: 'worried', x: 0.62, y: 0.96, s: 1.9 })
          ],
          text: [
            { t: 'title', text: 'Mekoryuk', at: [0.5, 0.15], size: 100, sub: [{ text: 'Chapter 6', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: '[[Mekoryuk]], a village on [[Nunivak Island]]. Miyax lived with Aunt Martha now.', at: 'bl', w: 0.42 }
          ]
        },
        {
          bg: { scene: 'room', wall: '#e8e0c8', items: [{ t: 'board', x: 0.62, y: 0.12, s: 0.75, text: 'Julie', text2: 'Miyax' }, { t: 'flag', x: 0.06, y: 0.12, s: 0.7 }] },
          cast: [{ c: 'teacher', id: 't', pose: 'point', expr: 'happy', x: 0.2, y: 0.95, s: 1.4, tweak: { arms: { n: [120, 130], f: [-8, -2] } } }],
          text: [{ t: 'say', who: 't', text: 'At school, your name will be Julie.', at: [0.62, 0.66], w: 0.66 }]
        },
        {
          bg: { scene: 'room', wall: '#e8e0c8', items: [{ t: 'desk', x: 0.5, dy: 0.2, s: 1.4 }] },
          cast: [julie({ id: 'm', pose: 'front', expr: 'surprised', x: 0.5, y: 0.94, s: 1.7, z: -1 })],
          text: [{ t: 'think', who: 'm', text: 'Julie?', at: [0.5, 0.18], w: 0.6 }]
        },
        {
          bg: { scene: 'room', wall: '#e8e0c8', items: [{ t: 'shelf', x: 0.5, y: 0.35, s: 1.4 }] },
          cast: [julie({ pose: 'kneelHold', expr: 'happy', x: 0.5, y: 0.95, s: 1.7 })],
          props: [{ p: 'envelope', x: 0.62, y: 0.62, s: 0.7 }],
          text: [{ t: 'cap', text: 'She learned English, and read about the whole wide world.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 2: life with Martha ----------
    {
      // 2 + 1 + 2 = 5 panels
      rows: [[1, 1, 1], [1.2, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.7, y: 0.18 }, { t: 'stove', x: 0.2 }] },
          cast: [
            { c: 'martha', id: 'ma', pose: 'point', expr: 'serious', x: 0.3, y: 0.95, s: 1.6 },
            julie({ pose: 'carry', expr: 'tired', x: 0.74, y: 0.96, s: 1.6, flip: true, hold: 'pot' })
          ],
          text: [{ t: 'say', who: 'ma', text: 'Fetch the water! Then sweep!', at: [0.5, 0.18], w: 0.7 }]
        },
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.5, y: 0.18, night: true, sky: '#1f2d5c' }], lamp: [0.5, 0.6] },
          cast: [julie({ pose: 'sit', expr: 'sad', x: 0.5, y: 0.94, s: 1.8 })],
          text: [{ t: 'cap', text: 'Martha was strict. Miyax missed Kapugen every day.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'village', sky: 'grey', hz: 0.5, houses: 5, sea: true },
          cast: [
            { c: 'naka', id: 'n', pose: 'stand', expr: 'sad', x: 0.3, y: 0.95, s: 1.7, opts: { parka: '#6a5a7a', mustache: false, lines: false } },
            { c: 'martha', pose: 'stand', expr: 'worried', x: 0.56, y: 0.95, s: 1.7, flip: true },
            julie({ id: 'm', pose: 'stand', expr: 'scared', x: 0.76, y: 0.96, s: 1.7, flip: true })
          ],
          text: [
            { t: 'cap', text: 'One day a hunter brought terrible news.', at: 'tl', w: 0.45 },
            { t: 'say', who: 'n', text: 'Kapugen went out to hunt seals in his kayak... and he never came back.', at: [0.62, 0.3], w: 0.5 }
          ]
        },
        {
          bg: { scene: 'plain', color: '#34405a' },
          cast: [julie({ id: 'm', pose: 'stand', expr: 'sad', s: 4.2, fit: ['face', 0.5, 0.56], opts: { tears: true } })],
          text: [{ t: 'cap', text: 'Everyone said he had drowned in the sea.', at: 'bl', w: 0.95, fill: '#d8e2ef' }]
        },
        {
          bg: { scene: 'shore', hz: 0.5, sun: false, sky: 'grey' },
          cast: [julie({ pose: 'standLook', expr: 'sad', x: 0.4, y: 0.95, s: 1.7 })],
          text: [{ t: 'cap', text: 'For a long time, Miyax stood by the sea and looked out at the water.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 3: Amy's letters ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1, 1], [1, 1, 1], [1.4, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'day', hz: 0.55, houses: 5, sun: [0.8, 0.2, 0.04] },
          props: [{ p: 'plane', x: 0.5, y: 0.35, s: 1.1, spin: true }],
          text: [{ t: 'cap', text: 'The mail plane brought something wonderful: letters from a pen pal in [[San Francisco]], a girl named Amy.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'plain', color: '#c9a878' },
          props: [{ p: 'letter', x: 0.5, y: 0.95, s: 1.8, rot: 3, lines: ['Dear Julie,', 'I rode a cable car', 'today! It goes right', 'up the hills. My', 'room is pink. You', 'can have the other', 'bed!  Love, Amy'] }],
          text: []
        },
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.3, y: 0.2 }] },
          cast: [julie({ id: 'm', pose: 'kneelHold', expr: 'joy', x: 0.55, y: 0.95, s: 1.8, hold: 'envelope' })],
          text: [{ t: 'say', who: 'm', text: 'The other bed? For me?', at: [0.5, 0.2], w: 0.8 }]
        },
        {
          bg: { scene: 'city' },
          props: [{ p: 'cableCar', x: 0.55, y: 0.9, s: 1.8 }],
          cast: [julie({ pose: 'frontWave', expr: 'joy', x: 0.4, y: 0.78, s: 1.4 })],
          fx: [{ type: 'vignette', color: '#fff6d8', o: 0.8 }],
          text: [{ t: 'cap', text: 'Miyax dreamed of San Francisco: cable cars, tall buildings, a pink room, and a friend.', at: 'tl', w: 0.55 }]
        }
      ]
    },

    // ---------- Page 4: thirteen ----------
    {
      // 2 + 2 + 1 = 5 panels
      rows: [[1, 1, 1], [1, 1, 1], [1.2, 1]],
      panels: [
        {
          bg: { scene: 'village', sky: 'grey', hz: 0.5, houses: 6, snow: true, flakes: 20 },
          cast: [{ c: 'miyax', pose: 'walk', expr: 'neutral', x: 0.5, y: 0.95, s: 1.8, hood: 'up' }],
          text: [{ t: 'cap', text: 'The years went by. Miyax was thirteen now.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.7, y: 0.2, snow: true }] },
          props: [{ p: 'letter', x: 0.4, y: 0.9, s: 1.2, lines: ['Miyax,', 'It is time.', 'Come to Barrow,', 'as Kapugen', 'promised.', '    Naka'] }],
          text: [{ t: 'cap', text: 'Then a letter came from Naka, Kapugen\'s old friend, in Barrow.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.3, y: 0.2, snow: true }] },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'thinking', s: 4, fit: ['face', 0.5, 0.6] }],
          text: [{ t: 'think', who: 'm', text: 'Kapugen said I could marry Daniel and leave Martha\'s house.', at: [0.5, 0.2], w: 0.9, tailMax: 50 }]
        },
        {
          bg: { scene: 'room', items: [{ t: 'window', x: 0.3, y: 0.2, snow: true }] },
          cast: [
            { c: 'martha', id: 'ma', pose: 'stand', expr: 'serious', x: 0.3, y: 0.95, s: 1.7 },
            { c: 'miyax', id: 'm', pose: 'stand', expr: 'determined', x: 0.72, y: 0.95, s: 1.7, flip: true }
          ],
          text: [
            { t: 'say', who: 'm', text: 'I will go.', at: [0.7, 0.2], w: 0.4 },
            { t: 'say', who: 'ma', text: 'Go, then.', at: [0.26, 0.3], w: 0.4 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'grey', clouds: [[0.2, 0.3, 1.2], [0.7, 0.7, 1]] },
          props: [{ p: 'plane', x: 0.55, y: 0.6, s: 2, spin: true }],
          text: [{ t: 'cap', text: 'So Miyax flew north, to Barrow, at the top of Alaska.', at: 'tl', w: 0.5 }]
        }
      ]
    }
  ]);
})(window.JW);
