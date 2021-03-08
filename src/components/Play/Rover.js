import { Sprite, Container } from 'pixi.js';
import Shield from './Shield';
import HealthBar from './HealthBar';
import Rocket from './Rocket';
import gsap, { MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(MotionPathPlugin);

/**
 * Initializes a new instance of Rover
 * @class
 * @extends {PIXI.Container}
 */
export default class Rover extends Container {
  constructor() {
    super();
    /**
     * @type {PIXI.Sprite}
     * @public
     */
    this.shield = null;
    /**
     * @type {PIXI.Sprite}
     * @public
     */
    this.healthBar = null;
    this.rocket = null;
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
  }
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
    // this.addChild(healthBar);
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
    this.addChild(shadow);
  }

  /**
   * @private
   */
  _createRocket() {
    const rocket = new Rocket();
    rocket.pivot.x = rocket.width / 2;
    rocket.pivot.y = rocket.height / 2;
    rocket.x = -150;
    rocket.y = -30;
    rocket.angle = 270;
    rocket.alpha = 1;
    this.rocket = rocket;
    this.addChild(this.rocket);
  }
}
