import { Sprite, Container } from 'pixi.js';
import InfoBar from './InfoBar';

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
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createKeyImg();
    this._createInfoBar();
    this._setFocus();
  }
  /**
   * @private
   */
  _setFocus() {
    this.alpha = 0;
    if (this._config.onFocus) {
      this.alpha = 1;
    }
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
  _createKeyImg() {
    const key = new Sprite.from(this._config.img.assert);

    key.anchor.set(0.5);
    key.x = this._config.img.x;
    key.y = this._config.img.y;
    this._key = key;

    if (this._config.hasCap) {
      const keyCap = new Sprite.from(this._config.cap.img);
      keyCap.anchor.set(0.5);
      keyCap.angle = this._config.cap.angle;
      this._key.addChild(keyCap);
    }

    this.addChild(this._key);
  }
  /**
   * @private
   */
  _createInfoBar() {
    const bar = new InfoBar(450, 50);
    bar.x = -220;
    bar.y = 20;
    bar.setText(this._config.description);
    this.addChild(bar);
  }
}
