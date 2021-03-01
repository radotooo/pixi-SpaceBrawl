import { Sprite, Container } from 'pixi.js';

/**
 * Initializes a new instance of Slide
  
 * @class
 */
export default class Slide extends Container {
  /**
   * @param {Object} config Slide config
   */
  constructor(config) {
    super();
    this._config = config;
    this._createSlide();
  }
  /**
   * @readonly
   * @returns {String} Slide description
   */
  get description() {
    return this._config.description;
  }
  /**
   * @private
   */
  _createSlide() {
    const key = new Sprite.from(this._config.img);
    key.anchor.set(0.5);
    this._key = key;
    if (this._config.hasCap) {
      const keyCap = new Sprite.from(this._config.cap.img);
      keyCap.anchor.set(0.5);
      keyCap.angle = this._config.cap.angle;
      this._key.addChild(keyCap);
    }
    this.addChild(this._key);
  }
}
