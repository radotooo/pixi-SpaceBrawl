import { Sprite } from 'pixi.js';
import gsap from 'gsap/all';

/**
 * Initializes a new instance of Planet
 * @class
 */
export default class Planet extends Sprite {
  /**
   * @param {PIXI.Texture} texture The sprite texture
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} scaleX The scaleX value
   * @param {Number} scaleY The scaleY value
   */
  constructor(texture, x = 0, y = 0, scaleX = 1, scaleY = 1) {
    super(texture);
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.anchor.set(0.5);

    this._float();
  }

  /**
   * Add floating effect
   * @private
   */
  _float() {
    gsap.to(this, {
      x: '+=random(-10,10)',
      y: '+=random(-10,10)',
      yoyo: true,
      repeat: 1,
      duration: 'random(1,2)',
      onComplete: () => this._float(),
    });
  }
}
