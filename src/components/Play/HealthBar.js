import { Sprite, Container } from 'pixi.js';
import gsap from 'gsap/all';

const EVENT = {
  NO_HEALTH: 'no_health',
};

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

  static get events() {
    return EVENT;
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
    this.hpBackground = hpBackground;
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
    if (this._hpBar.width < this._hpLossOnHit * 3) {
      this._animateLowHp();
    }
    if (this._hpBar.width < 100) {
      this.emit(HealthBar.events.NO_HEALTH);
    }
  }
  /**
   * @private
   */
  _animateLowHp() {
    this.hpBackground.tint = 0xff0000;
    this._hpBar.tint = 0xff0000;
    gsap.fromTo(
      this,
      {
        delay: 1,
        alpha: 1,
      },
      {
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
      }
    );
  }
}
