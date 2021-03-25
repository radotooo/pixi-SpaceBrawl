import { Container, Graphics } from 'pixi.js';

/**
 * Initializes a new instance of Bar
 * @class
 * @extends {PIXI.Container}
 */
export default class Bar extends Container {
  /**
   * @param {Number} width Element width
   * @param {Number} height Element height
   */
  constructor(width, height) {
    super();
    this._barWidth = width;
    this._barHeight = height;

    this._createBar();
  }

  /**
   * @private
   */
  _createBar() {
    const bar = new Graphics();

    bar.lineStyle(3, '0xffffff');
    bar.drawRoundedRect(
      0,
      0,
      this._barWidth,
      this._barHeight,
      this._barHeight / 2 - 1
    );
    bar.endFill();

    this.addChild(bar);
  }
}
