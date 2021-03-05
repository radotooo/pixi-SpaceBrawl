import { Graphics } from 'pixi.js';

/**
 * Initializes a new instance of Point
 * @class
 */
export default class Point extends Graphics {
  /**
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} r The radius value
   */
  constructor(x, y, r) {
    super();
    this._x = x;
    this._y = y;
    this._r = r;

    this._draw();
  }
  /**
   * @private
   */
  _draw() {
    this.beginFill(0xff0000);
    this.drawCircle(this._x, this._y, this._r);
    this.endFill();
  }
}
