import { Sprite, Container } from 'pixi.js';
import Shield from './Shield';
import HealthBar from './HealthBar';
import Rocket from './Rocket';
import gsap from 'gsap/all';

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
    this.tl = new gsap.timeline();
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createRoverVehicle();
    this._createRoverShadow();
    this._createHealthBar();
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
    this.addChild(healthBar);
  }
  /**
   * @private
   */
  _createRoverVehicle() {
    const rover = new Sprite.from('rover');
    this.vehicle = rover;
    rover.anchor.set(0.5);
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
    rocket.x = -150;
    rocket.y = -30;
    rocket.angle = 290;
    rocket.alpha = 0;
    this._rocket = rocket;
    this.addChild(rocket);
  }

  stopRocket() {
    this.tl.pause();
  }

  async fireRocket() {
    this._rocket.alpha = 1;
    await this.tl.to(this._rocket, {
      x: -1500,
      y: -140,
      duration: 3,
      onComplete: this.tl.seek(0),
    });
    this._rocket.alpha = 0;
  }
}
