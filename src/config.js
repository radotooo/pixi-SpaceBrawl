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
      Keys: {
        arrowUp: {
          description: 'Press the "Up arrow" key to move the shield up',
          angle: 270,
        },
        arrowDown: {
          description: 'Press the "Down arrow" key to move the shield down',
          angle: 90,
        },
        space: {
          description: 'Press the "Space" key to shoot',
        },
      },
    },
  },
  assets: {
    root: '/',
  },
};
