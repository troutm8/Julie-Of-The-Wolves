// Chapter 3: Food from the Pack
(function (JW) {
  'use strict';
  const L = 'lime';
  const denFg = (dx) => ({ x: 0.5, y: 1.08, w: 1.5, h: 0.34, den: { x: dx == null ? 0.25 : dx, y: 0.4, r: 0.03 }, tufts: 10 });

  JW.addChapter(3, [
    // ---------- Page 1: the hunters return ----------
    {
      rows: [[1.6, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.5, sun: [0.15, 0.3, 0.04], tufts: 12, cotton: 4, fg: denFg(-0.25) },
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.62, y: 0.78, s: 1.1, flip: true, tweak: { tail: -60 } },
            { c: 'silver', pose: 'trot', x: 0.8, y: 0.76, s: 1, flip: true },
            { c: 'nails', pose: 'trot', x: 0.95, y: 0.75, s: 1, flip: true },
            { c: 'kapu', pose: 'run', x: 0.36, y: 0.84, s: 0.95 },
            { c: 'zing', pose: 'run', x: 0.2, y: 0.87, s: 0.9 }
          ],
          text: [
            { t: 'title', text: 'Food from\nthe Pack', at: [0.5, 0.13], size: 88, sub: [{ text: 'Chapter 3', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'In the morning the hunters came home. The pups raced out to meet them.', at: 'bl', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 6 },
          cast: [
            { c: 'amaroq', pose: 'headDown', x: 0.36, y: 0.93, s: 1.1, tweak: { neck: 100, head: -8, tail: -70 } },
            { c: 'kapu', id: 'k', pose: 'crouch', x: 0.72, y: 0.95, s: 1.2, flip: true, tweak: { head: 38, neck: 125 } }
          ],
          text: [{ t: 'cue', who: 'k', part: 'head', text: 'Lick, lick: "Feed me!"', at: [0.5, 0.18], w: 0.8 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 6 },
          props: [{ p: 'meatPile', x: 0.62, y: 0.94, s: 1.3 }],
          cast: [{ c: 'amaroq', pose: 'feed', x: 0.38, y: 0.93, s: 1.2 }],
          text: [{ t: 'cap', text: 'Amaroq lowered his head and brought up meat he had carried home in his stomach.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 6 },
          props: [{ p: 'meatPile', x: 0.5, y: 0.95, s: 1.2 }],
          cast: [
            { c: 'kapu', pose: 'sniff', x: 0.3, y: 0.95, s: 1.05, tweak: { neck: 60, head: -40 } },
            { c: 'sister', pose: 'sniff', x: 0.74, y: 0.95, s: 1, flip: true, tweak: { neck: 60, head: -40 } }
          ],
          text: [{ t: 'sfx', text: 'GULP!', at: [0.5, 0.3], size: 50 }]
        }
      ]
    },

    // ---------- Page 2: the idea ----------
    {
      rows: [[1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.4, cy: 0.6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'surprised', s: 5, fit: ['face', 0.4, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'That\'s how the pups eat!', at: [0.55, 0.2], w: 0.85, tailMax: 50 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'scared', s: 5, fit: ['face', 0.5, 0.66] }],
          text: [
            { t: 'sfx', text: 'YUCK...', at: [0.5, 0.22], size: 52, color: '#9bc45a' },
            { t: 'cap', text: '...but it was food.', at: 'br', w: 0.8 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.5, sun: [0.85, 0.2, 0.04], tufts: 12,
            fg: { x: 0.8, y: 1.08, w: 0.9, h: 0.34, den: { x: -0.1, y: 0.35, r: 0.025 } } },
          cast: [
            { c: 'miyax', pose: 'crawl', expr: 'determined', x: 0.3, y: 0.93, s: 1.4 },
            { c: 'jello', id: 'j', pose: 'lie', x: 0.8, y: 0.76, s: 1, flip: true },
            { c: 'zat', pose: 'sleep', x: 0.66, y: 0.82, s: 0.8, flip: true }
          ],
          text: [{ t: 'cap', text: 'The hunters were tired and asleep. Only Jello, the babysitter, was awake. Miyax crept up to him, whining softly like a hungry pup.', at: 'tl', w: 0.55 }]
        }
      ]
    },

    // ---------- Page 3: begging from Jello ----------
    {
      rows: [[1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.3, sun: false, tufts: 6 },
          cast: [
            { c: 'jello', id: 'j', pose: 'stand', x: 0.72, y: 0.95, s: 1.6, flip: true, tweak: { neck: 95, head: -15 } },
            { c: 'miyax', id: 'm', pose: 'proneReach', expr: 'hopeful', x: 0.2, y: 0.97, s: 1.6 }
          ],
          text: [{ t: 'whisper', who: 'm', text: 'Mmm-eee... please?', at: [0.36, 0.26], w: 0.5 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.5, sun: false, tufts: 4 },
          cast: [{ c: 'jello', id: 'j', pose: 'stand', s: 3.2, x: 0.8, y: 1.12, flip: true, eye: 'wide', ears: 'up' }],
          text: [{ t: 'sfx', text: '!?', at: [0.3, 0.3], size: 80, rot: -8 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 6 },
          cast: [{ c: 'jello', id: 'j', pose: 'lookBack', x: 0.5, y: 0.93, s: 1.5, ears: 'back' }],
          text: [{ t: 'cue', who: 'j', part: 'head', text: 'Looking around, ears back: "Who, me?"', at: [0.5, 0.18], w: 0.85 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 6 },
          props: [{ p: 'meatPile', x: 0.34, y: 0.95, s: 1.4 }],
          cast: [{ c: 'jello', pose: 'feed', x: 0.66, y: 0.93, s: 1.4, flip: true }],
          text: [{ t: 'cap', text: 'Then Jello lowered his head...', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 4: a meal at last ----------
    {
      rows: [[1.2, 1], [1, 1, 1, 1], [1, 1]],
      panels: [
        {
          bg: { scene: 'burst', color: '#f7c85a', ray: '#fbe29a', cx: 0.4, cy: 0.62 },
          cast: [{ c: 'miyax', id: 'm', pose: 'kneelHold', expr: 'joy', x: 0.36, y: 0.97, s: 2.4, hold: 'meat' }],
          text: [
            { t: 'cap', text: 'It was the best meal of her whole life.', at: 'tl', w: 0.45 },
            { t: 'say', who: 'm', text: 'Thank you, Jello! Thank you!', at: [0.75, 0.4], w: 0.35 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'jello', pose: 'cower', x: 0.5, y: 0.93, s: 1.3, flip: true }],
          text: [{ t: 'cap', text: 'Jello slunk away. The other wolves bossed him around. He always got the worst of everything.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'sad', x: 0.46, y: 0.95, s: 1.7 }],
          text: [{ t: 'think', who: 'm', text: 'Poor Jello.', at: [0.5, 0.22], w: 0.8 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.3, sun: false, tufts: 6 },
          props: [{ p: 'meatPile', x: 0.5, y: 0.9, s: 1.2 }],
          cast: [{ c: 'kapu', pose: 'sniff', x: 0.3, y: 0.93, s: 1.2, tweak: { neck: 60, head: -40 } }],
          text: [{ t: 'cap', text: 'After that, when the hunters came home, she begged with the pups.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.72, sun: [0.8, 0.26, 0.06], tufts: 6, fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.3, tufts: 10 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'happy', x: 0.4, y: 0.8, s: 2.1 }],
          text: [{ t: 'cap', text: 'With food in her stomach, Miyax felt strong again. It was time to make a real home.', at: 'tr', w: 0.45 }]
        }
      ]
    },

    // ---------- Page 5: the sod house ----------
    {
      rows: [[1, 1, 1], [1.4, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: false, tufts: 8 },
          props: [{ p: 'sod', x: 0.78, y: 0.95, s: 1.6 }, { p: 'sod', x: 0.8, y: 0.83, s: 1.6 }],
          cast: [{ c: 'miyax', pose: 'kneelWork', expr: 'determined', x: 0.36, y: 0.95, s: 1.8, hold: 'ulu' }],
          text: [{ t: 'cap', text: 'She cut blocks of sod with her [[ulu]]...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: false, tufts: 8 },
          cast: [{ c: 'miyax', pose: 'carry', expr: 'determined', x: 0.46, y: 0.95, s: 1.8, hold: 'sod' }],
          text: [{ t: 'cap', text: '...carried them to her frost heave...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.52, sun: [0.86, 0.24, 0.045], tufts: 10, cotton: 4,
            fg: { x: 0.45, y: 1.05, w: 1.3, h: 0.36, tufts: 8 } },
          props: [{ p: 'sodHouse', x: 0.42, y: 0.84, s: 1.6 }, { p: 'pot', x: 0.7, y: 0.83, s: 1.2 }],
          cast: [
            { c: 'miyax', id: 'm', pose: 'frontHappy', expr: 'joy', x: 0.78, y: 0.86, s: 1.5 },
            { c: 'kapu', id: 'k', pose: 'sit', x: 0.14, y: 0.93, s: 1.1 }
          ],
          text: [
            { t: 'cap', text: '...and built a snug little house in its side.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'm', text: 'Welcome to my house, Kapu!', at: [0.72, 0.3], w: 0.3 }
          ]
        }
      ]
    },

    // ---------- Page 6: the order of the pack ----------
    {
      rows: [[1.25, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 10 },
          cast: [
            { c: 'amaroq', id: 'a', pose: 'standTall', x: 0.14, y: 0.88, s: 1.05 },
            { c: 'silver', id: 's', pose: 'stand', x: 0.39, y: 0.88, s: 1, tweak: { tail: -60 } },
            { c: 'nails', id: 'n', pose: 'stand', x: 0.63, y: 0.88, s: 1 },
            { c: 'jello', id: 'j', pose: 'cower', x: 0.88, y: 0.9, s: 0.95 }
          ],
          text: [
            { t: 'cap', text: 'She learned that every wolf had a place in the pack.', at: 'tl', w: 0.6 },
            { t: 'cue', who: 'a', part: 'head', text: '1: Amaroq', at: [0.12, 0.34], w: 0.2 },
            { t: 'cue', who: 's', part: 'head', text: '2: Silver', at: [0.37, 0.4], w: 0.2 },
            { t: 'cue', who: 'n', part: 'head', text: '3: Nails', at: [0.62, 0.34], w: 0.2 },
            { t: 'cue', who: 'j', part: 'head', text: 'Last: Jello', at: [0.86, 0.46], w: 0.22 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: false, tufts: 6 },
          cast: [
            { c: 'nails', pose: 'glare', x: 0.34, y: 0.93, s: 1.1 },
            { c: 'jello', pose: 'cower', x: 0.78, y: 0.95, s: 1, flip: true }
          ],
          text: [{ t: 'cap', text: 'The higher wolves could boss the lower ones.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: false, tufts: 6 },
          cast: [
            { c: 'amaroq', pose: 'lie', x: 0.4, y: 0.93, s: 1.1 },
            { c: 'kapu', pose: 'pounce', x: 0.72, y: 0.93, s: 1, flip: true, mouth: 'pant' }
          ],
          text: [{ t: 'cap', text: 'But pups could get away with anything!', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'thinking', s: 5, fit: ['face', 0.5, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'And I am... a sort of pup, I guess.', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        }
      ]
    },

    // ---------- Page 7: good days ----------
    {
      rows: [[1.1, 1], [1, 1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.5, sun: [0.12, 0.44, 0.04], tufts: 10, cotton: 3, fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.3 } },
          props: [{ p: 'sodHouse', x: 0.76, y: 0.9, s: 0.9 }],
          cast: [
            { c: 'miyax', pose: 'sit', expr: 'warm', x: 0.34, y: 0.88, s: 1.6 },
            { c: 'kapu', pose: 'sleep', x: 0.53, y: 0.9, s: 1 }
          ],
          text: [{ t: 'cap', text: 'The days rolled by. Kapu often came to nap in the sun beside her house.', at: 'tl', w: 0.55 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.4, sun: false, tufts: 6 },
          props: [{ p: 'lemming', x: 0.66, y: 0.92, s: 2 }],
          cast: [{ c: 'miyax', pose: 'kneelHold', expr: 'happy', x: 0.36, y: 0.95, s: 1.6 }],
          text: [{ t: 'cap', text: 'She learned the lemmings\' paths through the grass.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.4, sun: false, tufts: 6, cotton: 6 },
          cast: [{ c: 'miyax', pose: 'reach', expr: 'happy', x: 0.44, y: 0.95, s: 1.7 }],
          text: [{ t: 'cap', text: 'She picked cotton grass to stuff her boots.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.4, sun: false, tufts: 6 },
          cast: [
            { c: 'silver', pose: 'lie', x: 0.3, y: 0.92, s: 1.1 },
            { c: 'sister', pose: 'sleep', x: 0.7, y: 0.93, s: 0.9, flip: true }
          ],
          text: [{ t: 'cap', text: 'And she watched the wolves, learning more every day.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.55, sun: [0.8, 0.5, 0.05], tufts: 8, flat: true },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'thinking', x: 0.24, y: 0.95, s: 1.7 }],
          text: [{ t: 'think', who: 'm', text: 'I could almost stay here forever. But winter will come...', at: [0.6, 0.2], w: 0.7 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.4], size: 44, color: '#f2c230' },
            { t: 'title', text: 'The Caribou\nHunt', at: [0.5, 0.62], size: 62 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
