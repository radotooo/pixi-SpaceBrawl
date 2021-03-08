import { Container, Sprite } from 'pixi.js';
import gsap, { MotionPathPlugin } from 'gsap/all';
import config from '../../config';
import Fire from './Fire';

export default class Rocket extends Container {
  constructor() {
    super();
    this._flyingPaths = config.Rocket.paths;
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
    console.log('reset in');
    this.tl.pause();
    this.angle = 270;
    this.alpha = 0;
    this._animationIsPlaying = false;
    this.emit('reset');
  }

  async reverse() {
    this.tl.pause();
    this.emit('reverse');
    this.angle = 90;
    await this.tl.reverse();
  }

  async fire() {
    if (this._animationIsPlaying) return;

    const tl = new gsap.timeline();

    this.tl = tl;
    this._animationIsPlaying = true;
    this.alpha = 1;

    await this.tl.fromTo(
      this,
      {
        angle: 270,
        x: -100,
        y: -30,
      },
      {
        x: -1500,
        y: -300,
        duration: 4,
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
