// Chapter 8: Traveling with the Pack (Part Three begins)
(function (JW) {
  'use strict';
  // Tornait rides in Miyax's hood: place the plover just behind her head.
  const inHood = (x, y, s) => ({ p: 'plover', x, y, s, z: 5 });

  JW.addChapter(8, [
    // ---------- Page 1: title ----------
    {
      // 1 + 2 = 3 panels
      rows: [[1.6, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'dusk', hz: 0.55, sun: [0.82, 0.52, 0.045], tufts: 12, flat: true },
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.74, y: 0.74, s: 0.8 },
            { c: 'silver', pose: 'trot', x: 0.6, y: 0.75, s: 0.72 },
            { c: 'nails', pose: 'trot', x: 0.47, y: 0.76, s: 0.72 },
            { c: 'kapu', pose: 'trot', x: 0.35, y: 0.78, s: 0.66 },
            { c: 'miyax', pose: 'walk', expr: 'determined', x: 0.18, y: 0.84, s: 1.4, hold: 'pack' }
          ],
          text: [
            { t: 'title', text: 'Traveling\nwith the Pack', at: [0.5, 0.12], size: 80, sub: [{ text: 'Part Three · Kapugen, the Hunter', size: 32 }, { text: 'Chapter 8', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'Summer ended. The wolves left their den to follow the caribou, and Miyax went with them, walking toward Point Hope.', at: 'br', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'dusk', hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'kapu', id: 'k', pose: 'trot', x: 0.5, y: 0.92, s: 1.35, tweak: { tail: -80 } }],
          text: [{ t: 'cap', text: 'Kapu, almost grown now, trotted beside her.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'dusk', hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'jello', pose: 'walk', x: 0.5, y: 0.92, s: 1.1, ears: 'back', tweak: { tail: 10, tailBend: 30, neck: 90, head: -10 } }],
          text: [{ t: 'cap', text: 'Jello lagged behind, alone and grumpy.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 2: Tornait ----------
    {
      // 2 + 1 + 2 = 5 panels
      rows: [[1, 1, 1], [1.2, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'grey', hz: 0.4, sun: false, tufts: 10 },
          props: [{ p: 'plover', x: 0.62, y: 0.9, s: 1.8 }],
          cast: [{ c: 'miyax', pose: 'crouch', expr: 'surprised', x: 0.3, y: 0.96, s: 1.6 }],
          text: [{ t: 'cap', text: 'One cold morning she found a little golden plover, shivering in the grass.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'grey', hz: 0.3, sun: false, tufts: 4, polygons: false },
          props: [{ p: 'plover', x: 0.5, y: 0.78, s: 5 }],
          text: [
            { t: 'cap', text: 'All the other plovers had flown south. This one had been left behind.', at: 'tl', w: 0.95 },
            { t: 'sfx', text: 'peep...', at: [0.78, 0.46], size: 38, color: '#fbf6ea' }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'grey', hz: 0.55, sun: false, tufts: 8 },
          props: [inHood(0.585, 0.45, 1.3)],
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'warm', x: 0.5, y: 0.96, s: 2.4, hood: 'down', flip: true }],
          text: [
            { t: 'cap', text: 'She tucked the bird into her warm hood.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'm', text: 'I will call you [[Tornait]]. You can come with me.', at: [0.74, 0.3], w: 0.42 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'grey', hz: 0.3, sun: false, tufts: 4, polygons: false },
          props: [{ p: 'plover', x: 0.62, y: 0.5, s: 3, z: 5 }],
          cast: [{ c: 'miyax', pose: 'standLook', expr: 'joy', s: 4.2, fit: ['face', 0.36, 0.64] }],
          text: [{ t: 'sfx', text: 'peep!', at: [0.8, 0.2], size: 40 }]
        },
        {
          bg: { scene: 'tundra', sky: 'dusk', hz: 0.5, sun: false, tufts: 8 },
          cast: [{ c: 'kapu', pose: 'sniff', x: 0.5, y: 0.94, s: 1.4, eye: 'wide' }],
          text: [{ t: 'cap', text: 'Kapu sniffed at the new little traveler.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 3: the long days on the trail ----------
    {
      // 1 + 2 + 1 = 4 panels
      rows: [[1.2, 1], [1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'snowDusk', hz: 0.55, sun: [0.5, 0.56, 0.05], rays: false, tufts: 0, polygons: false, flat: true },
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.62, y: 0.7, s: 0.55, flip: true },
            { c: 'kapu', pose: 'trot', x: 0.52, y: 0.72, s: 0.48, flip: true },
            { c: 'miyax', pose: 'walk', expr: 'neutral', x: 0.4, y: 0.76, s: 0.8, flip: true, hood: 'up' }
          ],
          fx: [{ type: 'snow' }],
          text: [{ t: 'cap', text: 'Every day the sun set earlier. The first snow fell, and the tundra turned white.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: 'snow', hz: 0.45, sun: false, tufts: 0, polygons: false },
          props: [{ p: 'hide', x: 0.66, y: 0.94, s: 1.2 }],
          cast: [{ c: 'miyax', pose: 'kneelHold', expr: 'determined', x: 0.36, y: 0.95, s: 1.7, hood: 'up' }],
          text: [{ t: 'cap', text: 'She sewed warm mittens and a new sleeping skin from the caribou hide.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'snow', hz: 0.45, sun: false, tufts: 0, polygons: false },
          cast: [
            { c: 'kapu', pose: 'playbow', x: 0.66, y: 0.93, s: 1.3, flip: true },
            { c: 'miyax', pose: 'frontHappy', expr: 'joy', x: 0.28, y: 0.95, s: 1.5, hood: 'up' }
          ],
          fx: [{ type: 'snow' }],
          text: [{ t: 'cap', text: 'Kapu loved the snow.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'snowNight', hz: 0.6, sun: false, tufts: 0, polygons: false, aurora: true, moon: [0.85, 0.16, 0.03] },
          props: [{ p: 'snowHouse', x: 0.3, y: 0.9, s: 1.2, lit: true }],
          cast: [
            { c: 'kapu', pose: 'sleep', x: 0.62, y: 0.9, s: 1 },
            { c: 'amaroq', pose: 'lie', x: 0.8, y: 0.88, s: 1, flip: true }
          ],
          text: [{ t: 'cap', text: 'At night she cut blocks of snow and built a snug snow house. The wolves slept nearby.', at: 'tl', w: 0.55 }]
        }
      ]
    },

    // ---------- Page 4: a sound that didn't belong ----------
    {
      // 1 + 1 + 1 = 3 panels
      rows: [[1.2, 1], [1, 1, 1], [0.9, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'snow', hz: 0.55, sun: [0.8, 0.3, 0.04], tufts: 0, polygons: false },
          cast: [
            { c: 'miyax', id: 'm', pose: 'standLook', expr: 'worried', x: 0.3, y: 0.94, s: 1.8, hood: 'up', headTilt: -15 },
            { c: 'amaroq', id: 'a', pose: 'standTall', x: 0.7, y: 0.92, s: 1.3, ears: 'up', tweak: { head: 25 } }
          ],
          text: [
            { t: 'cap', text: 'One day, far away, Miyax heard a sound that did not belong on the tundra.', at: 'tl', w: 0.55 },
            { t: 'sfx', text: 'rrrrrrrr...', at: [0.7, 0.32], size: 40, color: '#8e9fb4', rot: -2 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'snow' },
          props: [{ p: 'plane', x: 0.52, y: 0.5, s: 0.3 }],
          text: [{ t: 'cap', text: 'A tiny airplane crossed the sky, and then it was gone.', at: 'bl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'snow', hz: 0.35, sun: false, tufts: 0, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'worried', s: 4.2, fit: ['face', 0.5, 0.62], hood: 'up' }],
          text: [{ t: 'think', who: 'm', text: 'Why would a plane fly out here?', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.36], size: 44, color: '#f2c230' },
            { t: 'title', text: 'Jello', at: [0.5, 0.66], size: 80 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
