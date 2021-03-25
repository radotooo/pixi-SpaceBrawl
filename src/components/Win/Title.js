import { Sprite, Container } from 'pixi.js';

/**
 * Initializes a new instance of Title
 * @class
 * @extends {PIXI.Container}
 */
export default class Title extends Container {
  /**
   * @param {String} texture The texture name
   */
  constructor(texture) {
    super();
    this._texture = texture;

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

    winner.x = this._texture === '1' ? -90 : 0;
    winner.y = -205;
    winner.scale.set(0.8);
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
