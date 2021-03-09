export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    worldWidth: 1000,
    worldHeight: 500,
    resizeTo: window,
    centerOnResize: true,
    antialias: true,
    // autoDensity: true, // !!!
    // resolution: 12,
  },
  game: {
    width: 1000,
    height: 500,
    drag: false,
    pinch: true,
    decelerate: true,
    wheel: false,
  },
  scenes: {
    Splash: {
      hideDelay: 1800,
    },
    Tutorial: {
      slides: {
        arrowUp: {
          onFocus: true,
          img: {
            assert: 'keyDefault',
            x: 0,
            y: -220,
            scaleY: 1,
            scaleX: 1,
          },
          description: 'Press the "Up arrow" key to move the shield up',
          hasCap: true,
          cap: {
            img: 'arrow',
            angle: 270,
          },
        },
        arrowDown: {
          onFocus: false,
          img: {
            assert: 'keyDefault',
            x: 0,
            y: -220,
            scaleY: 1,
            scaleX: 1,
          },
          description: 'Press the "Down arrow" key to move the shield down',
          hasCap: true,
          cap: {
            img: 'arrow',
            angle: 90,
          },
        },
        space: {
          onFocus: false,
          img: {
            assert: 'keyLong',
            x: 0,
            y: -115,
            scaleY: 1,
            scaleX: 1,
          },
          description: 'Press the "Space" key to shoot',
          hasCap: false,
        },
      },
      infoDots: {
        gap: 20,
      },
    },
  },
  Rocket: {
    paths: [
      'M1 167C45.3333 79.3333 202 -69 474 39C814 174 609 502 413 423C300 371 326 274 413 260C491 254 847 347.667 1013 379',
      'M0.999987 196C-2.00001 291.333 61.6 484 340 492C688 502 527 212 716 68C905 -76 1050 43 1062 133',
      'M1 1C-0.33333 82.3333 82.2 243.6 423 238C763.8 232.4 958.333 186.333 1013 164',
      'M1 185C50.3333 111 184.6 -28.4 327 6C505 49 455 335 914 330',
      'M1 91C50.6667 48 218.2 -28 491 12C832 62 689 225 905 269',
      'M1 1L1021 113',
      'M1 48C87 24.6667 295.2 -16 440 8C621 38 744 163 875 182',
    ],
  },
  assets: {
    root: '/',
  },
};
