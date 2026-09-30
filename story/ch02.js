// Chapter 2: Wolf Talk
(function (JW) {
  'use strict';
  const L = 'lime';
  const den = (x, y, w, h, dx) => ({ x, y, w, h, den: { x: dx == null ? 0.2 : dx, y: 0.3, r: 0.04 } });

  JW.addChapter(2, [
    // ---------- Page 1: title ----------
    {
      rows: [[1.7, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.52, sun: [0.86, 0.36, 0.035], tufts: 14, cotton: 3,
            heaves: [den(0.66, 0.66, 0.5, 0.12, 0.15)],
            fg: { x: 0.12, y: 1.05, w: 0.7, h: 0.26 } },
          cast: [
            { c: 'amaroq', pose: 'standTall', x: 0.66, y: 0.545, s: 0.95 },
            { c: 'silver', pose: 'lie', x: 0.8, y: 0.58, s: 0.8, flip: true },
            { c: 'miyax', pose: 'prone', expr: 'determined', x: 0.16, y: 0.82, s: 1.6 }
          ],
          text: [
            { t: 'title', text: 'Wolf Talk', at: [0.5, 0.17], size: 100, sub: [{ text: 'Chapter 2', size: 36, fill: '#b3352b', color: '#fbf6ea' }] },
            { t: 'cap', text: 'Kapugen had said that wolves talk with their bodies. Miyax set out to learn their language.', at: 'bl', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.4, cy: 0.6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'determined', s: 4.6, fit: ['face', 0.4, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'I will watch every ear and every tail.', at: [0.55, 0.22], w: 0.8, tailMax: 60 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 6 },
          cast: [{ c: 'kapu', id: 'k', pose: 'stand', x: 0.5, y: 0.94, s: 1.7, ears: 'up', eye: 'wide' }],
          text: [{ t: 'cue', who: 'k', part: 'head', text: 'Ears up and forward: "What\'s that?"', at: [0.5, 0.17], w: 0.8 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 6 },
          cast: [{ c: 'silver', id: 's', pose: 'greet', x: 0.5, y: 0.94, s: 1.35 }],
          text: [{ t: 'cue', who: 's', part: 'tail', text: 'Ears back, tail wagging low: "Hello, friend!"', at: [0.5, 0.17], w: 0.8 }]
        }
      ]
    },

    // ---------- Page 2: a dictionary of wolf ----------
    {
      rows: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'nails', id: 'n', pose: 'standTall', x: 0.36, y: 0.92, s: 1.2 },
            { c: 'jello', id: 'j', pose: 'cower', x: 0.78, y: 0.94, s: 1.05, flip: true }
          ],
          text: [
            { t: 'cap', text: 'Some signals were about who was boss.', at: 'tl', w: 0.95 },
            { t: 'cue', who: 'n', part: 'head', text: 'Tall: "I\'m in charge."', at: [0.28, 0.3], w: 0.5 },
            { t: 'cue', who: 'j', part: 'head', text: 'Small: "You win!"', at: [0.72, 0.5], w: 0.45 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'amaroq', id: 'a', pose: 'glare', x: 0.52, y: 0.93, s: 1.35 }],
          text: [
            { t: 'cap', text: 'Some were warnings.', at: 'tl', w: 0.95 },
            { t: 'cue', who: 'a', part: 'head', text: 'Hair up, hard stare: "Back off!"', at: [0.45, 0.3], w: 0.8 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          cast: [{ c: 'kapu', id: 'k', pose: 'playbow', x: 0.5, y: 0.93, s: 1.6 }],
          text: [
            { t: 'cap', text: 'And some were just for fun.', at: 'tl', w: 0.95 },
            { t: 'cue', who: 'k', part: 'tail', text: 'Front down, tail up: "Let\'s play!"', at: [0.5, 0.3], w: 0.8 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'amaroq', id: 'a', pose: 'stand', x: 0.4, y: 0.93, s: 1.2, tweak: { tail: -70 } },
            { c: 'sister', id: 'p', pose: 'crouch', x: 0.8, y: 0.95, s: 1.25, flip: true }
          ],
          text: [
            { t: 'cap', text: 'Pups begged by licking a grown wolf\'s chin.', at: 'tl', w: 0.95 },
            { t: 'cue', who: 'p', part: 'head', text: '"Please, please, please!"', at: [0.6, 0.36], w: 0.6 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 6 },
          cast: [
            { c: 'zing', pose: 'lie', x: 0.3, y: 0.94, s: 1.25 },
            { c: 'zat', pose: 'sleep', x: 0.75, y: 0.95, s: 1.25, flip: true }
          ],
          text: [
            { t: 'cap', text: 'A wolf lying calmly was saying, "All is well."', at: 'tl', w: 0.95 },
            { t: 'sfx', text: 'zzz', at: [0.82, 0.55], size: 30, color: '#fbf6ea' }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'thinking', s: 5.4, fit: ['face', 0.28, 0.62] }],
          text: [{ t: 'think', who: 'm', text: 'So staring is rude. Bowing means "play." And being small is polite...', at: [0.66, 0.36], w: 0.5, tailMax: 90 }]
        }
      ]
    },

    // ---------- Page 3: a mistake ----------
    {
      rows: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: [0.85, 0.2, 0.05], tufts: 8, fg: { x: 0.4, y: 1.06, w: 1.4, h: 0.36 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'determined', x: 0.42, y: 0.78, s: 2.1 }],
          text: [{ t: 'cap', text: 'She decided to try. She looked Amaroq right in the eye.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'burst', color: '#e7a24a', ray: '#f1c178', cx: 0.4, cy: 0.5 },
          cast: [{ c: 'amaroq', id: 'a', pose: 'glare', x: 0.64, y: 0.95, s: 1.8, flip: true }],
          text: [{ t: 'sfx', text: 'GRRRR', at: [0.5, 0.2], size: 72, rot: -6, color: '#b3352b' }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.3, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'proneLow', expr: 'scared', s: 5, fit: ['face', 0.5, 0.64] }],
          text: [{ t: 'think', who: 'm', text: 'Oops! A stare means "I want to fight!"', at: [0.5, 0.2], w: 0.8, tailMax: 60 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 8, fg: { x: 0.5, y: 1.06, w: 1.3, h: 0.3 } },
          cast: [{ c: 'miyax', pose: 'proneLow', expr: 'worried', x: 0.5, y: 0.83, s: 2, headTilt: -20 }],
          text: [{ t: 'cap', text: 'She pressed herself flat and looked away.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 8 },
          cast: [{ c: 'amaroq', pose: 'walk', x: 0.52, y: 0.92, s: 1.55, tweak: { tail: -40 } }],
          text: [{ t: 'cap', text: 'Amaroq\'s fur smoothed down. He walked away.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'happy', s: 5, fit: ['face', 0.4, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'I looked away, so I said: "You are the boss." He understood me!', at: [0.55, 0.22], w: 0.85, tailMax: 60 }]
        }
      ]
    },

    // ---------- Page 4: creeping closer ----------
    {
      rows: [[1.1, 1], [1, 1, 1, 1], [1.05, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: [0.1, 0.2, 0.04], tufts: 16, cotton: 5,
            heaves: [den(0.84, 0.58, 0.34, 0.12, 0.1)] },
          cast: [
            { c: 'miyax', pose: 'crawl', expr: 'determined', x: 0.42, y: 0.9, s: 1.55 },
            { c: 'silver', pose: 'lie', x: 0.86, y: 0.47, s: 0.6, flip: true }
          ],
          text: [{ t: 'cap', text: 'Every day she crept a little closer. She stayed low and polite, and never stared.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.35, sun: false, tufts: 8, fg: { x: 0.5, y: 1.1, w: 1.4, h: 0.45, den: { x: 0.1, y: 0.4, r: 0.05 } } },
          cast: [
            { c: 'kapu', id: 'k', pose: 'stand', x: 0.36, y: 0.72, s: 1.3, flip: true, ears: 'up', eye: 'wide' },
            { c: 'zat', pose: 'sit', x: 0.84, y: 0.74, s: 1.1, flip: true }
          ],
          text: [{ t: 'cap', text: 'One day Kapu spotted her.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.4, sun: false, tufts: 8 },
          cast: [
            { c: 'kapu', pose: 'trot', x: 0.84, y: 0.9, s: 0.95, flip: true },
            { c: 'miyax', id: 'm', pose: 'prone', expr: 'scared', x: 0.22, y: 0.94, s: 1.3 }
          ],
          text: [{ t: 'think', who: 'm', text: 'Hold still... hold still...', at: [0.35, 0.28], w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.3, sun: false, tufts: 4, polygons: false },
          cast: [
            { c: 'miyax', pose: 'prone', expr: 'surprised', s: 4.6, fit: ['face', 0.28, 0.62] },
            { c: 'kapu', pose: 'sniff', s: 2.8, x: 0.98, y: 1.18, flip: true }
          ],
          text: [{ t: 'sfx', text: 'sniff sniff', at: [0.6, 0.2], size: 36, rot: 4, color: '#fbf6ea' }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: [0.88, 0.22, 0.04], tufts: 10 },
          cast: [
            { c: 'kapu', id: 'k', pose: 'playbow', x: 0.66, y: 0.92, s: 1.7, flip: true },
            { c: 'miyax', id: 'm', pose: 'prone', expr: 'hopeful', x: 0.2, y: 0.93, s: 1.5 }
          ],
          text: [
            { t: 'cap', text: 'Then Kapu did something wonderful.', at: 'tl', w: 0.5 },
            { t: 'cue', who: 'k', part: 'tail', text: '"Let\'s play!"', at: [0.8, 0.26], w: 0.3 }
          ]
        }
      ]
    },

    // ---------- Page 5: play ----------
    {
      rows: [[1, 1, 1], [1.2, 1], [0.9, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 8 },
          cast: [{ c: 'miyax', id: 'm', pose: 'playBow', expr: 'joy', x: 0.5, y: 0.94, s: 2 }],
          text: [{ t: 'cap', text: 'Miyax bowed back, the best she could.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 8 },
          cast: [{ c: 'kapu', id: 'k', pose: 'pounce', x: 0.5, y: 0.94, s: 1.8, mouth: 'pant' }],
          text: [{ t: 'sfx', text: 'YIP!', at: [0.3, 0.3], size: 60, rot: -10 }]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.5, cy: 0.6 },
          cast: [
            { c: 'miyax', id: 'm', pose: 'proneHappy', expr: 'joy', x: 0.36, y: 0.9, s: 2.6, rot: -8 },
            { c: 'kapu', pose: 'pounce', x: 0.62, y: 0.82, s: 1.9, flip: true, mouth: 'pant', z: 2 }
          ],
          text: [
            { t: 'sfx', text: 'HA HA HA!', at: [0.28, 0.25], size: 64, rot: -8 },
            { t: 'cap', text: 'They tumbled over and over in the grass.', at: 'br', w: 0.5 }
          ]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 8 },
          cast: [{ c: 'kapu', pose: 'trot', x: 0.5, y: 0.92, s: 1.3, tweak: { tail: -130 } }],
          text: [{ t: 'cap', text: 'Then Kapu trotted home, tail high.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 8 },
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'joy', x: 0.46, y: 0.95, s: 1.8 }],
          text: [{ t: 'say', who: 'm', text: 'I have a friend!', at: [0.5, 0.2], w: 0.8 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 8, heaves: [den(0.5, 0.62, 0.8, 0.14)] },
          cast: [
            { c: 'kapu', id: 'k', pose: 'lie', x: 0.46, y: 0.52, s: 0.9 },
            { c: 'sister', pose: 'lie', x: 0.64, y: 0.53, s: 0.8, flip: true }
          ],
          text: [{ t: 'cap', text: 'Her first friend in the pack.', at: 'tl', w: 0.95 }]
        }
      ]
    },

    // ---------- Page 6: the leader comes ----------
    {
      rows: [[1.3, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'sky', sky: L, sun: [0.18, 0.2, 0.05] },
          cast: [{ c: 'amaroq', id: 'a', pose: 'standTall', x: 0.62, y: 1.1, s: 3.6, flip: true }],
          fx: [{ type: 'vignette', o: 0.3 }],
          text: [{ t: 'cap', text: 'Then a shadow fell across the grass. Amaroq was standing over her.', at: 'tl', w: 0.42 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.3, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'proneLow', expr: 'scared', s: 5, fit: ['face', 0.5, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'Don\'t stare. Be small.', at: [0.5, 0.2], w: 0.8, tailMax: 60 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.45, sun: false, tufts: 8 },
          cast: [{ c: 'miyax', id: 'm', pose: 'proneLow', expr: 'worried', x: 0.5, y: 0.93, s: 1.8, headTilt: -15 }],
          text: [{ t: 'whisper', who: 'm', text: 'Mmm-eee...', at: [0.62, 0.3], w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.35, sun: false, tufts: 8 },
          cast: [
            { c: 'miyax', pose: 'proneLow', expr: 'sleep', x: 0.28, y: 0.95, s: 1.5 },
            { c: 'amaroq', pose: 'sniff', x: 0.72, y: 0.93, s: 1.2, flip: true }
          ],
          text: [{ t: 'sfx', text: 'sniff', at: [0.5, 0.3], size: 38, color: '#fbf6ea' }]
        }
      ]
    },

    // ---------- Page 7: accepted ----------
    {
      rows: [[1, 1, 1], [1.4, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.3, sun: false, tufts: 6 },
          cast: [
            { c: 'amaroq', pose: 'headDown', x: 0.74, y: 0.97, s: 1.6, flip: true, tweak: { neck: 90, head: -5 } },
            { c: 'miyax', id: 'm', pose: 'proneReach', expr: 'hopeful', x: 0.28, y: 0.97, s: 1.6 }
          ],
          text: [{ t: 'cap', text: 'Like a pup, she reached up and gently patted his chin.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 4 },
          cast: [{ c: 'amaroq', id: 'a', pose: 'greet', s: 2.6, x: 0.62, y: 1.05, flip: true }],
          text: [{ t: 'cue', who: 'a', part: 'head', text: 'Ears soft, tail wagging: "You belong."', at: [0.5, 0.16], w: 0.85 }]
        },
        {
          bg: { scene: 'burst', color: '#f3d772', ray: '#fae7a3', cx: 0.5, cy: 0.5 },
          cast: [
            { c: 'miyax', pose: 'proneLow', expr: 'joy', x: 0.36, y: 0.95, s: 3.3 },
            { c: 'amaroq', pose: 'sniff', x: 0.76, y: 0.9, s: 2.6, flip: true, eye: 'closed' }
          ],
          text: [
            { t: 'cap', text: 'Amaroq touched her head with his nose. The leader of the pack had accepted her.', at: 'tl', w: 0.5 }
          ]
        }
      ]
    },

    // ---------- Page 8: still hungry ----------
    {
      rows: [[1, 1, 1], [1.1, 1], [1, 1, 1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: L, hz: 0.6, sun: [0.15, 0.22, 0.05], tufts: 6, fg: { x: 0.5, y: 1.05, w: 1.4, h: 0.28 } },
          cast: [{ c: 'miyax', id: 'm', pose: 'frontDance', expr: 'joy', x: 0.4, y: 0.84, s: 1.6 }],
          text: [{ t: 'shout', who: 'm', text: 'Amaroq likes me!', at: [0.72, 0.25], w: 0.3 }]
        },
        {
          bg: { scene: 'tundra', sky: L, hz: 0.5, sun: false, tufts: 6 },
          cast: [{ c: 'miyax', id: 'm', pose: 'sit', expr: 'tired', x: 0.45, y: 0.95, s: 1.9 }],
          text: [
            { t: 'cap', text: 'But friendship isn\'t food. She was still starving.', at: 'tl', w: 0.95 },
            { t: 'sfx', text: 'GRMBL', at: [0.75, 0.55], size: 40, color: '#e98c3a' }
          ]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.55, sun: [0.85, 0.38, 0.04], tufts: 12, flat: true },
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.7, y: 0.78, s: 0.9 },
            { c: 'silver', pose: 'trot', x: 0.48, y: 0.8, s: 0.85 },
            { c: 'nails', pose: 'trot', x: 0.26, y: 0.82, s: 0.85 }
          ],
          text: [{ t: 'cap', text: 'That evening the grown wolves trotted off to hunt, one behind the other.', at: 'tl', w: 0.6 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.45, sun: false, tufts: 8 },
          cast: [
            { c: 'jello', id: 'j', pose: 'sit', x: 0.36, y: 0.92, s: 1.3, ears: 'back' },
            { c: 'zat', pose: 'pounce', x: 0.8, y: 0.95, s: 1.1, flip: true }
          ],
          text: [{ t: 'cap', text: 'Jello stayed home to babysit the pups.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.4, sun: [0.8, 0.32, 0.05], tufts: 6 },
          cast: [{ c: 'miyax', pose: 'sleep', expr: 'tired', x: 0.55, y: 0.9, s: 1.2 }],
          text: [{ t: 'cap', text: 'Miyax curled up, too weak to play.', at: 'tl', w: 0.95 }]
        },
        {
          bg: { scene: 'tundra', sky: 'gold', hz: 0.35, sun: false, tufts: 4, polygons: false },
          cast: [{ c: 'miyax', id: 'm', pose: 'prone', expr: 'thinking', s: 5, fit: ['face', 0.5, 0.66] }],
          text: [{ t: 'think', who: 'm', text: 'The hunters eat. But how do the pups get food?', at: [0.5, 0.2], w: 0.85, tailMax: 50 }]
        }
      ]
    },

    // ---------- Page 9: next ----------
    {
      rows: [[1.6, 1], [1, 1]],
      panels: [
        {
          bg: { scene: 'tundra', sky: 'dusk', hz: 0.6, sun: [0.7, 0.58, 0.05], tufts: 10, flat: true },
          cast: [
            { c: 'amaroq', pose: 'trot', x: 0.34, y: 0.7, s: 0.55, flip: true },
            { c: 'silver', pose: 'trot', x: 0.24, y: 0.71, s: 0.5, flip: true },
            { c: 'nails', pose: 'trot', x: 0.14, y: 0.72, s: 0.5, flip: true }
          ],
          text: [{ t: 'cap', text: 'Far away across the tundra, the hunters were coming home.', at: 'tl', w: 0.5 }]
        },
        {
          bg: { scene: 'plain', color: '#1c2233' },
          text: [
            { t: 'title', text: 'Next:', at: [0.5, 0.4], size: 48, color: '#f2c230' },
            { t: 'title', text: 'Food from the Pack', at: [0.5, 0.66], size: 70 }
          ]
        }
      ]
    }
  ]);
})(window.JW);
