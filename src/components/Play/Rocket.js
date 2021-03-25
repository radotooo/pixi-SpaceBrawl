import { Container, Sprite } from 'pixi.js';
import gsap from 'gsap';
import { random, setSpatial } from '../../core/utils';
import Fire from './Fire';
import Assets from '../../core/AssetManager';

const EVENTS = {
  RESET: 'reset',
};

/**
 * Initializes a new instance of Rocket
 * @class
 * @extends {PIXI.Container}
 */
export default class Rocket extends Container {
  /**
   * @param {Object} config The rocket configuration
   */
  constructor(config) {
    super();
    this._paths = config.paths;

    /**
     * @private
     */
    this._animationIsPlaying = false;

    this._init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * @private
   */
  _init() {
    this.sortableChildren = true;
    this._createRocket();
    this._addFire();
  }

  /**
   * @private
   */
  _createRocket() {
    const rocket = new Sprite.from('rocket');

    this.addChild(rocket);
  }

  /**
   * @private
   */
  _addFire() {
    const fire = new Fire();

    fire.position.x = 20;
    fire.position.y = 75;
    fire.angle = 270;
    fire.scale.x = 0.2;
    fire.scale.y = 0.15;
    fire.zIndex = -1;

    this.addChild(fire);
  }

  /**
   * @public
   */
  playExplosionSound() {
    setSpatial(Assets.sounds.rocketExplosion, this);
    Assets.sounds.rocketExplosion.volume(0.3);
    Assets.sounds.rocketExplosion.play();
  }

  /**
   * @public
   */
  playShieldHitSound() {
    setSpatial(Assets.sounds.rocketReverseHit, this);
    Assets.sounds.rocketReverseHit.play();
    Assets.sounds.rocketReverseHit.volume(0.1);
  }

  /**
   * @private
   */
  _playShieldBounceSound() {
    setSpatial(Assets.sounds.bounce, this);
    Assets.sounds.bounce.play();
    Assets.sounds.bounce.volume(0.1);
    setTimeout(() => {
      Assets.sounds.bounce.stop();
    }, 700);
  }

  /**
   * @private
   */
  _playRocketLaunchSound() {
    setSpatial(Assets.sounds.rocketLaunch, this);
    Assets.sounds.rocketLaunch.play();
    Assets.sounds.rocketLaunch.volume(0.1);
  }

  /**
   * Send rocket back to sender
   * @public
   */
  async reverse() {
    this.tl.pause();
    this.angle = 100;
    this._playShieldBounceSound();

    await gsap.to(this, {
      x: -50,
      y: 'random(-50,50)',
      duration: 1,
    });
  }

  /**
   * Set rocket in starting position
   * @public
   */
  async resetRocket() {
    this.alpha = 0;
    this.tl.pause();
    this._animationIsPlaying = false;

    this.emit(Rocket.events.RESET);
  }

  /**
   * Firing a rocket
   * @public
   */
  async fire() {
    if (this._animationIsPlaying) return;

    const tl = new gsap.timeline();
    const randomPath = Math.floor(random(0, this._paths.length));

    this.tl = tl;
    this._animationIsPlaying = true;
    this._playRocketLaunchSound();

    await this.tl
      .fromTo(
        this,
        {
          x: -100,
          y: 22,
        },
        {
          motionPath: {
            path: this._paths[randomPath],
            start: 1,
            end: 0,
            align: this,
            offsetX: -960,
            offsetY: -180,
            autoRotate: 1.57,
            useRadians: true,
          },

          duration: 2,
          ease: 'power1.in',
        }
      )
      .to(
        this,
        {
          alpha: 1,
          duration: 0.5,
        },
        '<'
      );

    this.alpha = 0;
    this._animationIsPlaying = false;
  }
}
