// Chapter 1: Lost
(function (JW) {
  'use strict';
  const LIME = 'lime';
  // A distant frost heave with the wolves' den, reused in several panels.
  const denHeave = (x, y, w, h) => ({ x, y, w, h, den: { x: 0.18, y: 0.3, r: 0.06 } });

  JW.addChapter(1, [
    // ---------- Page 1: splash ----------
    {
      rows: [[1, 1]],
      panels: [{
        bg: { scene: 'tundra', sky: LIME, hz: 0.47, sun: [0.82, 0.3, 0.045], tufts: 18, cotton: 5,
          heaves: [denHeave(0.7, 0.54, 0.34, 0.05), { x: 0.16, y: 0.5, w: 0.16, h: 0.012 }],
          ponds: [{ x: 0.36, y: 0.56, w: 0.2, h: 0.012 }, { x: 0.88, y: 0.62, w: 0.12, h: 0.01 }],
          fg: { x: 0.3, y: 1.04, w: 1.25, h: 0.3, cotton: 4 } },
        cast: [
          { c: 'miyax', pose: 'prone', expr: 'worried', x: 0.36, y: 0.748, s: 2.9 },
          { c: 'amaroq', pose: 'standTall', x: 0.71, y: 0.492, s: 0.36 },
          { c: 'silver', pose: 'lie', x: 0.8, y: 0.5, s: 0.32, flip: true },
          { c: 'kapu', pose: 'playbow', x: 0.62, y: 0.505, s: 0.34 },
          { c: 'zing', pose: 'pounce', x: 0.58, y: 0.52, s: 0.32, flip: true }
        ],
        text: [
          { t: 'title', text: 'Julie of the Wolves', at: [0.5, 0.1], size: 92, sub: [{ text: 'Part One · Amaroq, the Wolf', size: 32 }, { text: 'Chapter 1 · Lost', size: 40, fill: '#b3352b', color: '#fbf6ea' }] },
          { t: 'cap', text: 'The [[North Slope]] of Alaska. It is summer, when the sun circles the sky and never sets.', at: 'br', w: 0.5 }
        ]
      }]
    },

    // ---------- Page 2: creeping up to watch ----------
    {
      rows: [[1.05, 1], [1, 1, 1], [1.1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.62, sun: [0.8, 0.3, 0.05], tufts: 12, cotton: 4 },
          props: [{ p: 'pack', x: 0.23, y: 0.93, s: 1.5 }, { p: 'pot', x: 0.5, y: 0.94, s: 1.5 }],
          cast: [{ c: 'miyax', id: 'm', pose: 'hoodBack', expr: 'neutral', hood: 'up', x: 0.36, y: 0.95, s: 1.9 }],
          text: [
            { t: 'cap', text: 'Miyax pushed back the hood of her sealskin [[parka]] and looked at the sun.', at: 'tl', w: 0.5 },
            { t: 'cap', text: 'A yellow disk in a lime-green sky. Evening: the time when the wolves wake up.', at: 'br', w: 0.46 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.35, sun: false, tufts: 10, cotton: 3 },
          cast: [{ c: 'miyax', pose: 'crouch', expr: 'determined', x: 0.42, y: 0.96, s: 2.1, hold: 'pot' }],
          text: [{ t: 'cap', text: 'Quietly, she put down her cooking pot...', at: 'tl', w: 0.9 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.3, sun: false, tufts: 4,
            fg: { x: 0.62, y: 1.05, w: 1.5, h: 0.5, cotton: 2 } },
          cast: [{ c: 'miyax', pose: 'crawl', expr: 'determined', x: 0.52, y: 0.66, s: 1.7, rot: -12 }],
          text: [{ t: 'cap', text: '...and crept to the top of a [[frost heave]].', at: 'tl', w: 0.9 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.42, sun: [0.9, 0.16, 0.035], tufts: 14, cotton: 4,
            heaves: [denHeave(0.72, 0.5, 0.3, 0.07)],
            fg: { x: 0.22, y: 1.05, w: 0.9, h: 0.3 } },
          cast: [
            { c: 'miyax', pose: 'prone', expr: 'worried', x: 0.2, y: 0.78, s: 2.2 },
            { c: 'amaroq', pose: 'lie', x: 0.72, y: 0.43, s: 0.42 },
            { c: 'silver', pose: 'sleep', x: 0.8, y: 0.445, s: 0.38, flip: true },
            { c: 'kapu', pose: 'sleep', x: 0.64, y: 0.45, s: 0.4 }
          ],
          text: [{ t: 'cap', text: 'Lying on her stomach, she looked across the grass and moss at the wolves she had found two [[sleeps]] ago.', at: 'tr', w: 0.5 }]
        }
      ]
    },

    // ---------- Page 3: lost and hungry ----------
    {
      rows: [[1.15, 1], [1, 1.25, 1], [0.95, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.4, sun: [0.12, 0.2, 0.04], tufts: 8,
            fg: { x: 0.5, y: 1.08, w: 1.25, h: 0.52, den: { x: -0.2, y: 0.28, r: 0.025 }, tufts: 12 } },
          cast: [
            { c: 'amaroq', id: 'a', pose: 'standTall', x: 0.42, y: 0.6, s: 1.15 },
            { c: 'silver', pose: 'stand', x: 0.7, y: 0.63, s: 1.05, flip: true, tweak: { tail: -60 } },
            { c: 'kapu', pose: 'playbow', x: 0.24, y: 0.72, s: 1.05 },
            { c: 'zing', pose: 'pounce', x: 0.09, y: 0.84, s: 1 },
            { c: 'sister', pose: 'sit', x: 0.9, y: 0.78, s: 1, flip: true }
          ],
          text: [
            { t: 'cap', text: 'The wolves were waking up. They wagged their tails when they saw each other.', at: 'tl', w: 0.55 },
            { t: 'sfx', text: 'wag wag', at: [0.62, 0.3], size: 34, rot: -12, color: '#fbf6ea' }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.4, sun: false, tufts: 6, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'worried', s: 5.6, fit: ['face', 0.46, 0.44] }],
          fx: [{ type: 'lines', x: 0.8, y: 0.8, r: 26 }],
          text: [{ t: 'cap', text: 'Her hands shook. She was not afraid of the wolves. They were shy, and far away.', at: 'bl', w: 1 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.72, sun: [0.8, 0.28, 0.06], tufts: 5, flat: true },
          cast: [{ c: 'miyax', pose: 'frontLook', expr: 'scared', x: 0.5, y: 0.8, s: 0.55 }],
          text: [{ t: 'cap', text: 'She was afraid because she was *lost*.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.18, sun: false, tufts: 8, cotton: 2 },
          props: [{ p: 'pot', x: 0.5, y: 0.88, s: 4.4 }],
          text: [
            { t: 'cap', text: 'And her food was gone.', at: 'tl', w: 0.95 },
            { t: 'sfx', text: 'GRRRMBLE', at: [0.5, 0.36], size: 46, rot: -4, color: '#e98c3a' }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.5, sun: false, tufts: 6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'sad', x: 0.44, y: 0.96, s: 2.2 }],
          text: [{ t: 'think', who: 'm', text: 'I must make the wolves help me.', at: [0.55, 0.22], w: 0.62 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.5, sun: false, tufts: 6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'thinking', x: 0.44, y: 0.96, s: 2.2, headTilt: -10 }],
          text: [{ t: 'think', who: 'm', text: 'Kapugen said they would.', at: [0.5, 0.22], w: 0.6 }]
        }
      ]
    },

    // ---------- Page 4: why she is out here ----------
    {
      rows: [[1, 1, 1], [1.05, 1], [0.95, 1]],
      panels: [
        {
          style: 'memory',
          bg: { scene: 'tundra', sky: 'grey', hz: 0.5, sun: false, tufts: 6, flat: true },
          props: [{ p: 'houses', x: 0.62, y: 0.5, s: 0.9 }],
          cast: [{ c: 'miyax', pose: 'walk', expr: 'determined', x: 0.28, y: 0.95, s: 1.75, flip: true, hold: 'pack' }],
          text: [{ t: 'cap', text: 'Many sleeps ago, she had run away from [[Barrow]].', at: 'tl', w: 0.95 }]
        },
        {
          style: 'memory',
          bg: { scene: 'plain', color: '#c9a878' },
          props: [
            { p: 'letter', x: 0.36, y: 0.92, s: 1.55, rot: 0, lines: ['Dear Julie,', 'Guess what? This is', 'the Golden Gate', 'Bridge. You can see', 'it from my house!', 'Come visit someday.', 'Love, Amy'] },
            { p: 'photo', x: 0.7, y: 0.95, s: 1.45 }
          ],
          text: [{ t: 'cap', text: 'She was going to [[Point Hope]], to catch a ship to [[San Francisco]]. Her pen pal Amy lived there.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.55, sun: [0.12, 0.2, 0.04], tufts: 14, flat: true },
          cast: [{ c: 'miyax', id: 'm', pose: 'frontShrug', expr: 'worried', x: 0.62, y: 0.93, s: 2.3 }],
          fx: [{ type: 'speed', cx: 0.62, cy: 0.62, r: 0.28, n: 14, color: '#7d7a3b' }],
          text: [
            { t: 'cap', text: 'But the tundra has no roads, no trees and no mountains to steer by.', at: 'tl', w: 0.4 },
            { t: 'think', who: 'm', text: 'Which way is Point Hope?', at: [0.25, 0.62], w: 0.28 }
          ]
        },
        {
          bg: { scene: 'sky', sky: 'gold', sunPath: { x0: 0.06, x1: 0.94, y: 0.8, lift: 0.22, suns: [0.12, 0.35, 0.62, 0.88] } },
          props: [{ p: 'bird', x: 0.3, y: 0.3, s: 1.2 }, { p: 'bird', x: 0.36, y: 0.26, s: 0.9 }],
          text: [
            { t: 'cap', text: 'And the summer sun never sets. It only rolls around the edge of the sky, so she could not tell which way was north.', at: 'tl', w: 0.62 },
            { t: 'cap', text: 'Even the North Star was hidden by the bright night.', at: 'br', w: 0.5 }
          ]
        }
      ]
    },

    // ---------- Page 5: what Kapugen said ----------
    {
      rows: [[1.3, 1], [1, 1, 1], [0.95, 1]],
      panels: [
        {
          style: 'memory',
          bg: { scene: 'shore', hz: 0.42, clouds: [[0.7, 0.14, 0.9]] },
          props: [{ p: 'tent', x: 0.83, y: 0.66, s: 1.1 }, { p: 'kayak', x: 0.24, y: 0.7, s: 1 }, { p: 'driftwood', x: 0.62, y: 0.98, s: 1.4 }],
          cast: [
            { c: 'kapugen', id: 'k', pose: 'kneel', expr: 'warm', x: 0.4, y: 0.95, s: 1.9 },
            { c: 'miyaxKid', id: 'mk', pose: 'stand', expr: 'happy', x: 0.6, y: 0.95, s: 1.9, flip: true }
          ],
          text: [
            { t: 'cap', text: 'She remembered her father, [[Kapugen]], at [[seal camp]] long ago.', at: 'tl', w: 0.5 },
            { t: 'say', who: 'k', text: 'Wolves are brotherly, Miyax. They love each other.', at: [0.2, 0.38], w: 0.36 }
          ]
        },
        {
          style: 'memory',
          bg: { scene: 'shore', hz: 0.62, sun: false },
          cast: [{ c: 'kapugen', id: 'k', pose: 'stand', expr: 'warm', s: 5.2, fit: ['face', 0.62, 0.6] }],
          text: [{ t: 'say', who: 'k', text: 'Learn to talk to them, and they will love you too.', at: [0.3, 0.2], w: 0.6, tailMax: 120 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.3, sun: false, tufts: 5, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'determined', s: 5.2, fit: ['face', 0.42, 0.6] }],
          text: [{ t: 'think', who: 'm', text: 'Kapugen could talk to wolves. So can I!', at: [0.62, 0.2], w: 0.6, tailMax: 90 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.45, sun: [0.92, 0.18, 0.03], tufts: 10,
            heaves: [denHeave(0.76, 0.54, 0.3, 0.07)],
            fg: { x: 0.2, y: 1.06, w: 0.95, h: 0.34 } },
          cast: [
            { c: 'miyax', id: 'm', pose: 'prone', expr: 'calling', x: 0.24, y: 0.77, s: 2 },
            { c: 'amaroq', pose: 'stand', x: 0.76, y: 0.47, s: 0.48 },
            { c: 'kapu', pose: 'sit', x: 0.68, y: 0.485, s: 0.42 },
            { c: 'silver', pose: 'lie', x: 0.85, y: 0.49, s: 0.4, flip: true }
          ],
          text: [{ t: 'whisper', who: 'm', text: '[[Amaroq]], [[ilaya]], wolf, my friend... Look at me.', at: [0.48, 0.24], w: 0.4 }]
        }
      ]
    },

    // ---------- Page 6: the pack ----------
    {
      rows: [[1.3, 1], [1, 1, 1], [1, 1.1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.72, sun: [0.52, 0.14, 0.035], tufts: 6,
            fg: { x: 0.5, y: 1.04, w: 1.4, h: 0.26, tufts: 12 } },
          cast: [{ c: 'amaroq', id: 'a', pose: 'standTall', x: 0.7, y: 0.8, s: 2.3 }],
          text: [
            { t: 'cap', text: 'The leader was a big gray wolf with a black saddle on his back. Miyax named him [[Amaroq]], which means "wolf."', at: 'tl', w: 0.45 },
            { t: 'cue', who: 'a', part: 'tail', text: 'Tail high, head up: "I am the leader."', at: [0.2, 0.66], w: 0.3 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'silver', pose: 'lie', x: 0.5, y: 0.86, s: 1.9, flip: true }],
          text: [{ t: 'cap', text: 'His mate, a beautiful silver wolf, she named Silver.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'nails', pose: 'trot', x: 0.52, y: 0.88, s: 1.7 }],
          text: [{ t: 'cap', text: 'A big, strong wolf she called Nails.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.35, sun: false, tufts: 8, cotton: 2 },
          cast: [
            { c: 'kapu', id: 'k', pose: 'pounce', x: 0.36, y: 0.8, s: 1.45 },
            { c: 'sister', pose: 'playbow', x: 0.76, y: 0.82, s: 1.2, flip: true },
            { c: 'zat', pose: 'lie', x: 0.16, y: 0.96, s: 1.15 },
            { c: 'zing', pose: 'sit', x: 0.6, y: 0.98, s: 1.15, flip: true }
          ],
          text: [{ t: 'cap', text: 'The boldest pup she named Kapu, after her father. The others were Sister, Zing and Zat.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.4, sun: false, tufts: 8 },
          cast: [{ c: 'jello', id: 'j', pose: 'cower', x: 0.42, y: 0.92, s: 1.6 }],
          text: [
            { t: 'cap', text: 'One wolf always hung back. He trembled like jelly, so she called him Jello.', at: 'tl', w: 0.95 },
            { t: 'cue', who: 'j', part: 'head', text: 'Ears flat, tail tucked: "Don\'t hurt me."', at: [0.5, 0.46], w: 0.6 }
          ]
        }
      ]
    },

    // ---------- Page 7: trying to talk ----------
    {
      rows: [[1, 1, 1], [1, 1, 1], [1.05, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.7, sun: [0.15, 0.2, 0.05], tufts: 6,
            fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.28 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'frontWave', expr: 'calling', x: 0.36, y: 0.8, s: 1.65 }],
          text: [{ t: 'shout', who: 'm', text: 'Amaroq! Over here!', at: [0.72, 0.24], w: 0.3 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.5, sun: false, tufts: 8 },
          cast: [{ c: 'amaroq', pose: 'walk', x: 0.6, y: 0.9, s: 1.6, tweak: { tail: -35 } }],
          text: [{ t: 'cap', text: 'Amaroq did not even look at her.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.45, sun: false, tufts: 6, fg: { x: 0.4, y: 1.05, w: 1.4, h: 0.3 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'proneLow', expr: 'calling', x: 0.44, y: 0.83, s: 1.9 }],
          text: [
            { t: 'cap', text: 'She tried whining like a pup.', at: 'tl', w: 0.95 },
            { t: 'whisper', who: 'm', text: 'Mmm-eee... mmm-eee...', at: [0.6, 0.38], w: 0.5 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.4, sun: false, tufts: 8,
            fg: { x: 0.5, y: 1.06, w: 1.3, h: 0.36, den: { x: 0.25, y: 0.4, r: 0.028 } } },
          cast: [
            { c: 'kapu', id: 'k', pose: 'sit', x: 0.3, y: 0.74, s: 1.3, flip: true },
            { c: 'zat', pose: 'sit', x: 0.18, y: 0.8, s: 1.2, flip: true },
            { c: 'amaroq', pose: 'sleep', x: 0.72, y: 0.74, s: 1.1 }
          ],
          text: [
            { t: 'sfx', text: '?', at: [0.28, 0.33], size: 60, rot: 8, color: '#fbf6ea' },
            { t: 'cap', text: 'The pups looked up. Amaroq kept dozing.', at: 'bl', w: 0.95 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.3, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'sad', s: 5.4, fit: ['face', 0.32, 0.56] }],
          text: [{ t: 'think', who: 'm', text: 'I am saying it all wrong.', at: [0.7, 0.4], w: 0.36, tailMax: 100 }]
        }
      ]
    },

    // ---------- Page 8: learning to listen ----------
    {
      rows: [[1.2, 1], [1, 1, 1], [1, 1, 1.1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.35, sun: false, tufts: 10,
            fg: { x: 0.5, y: 1.1, w: 1.5, h: 0.32, tufts: 10 } },
          cast: [
            { c: 'amaroq', id: 'a', pose: 'headDown', x: 0.38, y: 0.9, s: 1.7, tweak: { tail: -60, neck: 95, head: -10 } },
            { c: 'kapu', id: 'k', pose: 'crouch', x: 0.64, y: 0.92, s: 1.55, flip: true, tweak: { head: 38, neck: 125 } },
            { c: 'sister', pose: 'crouch', x: 0.82, y: 0.95, s: 1.35, flip: true }
          ],
          text: [
            { t: 'cap', text: 'So she watched. When the pups wanted something, they crouched low and licked Amaroq\'s chin.', at: 'tl', w: 0.55 },
            { t: 'cue', who: 'k', part: 'head', text: 'Crouch low, lick his chin: "You\'re the boss. Please feed me!"', at: [0.8, 0.14], w: 0.36 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.35, sun: false, tufts: 8 },
          cast: [
            { c: 'zing', id: 'z', pose: 'lie', x: 0.72, y: 0.93, s: 1.35, flip: true, eye: 'wide', ears: 'back', z: 2 },
            { c: 'amaroq', id: 'a', pose: 'standTall', x: 0.36, y: 0.92, s: 1.35, tweak: { neck: 110, head: -20 } }
          ],
          text: [{ t: 'cue', who: 'a', part: 'head', text: 'Standing tall over a pup: "Settle down."', at: [0.5, 0.14], w: 0.8 }]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.45, cy: 0.55 },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'surprised', s: 5.2, fit: ['face', 0.45, 0.62] }],
          text: [{ t: 'think', who: 'm', text: 'Ears, tails, eyes... they talk with their whole bodies!', at: [0.5, 0.2], w: 0.7, tailMax: 80 }]
        },
        {
          bg: { scene: 'tundra', sky: LIME, hz: 0.5, sun: false, tufts: 8 },
          cast: [{ c: 'miyax', id: 'm', pose: 'standLook', expr: 'surprised', x: 0.5, y: 0.96, s: 1.9, flip: true, headTilt: 30 }],
          text: [{ t: 'think', who: 'm', text: 'But I don\'t have a tail!', at: [0.5, 0.2], w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.5, sun: [0.85, 0.47, 0.05], tufts: 6 },
          props: [{ p: 'lemming', x: 0.2, y: 0.9, s: 1.6 }],
          cast: [{ c: 'miyax', pose: 'sleep', expr: 'sleep', x: 0.55, y: 0.9, s: 1.45 }],
          text: [
            { t: 'cap', text: 'The sun rolled along the edge of the sky. Miyax curled up in her sleeping skin, hungry, and dreamed of food.', at: 'tl', w: 0.95 },
            { t: 'sfx', text: 'zzz', at: [0.8, 0.62], size: 34, rot: -10, color: '#fbf6ea' }
          ]
        }
      ]
    },

    // ---------- Page 9: he sees her ----------
    {
      rows: [[1, 1, 1], [1.1, 1], [1.25, 1, 1, 0.62]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: [0.2, 0.2, 0.04], tufts: 8, fg: { x: 0.4, y: 1.06, w: 1.3, h: 0.32 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'tired', x: 0.42, y: 0.8, s: 1.9 }],
          text: [{ t: 'cap', text: 'When she woke, the wolves were already up.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.4, sun: false, tufts: 8,
            fg: { x: 0.6, y: 1.08, w: 1.3, h: 0.4, den: { x: 0.2, y: 0.4, r: 0.03 } } },
          cast: [{ c: 'kapu', id: 'k', pose: 'sit', x: 0.36, y: 0.76, s: 1.8, flip: true, ears: 'up', eye: 'wide' }],
          text: [{ t: 'cap', text: 'The boldest pup, Kapu, was staring right at her frost heave.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.45, sun: [0.85, 0.2, 0.04], tufts: 10,
            fg: { x: 0.5, y: 1.08, w: 1.5, h: 0.34, den: { x: 0.28, y: 0.4, r: 0.025 } } },
          cast: [
            { c: 'amaroq', id: 'a', pose: 'lie', x: 0.5, y: 0.78, s: 1.5, flip: true, tweak: { neck: 150, head: 6 } },
            { c: 'silver', pose: 'sleep', x: 0.78, y: 0.8, s: 1.2, flip: true },
            { c: 'kapu', pose: 'sit', x: 0.24, y: 0.85, s: 1.2, flip: true }
          ],
          text: [{ t: 'cap', text: 'Then Amaroq lifted his head...', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'day', hz: 0.8, sun: false, tufts: 3 },
          cast: [{ c: 'amaroq', pose: 'faceFront', s: 3.4, fit: ['face', 0.5, 0.5] }],
          fx: [{ type: 'vignette', o: 0.35 }],
          text: [{ t: 'cap', text: '...and looked straight at her.', at: 'bl', w: 1 }]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.5, cy: 0.6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'hopeful', s: 5, fit: ['face', 0.5, 0.64], flip: true }],
          text: [{ t: 'say', who: 'm', text: 'He sees me!', at: [0.5, 0.2], w: 0.7, tailMax: 80 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.42], size: 48, color: '#f2c230' },
            { t: 'title', text: 'Wolf\nTalk', at: [0.5, 0.6], size: 64 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
