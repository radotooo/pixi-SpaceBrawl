import { Sprite, Container } from 'pixi.js';
import InfoBar from './InfoBar';

/**
 * Initializes a new instance of Slide
  
 * @class
 */
export default class Slide extends Container {
  /**
   * @param {Number} keyX The key img x coordinate value
   * @param {Number} keyY The key img y coordinate value
   * @param {String} texture The key texture
   * @param {String} barDescription The info bar description text
   * @param {Boolean} onFocus Set alpha value of slide
   * @param {String} capTexture The key cap texture
   * @param {Number} capAngle The key cap angle
   */
  constructor(
    keyX,
    keyY,
    texture,
    barDescription,
    onFocus = false,
    capTexture = '',
    capAngle = 0
  ) {
    super();
    this._keyX = keyX;
    this._keyY = keyY;
    this._texture = texture;
    this._barDescription = barDescription;
    this._onFocus = onFocus;
    this._capTexture = capTexture;
    this._capAngle = capAngle;

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
    if (this._onFocus) {
      this.alpha = 1;
    }
  }
  /**
   * @readonly
   * @returns {String} Slide description
   */
  get description() {
    return this._barDescription;
  }
  /**
   * @private
   */
  _createKeyImg() {
    const key = new Sprite.from(this._texture);

    key.anchor.set(0.5);
    key.x = this._keyX;
    key.y = this._keyY;
    this._key = key;

    if (this._hasCap) {
      const keyCap = new Sprite.from(this._capTexture);

      keyCap.anchor.set(0.5);
      keyCap.angle = this._capAngle;
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
    bar.setText(this._barDescription);
    this.addChild(bar);
  }
}
