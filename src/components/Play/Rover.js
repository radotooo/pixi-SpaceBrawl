import { Sprite, Container } from 'pixi.js';
import Shield from './Shield';
import Vehicle from './Vehicle';
import Rocket from './Rocket';
import gsap, { MotionPathPlugin } from 'gsap/all';
import Explosion from './Explosion';
import Assets from '../../core/AssetManager';

gsap.registerPlugin(MotionPathPlugin);

/**
 * Initializes a new instance of Rover
 * @class
 * @extends {PIXI.Container}
 */
export default class Rover extends Container {
  /**
   * @param {Object} config The rover configuration
   */
  constructor(config) {
    super();
    /**
     * @private
     */
    this._config = config;

    /**
     * @type {PIXI.Container}
     * @public
     */
    this.shield = null;

    /**
     * @type {PIXI.Container}
     * @public
     */
    this.vehicle = null;

    /**
     * @type {PIXI.Container}
     * @public
     */
    this.rocket = null;

    /**
     * @type {Boolean}
     * @private
     */
    this._animationIsPlaying = false;

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._createRoverVehicle();
    this._createRoverShadow();
    this._createRocket();
    this._createShied();
    this._createExplosion();
    this._addListeners();
  }

  /**
   * @private
   */
  _createRoverVehicle() {
    const vehicle = new Vehicle();

    this.vehicle = vehicle;
    this.addChild(this.vehicle);
  }

  /**
   * @private
   */
  _createRoverShadow() {
    const shadow = new Sprite.from('roverShadow');
    shadow.anchor.set(0.5);
    shadow.y = 80;
    this._shadow = shadow;
    this.addChild(this._shadow);
  }

  /**
   * @private
   */
  _createRocket() {
    const rocket = new Rocket(this._config.rocket);

    rocket.pivot.x = rocket.width / 2;
    rocket.pivot.y = rocket.height / 2;
    rocket.x = -150;
    rocket.y = -30;
    rocket.alpha = 0;
    this.rocket = rocket;
    this.addChild(this.rocket);
  }

  /**
   * @private
   */
  _createShied() {
    const shield = new Shield();
    this.shield = shield;
    this.addChild(this.shield);
  }

  /**
   * @private
   */
  _createExplosion() {
    const explosion = new Explosion();
    explosion.x = -10;
    explosion.y = -65;
    this._explosion = explosion;
    this.addChild(this._explosion);
  }

  /**
   * @private
   */
  _hideRoverParts() {
    this.vehicle.alpha = 0;
    this.shield.alpha = 0;
    this._shadow.alpha = 0;
  }

  /**
   * Rover explosion animation
   * @public
   */
  async explode() {
    const tl = new gsap.timeline();
    await tl.fromTo(
      this.vehicle.scale,
      {
        x: '0.9',
        y: '0.9',
      },
      {
        x: '1.1',
        y: '1.1',
        duration: 0.08,
        yoyo: true,
        repeat: 10,
        onComplete: () => this._hideRoverParts(),
      }
    );

    Assets.sounds.roverExplosion.play();

    this._explosion.play();
  }

  /**
   * @private
   */
  _addListeners() {
    this.rocket.on(Rocket.events.RESET, () => {
      this.vehicle.toggleVehicleGlowFilter();
    });
  }
}
