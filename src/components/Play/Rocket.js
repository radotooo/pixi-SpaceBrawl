import { Container, Sprite } from 'pixi.js';
import gsap, { MotionPathPlugin } from 'gsap';
import { random } from '../../core/utils';
import Fire from './Fire';

const EVENTS = {
  RESET: 'reset',
};

export default class Rocket extends Container {
  constructor(config) {
    super();
    this._paths = config.paths;
    this._init();
  }

  static get events() {
    return EVENTS;
  }

  _init() {
    this.sortableChildren = true;
    this._createRocket();
    this._addFire();
  }

  _createRocket() {
    const rocket = new Sprite.from('rocket');
    this.addChild(rocket);
  }

  async resetRocket() {
    this.alpha = 0;
    this.tl.pause();
    this._animationIsPlaying = false;

    this.emit(Rocket.events.RESET);
  }

  async reverse() {
    this.tl.pause();
    this.angle = 100;

    await gsap.to(this, {
      x: -50,
      y: 'random(-50,50)',
      duration: 1.5,
    });
  }

  async fire() {
    if (this._animationIsPlaying) return;

    const tl = new gsap.timeline();
    const randomPath = Math.floor(random(0, this._paths.length));

    this.tl = tl;

    this._animationIsPlaying = true;
    this.alpha = 1;

    await this.tl.fromTo(
      this,
      {
        x: -100,
        y: 22,
      },
      {
        motionPath: {
          path: this._paths[randomPath],
          // path:
          //   'M1 1C-0.33333 82.3333 82.2 243.6 423 238C763.8 232.4 958.333 186.333 1013 164',
          start: 1,
          end: 0,
          align: this,
          offsetX: -960,
          offsetY: -180,
          autoRotate: 1.57,
          useRadians: true,
        },

        duration: 3,
        ease: 'power1.in',
      }
    );
    this.alpha = 0;
    this._animationIsPlaying = false;
  }

  _addFire() {
    const fire = new Fire();
    fire.position.x = 20;
    fire.position.y = 75;
    fire.angle = 270;
    fire.scale.x = 0.2;
    fire.scale.y = 0.12;
    fire.zIndex = -1;
    this.addChild(fire);
  }
}
