import { Sprite, Container } from 'pixi.js';

/**
 * Initializes a new instance of Title
 * @class
 */
export default class Title extends Container {
  /**
   * @param {String} texture The texture name
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordiante value
   */
  constructor(texture, x, y) {
    super();
    this._texture = texture;
    this._x = x;
    this._y = y;

    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createWinner();
    this._createText();
  }
  /**
   * @private
   */
  _createWinner() {
    const winner = new Sprite.from(this._texture);

    winner.x = this._x;
    winner.y = this._y;
    winner.anchor.set(0.5);
    this.addChild(winner);
  }
  /**
   * @private
   */
  _createText() {
    const text = new Sprite.from('wins');

    text.y = 155;
    text.anchor.set(0.5);
    this.addChild(text);
  }
}
