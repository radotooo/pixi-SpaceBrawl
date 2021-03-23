import { Container, Sprite } from 'pixi.js';
import HealthBar from './HealthBar';
import { GlowFilter } from '@pixi/filter-glow';

/**
 * Initializes a new instance of Vehicle
 * @class
 * @extends {PIXI.Container}
 */
export default class Vehicle extends Container {
  constructor() {
    super();
    /**
     * @type {PIXI.Sprite}
     * @public
     */
    this.car = null;

    /**
     * @type {PIXI.Sprite}
     * @public
     */
    this.healthBar = null;

    this._init();
  }

  _init() {
    this._createHpBar();
    this._createCar();
  }

  /**
   * @private
   */
  _createHpBar() {
    const healthBar = new HealthBar();

    this.healthBar = healthBar;
    this.addChild(this.healthBar);
  }

  /**
   * @private
   */
  _createCar() {
    const car = new Sprite.from('rover');

    car.anchor.set(0.5);
    car.filters = [];

    this.car = car;
    this.addChild(this.car);
  }

  /**
   * @public
   */
  toggleVehicleGlowFilter() {
    if (this.car.filters.length === 0) {
      this.car.filters = [
        new GlowFilter({
          outerStrength: 8,
          distance: 3,
          color: 0xaffffff,
        }),
      ];
    } else {
      this.car.filters = [];
    }
  }
}
