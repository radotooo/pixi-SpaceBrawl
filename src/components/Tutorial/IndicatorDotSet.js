import { Container, Graphics } from 'pixi.js';

/**
 * Initializes a new instance of IndicatorDotSet
 * @class
 * @extends {PIXI.Container}
 */
export default class IndicatorDotSet extends Container {
  /**
   * @param {Number} count The dots count
   * @param {Number} gap The gap betwee dots
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   */
  constructor(count, gap, x = 0, y = 0) {
    super();
    this._x = x;
    this._y = y;
    this._count = count;
    this._gap = gap;
    this._dots = [];
    this._activeDotIndex = 0;

    this._createDotSet(this._count, this._gap);
  }

  /**
   * Redraw dots on scene update
   * @public
   */
  update() {
    this._activeDotIndex += 1;
    if (!this._isDotExist()) return;
    this._clearOldDots();
    this._createDotSet(this._count, this._gap);
  }

  /**
   * Check if dot exist
   * @returns {Boolean}
   */
  _isDotExist() {
    return this._activeDotIndex < this._count;
  }

  /**
   * Remove old dots from canvas
   * @private
   */
  _clearOldDots() {
    if (this._dots.length > 0) {
      this._dots.forEach((c) => c.destroy());
    }
  }

  /**
   * Create dots set and based on dotIndex value make according dot active(set color white)
   * @param {Number} count The dont to number of dots to be created
   * @param {Number} gap The gap between dots
   */
  _createDotSet(count, gap) {
    const temp = this._x;

    for (let i = 0; i <= count - 1; i++) {
      if (i > 0) this._x += gap;
      const dot = new Graphics();

      if (i === this._activeDotIndex) {
        dot.beginFill(0xfffffff);
      } else {
        dot.beginFill(0x000000, 0.3);
      }
      dot.drawCircle(this._x, this._y, 6);
      dot.endFill();
      this._dots[i] = dot;
      this.addChild(dot);
    }
    this._x = temp;
  }
}
