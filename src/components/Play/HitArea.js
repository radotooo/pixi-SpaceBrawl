import { Graphics } from 'pixi.js';

/**
 * Initializes a new instance of HitArea
 * @class
 */
export default class Point extends Graphics {
  /**
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} width The width value
   * @param {Number} height The height value
   * @param {Number} angle The angle value
   */
  constructor(x, y, width, height, angle = 0) {
    super();
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._angle = angle;

    this._draw();
  }

  /**
   * @private
   */
  _draw() {
    this.beginFill(0xff0000);
    this.drawRect(this._x, this._y, this._width, this._height);
    this.angle = this._angle;
    this.alpha = 0;
    this.endFill();
  }
}
