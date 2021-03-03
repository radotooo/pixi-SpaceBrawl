import { Sprite, Container } from 'pixi.js';
import Shield from './Shield';
import Assets from '../../core/AssetManager';
import HealthBar from './HealthBar';

/**
 * Initializes a new instance of Rover
 * @class
 * @extends {PIXI.Container}
 */
export default class Rover extends Container {
  constructor() {
    super();
    /**
     *@type {PIXI.Sprite}
     * @private
     */
    this._activeSheildTop = null;
    /**
     *@type {PIXI.Sprite}
     * @private
     */
    this._activeSheildBottom = null;
    /**
     * @type {PIXI.Sprite}
     * @public
     */
    this.healthBar = null;
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createRoverVehicle();
    this._createRoverShadow();
    this._createInactiveSheild();
    this._createActiveSheild();
    this._createHealthBar();
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
  _createInactiveSheild() {
    const bottom = new Shield('shieldInactive', -0.8, -120, -20, 0.84, 0.82);

    const top = new Shield('shieldInactive', 0.8, -18, -120, 0.84, 0.84);

    this.addChild(bottom, top);
  }
  /**
   * @private
   */
  _createActiveSheild() {
    const bottom = new Shield('shieldActive', -2.35, -117, -20, 0.84, 0.82, 0);

    this._activeSheildBottom = bottom;

    const top = new Shield('shieldActive', -0.75, -16, -117, 0.84, 0.84);

    this._activeSheildTop = top;
    this.addChild(this._activeSheildTop, this._activeSheildBottom);
  }
  /**
   * @private
   */
  _createRoverVehicle() {
    const rover = new Sprite.from('rover');

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
   * @public
   */
  activateBottomShield() {
    this._activeSheildBottom.alpha = 1;
    this._activeSheildTop.alpha = 0;
    Assets.sounds.shieldActivate.play();
  }
  /**
   * @public
   */
  activateTopShield() {
    this._activeSheildBottom.alpha = 0;
    this._activeSheildTop.alpha = 1;
    Assets.sounds.shieldActivate.play();
  }
}
