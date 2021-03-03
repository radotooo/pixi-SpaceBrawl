import { Sprite, Container } from 'pixi.js';

/**
 * Initializes a new instance of HealthBar
 * @class
 * @extends PIXI.Container
 */
export default class HealthBar extends Container {
  constructor() {
    super();
    /**
     * @type {PIXI.Sprite}
     * @private
     */
    this._hpBar = null;
    /**
     * @type {Number}
     * @private
     */
    this._hpLossOnHit = 0;
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createBackground();
    this._createHealthBar();
    this._setHpLoss();
  }
  /**
   * @private
   */
  _createHealthBar() {
    const hpBar = new Sprite.from('roverHpBarFill');

    hpBar.y = -80;
    hpBar.x = -69.5;
    hpBar.scale.x = 1.4;
    this._hpBar = hpBar;
    this.addChild(this._hpBar);
  }
  /**
   * @private
   */
  _createBackground() {
    const hpBackground = new Sprite.from('roverHpBarbg');

    hpBackground.y = -75;
    hpBackground.x = -10;
    hpBackground.anchor.set(0.5);
    this.addChild(hpBackground);
  }
  /**
   * Set hp loss to 10% of element width
   * @private
   */
  _setHpLoss() {
    this._hpLossOnHit = this._hpBar.width * 0.1;
  }
  /**
   * @public
   */
  reduceHealth() {
    this._hpBar.width -= this._hpLossOnHit;

    if (this._hpBar.width < 1) {
      console.log('gg');
    }
  }
}
