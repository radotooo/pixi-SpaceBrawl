import { Sprite, Container } from 'pixi.js';
import Shield from './Shield';
import HealthBar from './HealthBar';
import Rocket from './Rocket';
import gsap, { MotionPathPlugin } from 'gsap/all';
import Explosion from './Explosion';

gsap.registerPlugin(MotionPathPlugin);

/**
 * Initializes a new instance of Rover
 * @class
 * @extends {PIXI.Container}
 */
export default class Rover extends Container {
  constructor(config) {
    super();
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
    this.healthBar = null;
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
    this._createHealthBar();
    this._createRoverVehicle();
    this._createRoverShadow();
    this._createRocket();
    this._createShied();
    this._createExplosion();
  }
  /**
   * @private
   */
  _createExplosion() {
    const explosion = new Explosion(-10, -65);
    this._explosion = explosion;
    this.addChild(this._explosion);
  }
  /**
   * @private
   */
  _hideRoverParts() {
    this.vehicle.alpha = 0;
    this.shield.alpha = 0;
    this.healthBar.alpha = 0;
    this._shadow.alpha = 0;
  }
  /**
   * Rover explosion animation
   * @public
   */
  async explode() {
    const tl = new gsap.timeline();
    await tl.fromTo(
      this.vehicle,
      {
        x: '-5',
      },
      {
        x: '+5',
        duration: 0.04,
        yoyo: true,
        repeat: 30,
        onComplete: () => this._hideRoverParts(),
      }
    );

    this._explosion.play();
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
  _createHealthBar() {
    const healthBar = new HealthBar();
    this.healthBar = healthBar;
  }
  /**
   * @private
   */
  _createRoverVehicle() {
    const rover = new Sprite.from('rover');
    this.vehicle = rover;
    rover.anchor.set(0.5);
    this.vehicle.addChild(this.healthBar);
    this.addChild(rover);
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
}
