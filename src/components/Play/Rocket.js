import { Container, Sprite } from 'pixi.js';
import gsap, { MotionPathPlugin } from 'gsap';
import config from '../../config';
import { random } from '../../core/utils';
import Fire from './Fire';

export default class Rocket extends Container {
  constructor() {
    super();
    this._paths = config.Rocket.paths;
    this._init();
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
    this.tl.pause();
    this.tl.kill();
    // this.angle = 270;
    this.alpha = 0;
    this._animationIsPlaying = false;
    this.emit('reset');
  }

  async reverse() {
    this.tl.pause();
    this.emit('reverse');
    this.angle = 100;
    await this.goREv();
  }

  async goREv() {
    this._animationIsPlaying = true;

    await gsap.to(this, {
      x: -50,
      y: 'random(-50,50)',
      duration: 1,
    });

    this._animationIsPlaying = false;
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
        x: -150,
        y: 50,
      },
      {
        motionPath: {
          path: this._paths[randomPath],
          // path: 'M1 48C87 24.6667 295.2 -16 440 8C621 38 744 163 875 182',
          start: 1,
          end: 0,
          align: this,
          offsetX: -960,
          offsetY: -180,
          autoRotate: 1.57,
          useRadians: true,
        },

        duration: 2.5,
        ease: 'power1.in',
      }
    );
    this.alpha = 0;
    this._animationIsPlaying = false;
    // if (this._animationIsPlaying) return;

    // const tl = new gsap.timeline();

    // this.tl = tl;
    // this._animationIsPlaying = true;
    // this.alpha = 1;

    // await this.tl.fromTo(
    //   this,
    //   {
    //     angle: 270,
    //     x: -100,
    //     y: -30,
    //   },
    //   {
    //     x: -1500,
    //     y: -300,
    //     duration: 4,
    //   }
    // );

    // this.alpha = 0;
    // this._animationIsPlaying = false;
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
