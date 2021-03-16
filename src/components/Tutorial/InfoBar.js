import { Container, Text } from 'pixi.js';
import Bar from '../Bar';

/**
 * Initializes a new instance of InfoBar
 * @class
 */
export default class InfoBar extends Container {
  /**
   * @param {String} text The bar text value
   * @param {Number} width The bar width value
   * @param {Number} height The bar heigth value
   */
  constructor(width, height, text = '') {
    super();
    this._initaltext = text;
    this._width = width;
    this._height = height;
    /**
     * @type {PIXI.Container}
     */
    this._bar = null;
    /**
     * @type {PIXI.Text}
     */
    this._text = null;

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._createBar();
    this.addChild(this._bar);
  }

  /**
   * @private
   */
  _createBar() {
    const bar = new Bar(this._width, this._height);

    this._bar = bar;
    const text = new Text('', {
      fill: '0xffffff',
      fontFamily: 'Ubuntu',
      fontSize: 16,
    });

    text.resolution = 2;
    text.anchor.set(0.5);
    text.x = this._bar.width / 2;
    text.y = this._bar.height / 2;
    this._text = text;
    this._bar.addChild(this._text);
  }

  /**
   * Set bar text value
   * @param {String} text
   */
  setText(text) {
    this._text.text = text;
  }
}
