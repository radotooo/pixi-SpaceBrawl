import { Container, Graphics } from 'pixi.js';

/**
 * Initializes a new instance of Bar
 * @class
 */
export default class Bar extends Container {
  /**
   * @param {Number} width Element width
   * @param {Number} height Element height
   */
  constructor(width, height) {
    super();
    this.barWidth = width;
    this.barHeight = height;

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
      this.barWidth,
      this.barHeight,
      this.barHeight / 2 - 1
    );
    bar.endFill();
    this._bar = bar;
    this.addChild(this._bar);
  }
}
