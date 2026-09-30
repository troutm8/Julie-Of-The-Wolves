// Chapter 10: The Plane
(function (JW) {
  'use strict';
  const snowBg = (extra) => Object.assign({ scene: 'tundra', sky: 'snow', sun: false, tufts: 0, polygons: false }, extra);

  JW.addChapter(10, [
    // ---------- Page 1: title ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.6, sun: [0.85, 0.3, 0.035], flat: true }),
          props: [{ p: 'plane', x: 0.78, y: 0.2, s: 0.5, spin: true }],
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.6, y: 0.8, s: 0.85 },
            { c: 'silver', pose: 'trot', x: 0.44, y: 0.81, s: 0.78 },
            { c: 'kapu', pose: 'trot', x: 0.3, y: 0.83, s: 0.78 },
            { c: 'nails', pose: 'trot', x: 0.16, y: 0.84, s: 0.78 }
          ],
          text: [
            { t: 'title', text: 'The Plane', at: [0.42, 0.18], size: 100, sub: [{ text: 'Chapter 10', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'A few days later, the plane came back.', at: 'bl', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'snow' },
          props: [{ p: 'plane', x: 0.52, y: 0.66, s: 1.2, spin: true, rot: 12 }],
          fx: [{ type: 'speed', cx: 0.5, cy: 0.55, r: 0.4, n: 20, color: '#8e9fb4' }],
          text: [{ t: 'sfx', text: 'RRRRRRRR!', at: [0.5, 0.22], size: 50, rot: -6 }]
        },
        {
          bg: snowBg({ hz: 0.45 }),
          cast: [{ c: 'miyax', id: 'm', pose: 'frontWave', expr: 'scared', x: 0.5, y: 0.95, s: 1.8, hood: 'down' }],
          text: [{ t: 'shout', who: 'm', text: 'Run, Amaroq! Run!', at: [0.5, 0.18], w: 0.8 }]
        }
      ]
    },

    // ---------- Page 2: the shots ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.2, 1], [1, 1, 1], [1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.4, flat: true }),
          props: [{ p: 'plane', x: 0.3, y: 0.24, s: 0.9, spin: true, rot: 8 }],
          cast: [
            { c: 'amaroq', pose: 'run', x: 0.66, y: 0.84, s: 0.8, flip: true },
            { c: 'kapu', pose: 'run', x: 0.86, y: 0.88, s: 0.72, flip: true }
          ],
          text: [
            { t: 'cap', text: 'Men in the plane were hunting wolves, not for food but for the money paid for each one killed.', at: 'tr', w: 0.5 },
            { t: 'sfx', text: 'BANG! BANG!', at: [0.36, 0.58], size: 64, rot: -8, color: '#e98c3a' }
          ]
        },
        {
          bg: { scene: 'burst', color: '#8e9fb4', ray: '#a9b8c8', cx: 0.5, cy: 0.5 },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'scared', s: 4.2, fit: ['face', 0.5, 0.6], hood: 'down' }],
          text: [{ t: 'shout', who: 'm', text: 'NO!', at: [0.5, 0.16], w: 0.6 }]
        },
        {
          bg: { scene: 'sky', sky: 'snow' },
          props: [{ p: 'plane', x: 0.7, y: 0.4, s: 0.45, spin: true, rot: -6 }],
          text: [{ t: 'cap', text: 'Then the plane flew away. The tundra was silent.', at: 'bl', w: 0.95 }]
        },
        {
          bg: snowBg({ hz: 0.6, flat: true }),
          cast: [
            { c: 'amaroq', pose: 'sleep', x: 0.62, y: 0.78, s: 0.7, eye: 'closed', tweak: { tail: -90, tailBend: 0 } },
            { c: 'miyax', pose: 'run', expr: 'scared', x: 0.24, y: 0.88, s: 1.1, hood: 'down' }
          ],
          text: [{ t: 'cap', text: 'Miyax ran across the snow to where Amaroq lay.', at: 'tl', w: 0.6 }]
        }
      ]
    },

    // ---------- Page 3: goodbye, Amaroq ----------
    {
      // 1 + 1 = 2 panels
      rows: [[1.6, 1], [1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.5, sky: 'snowDusk', sun: [0.5, 0.52, 0.05], rays: false, flat: true }),
          cast: [
            { c: 'amaroq', pose: 'sleep', x: 0.6, y: 0.86, s: 1.5, eye: 'closed', tweak: { tail: -90, tailBend: 0 } },
            { c: 'miyax', pose: 'kneelWork', expr: 'sad', x: 0.3, y: 0.88, s: 1.8, hood: 'down', opts: { tears: true } }
          ],
          fx: [{ type: 'snow' }],
          text: [{ t: 'cap', text: 'Amaroq, the great leader of the pack, was dead.', at: 'tl', w: 0.55 }]
        },
        {
          bg: { scene: 'plain', color: '#2a3148' },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'sad', s: 4.4, fit: ['face', 0.3, 0.62], hood: 'down', opts: { tears: true } }],
          text: [{ t: 'whisper', who: 'm', text: 'Amaroq, ilaya... my friend.', at: [0.68, 0.36], w: 0.4, fill: '#eef2f7' }]
        }
      ]
    },

    // ---------- Page 4: Kapu is hurt ----------
    {
      // 1 + 2 + 2 = 5 panels
      rows: [[1.1, 1], [1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.5 }),
          cast: [
            { c: 'kapu', id: 'k', pose: 'lie', x: 0.56, y: 0.9, s: 1.5, ears: 'back', eye: 'half', tweak: { neck: 110, head: -10 } },
            { c: 'miyax', pose: 'crouch', expr: 'worried', x: 0.24, y: 0.94, s: 1.7, hood: 'down' }
          ],
          text: [{ t: 'cap', text: 'Kapu had been shot in the shoulder. He could barely stand.', at: 'tl', w: 0.55 }]
        },
        {
          bg: { scene: 'tundra', sky: 'snowNight', hz: 0.5, sun: false, tufts: 0, polygons: false },
          props: [{ p: 'snowHouse', x: 0.5, y: 0.9, s: 1.2, lit: true }],
          text: [{ t: 'cap', text: 'She pulled him to her snow house...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#dfe7ee' },
          props: [{ p: 'lamp', x: 0.84, y: 0.92, s: 1 }],
          cast: [
            { c: 'kapu', pose: 'sleep', x: 0.6, y: 0.92, s: 1.4, flip: true },
            { c: 'miyax', pose: 'kneelHold', expr: 'worried', x: 0.26, y: 0.94, s: 1.6, hood: 'down' }
          ],
          text: [{ t: 'cap', text: '...cleaned his wound, and kept him warm.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#dfe7ee' },
          props: [{ p: 'meat', x: 0.4, y: 0.9, s: 1.3 }],
          cast: [{ c: 'kapu', pose: 'sniff', x: 0.66, y: 0.92, s: 1.3, flip: true, tweak: { neck: 60, head: -40 } }],
          text: [{ t: 'cap', text: 'She fed him from her own food.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#dfe7ee' },
          cast: [{ c: 'kapu', id: 'k', pose: 'faceFront', s: 2.4, fit: ['face', 0.5, 0.52] }],
          text: [{ t: 'cap', text: 'Day by day, he grew stronger.', at: 'bl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 5: the new leader ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.4, 1], [1, 1, 1], [0.8, 1]],
      panels: [
        {
          bg: snowBg({ hz: 0.66, sky: 'snowDusk', sun: [0.8, 0.62, 0.04], rays: false, fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.3, color: '#e2e8ee', tufts: 0 } }),
          cast: [
            { c: 'kapu', id: 'k', pose: 'standTall', x: 0.52, y: 0.8, s: 1.9, size: 1.4, opts: { headK: 1.05, snout: 0.95 } },
            { c: 'silver', pose: 'greet', x: 0.84, y: 0.86, s: 1.3, flip: true },
            { c: 'nails', pose: 'greet', x: 0.18, y: 0.88, s: 1.3 }
          ],
          text: [
            { t: 'cap', text: 'When Kapu was well, the pack gathered around him, wagging and bowing. Kapu was their new leader.', at: 'tl', w: 0.55 },
            { t: 'cue', who: 'k', part: 'tail', text: 'Tail high: "I am the leader now."', at: [0.72, 0.4], w: 0.36 }
          ]
        },
        {
          bg: snowBg({ hz: 0.4, sky: 'snowDusk' }),
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'warm', x: 0.4, y: 0.95, s: 1.8, hood: 'up', opts: { tears: true } }],
          text: [{ t: 'say', who: 'm', text: 'Goodbye, Kapu, my brother.', at: [0.6, 0.2], w: 0.7 }]
        },
        {
          bg: snowBg({ hz: 0.6, sky: 'snowDusk', flat: true }),
          cast: [
            { c: 'kapu', pose: 'lookBack', x: 0.4, y: 0.74, s: 0.8, size: 1.4, opts: { headK: 1.05, snout: 0.95 } },
            { c: 'silver', pose: 'trot', x: 0.58, y: 0.72, s: 0.6 },
            { c: 'nails', pose: 'trot', x: 0.72, y: 0.71, s: 0.6 }
          ],
          text: [{ t: 'cap', text: 'The pack trotted away. Kapu looked back once.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.4], size: 40, color: '#f2c230' },
            { t: 'title', text: 'Winter Journey', at: [0.5, 0.72], size: 64 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
