import { Container, Text } from 'pixi.js';
import Bar from '../Bar';

export default class InfoBar extends Container {
  /**
   * @param {String} text The bar initial text value
   * @param {Number} width The bar width size
   * @param {Number} height The bar heigth size
   */
  constructor(text, width, height) {
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
    const text = new Text(this._initaltext, {
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
   * Change bar text value
   * @param {String} text
   */
  update(text) {
    this._text.text = text;
  }
}
