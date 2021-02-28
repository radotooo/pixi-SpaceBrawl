import { Sprite, Container } from 'pixi.js';

/**
 * Initializes a new instance of ArrowKey
  
 * @class
 */
export default class ArrowKey extends Container {
  /**
   * @param {Object} config Key config
   */
  constructor(config) {
    super();
    this._config = config;

    this._createArrowKey();
  }
  /**
   * @returns {String} Key description
   */
  get description() {
    return this._config.description;
  }
  /**
   * @private
   */
  _createArrowKey() {
    const key = new Sprite.from('keyDefault');
    const keyCap = new Sprite.from('arrow');

    key.anchor.set(0.5);

    keyCap.anchor.set(0.5);
    keyCap.angle = this._config.angle;
    this._key = key;
    this._keyCap = keyCap;
    this._key.addChild(this._keyCap);
    this.addChild(this._key);
  }
}
