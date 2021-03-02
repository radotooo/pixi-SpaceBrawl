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
  assets: {
    root: '/',
  },
};
