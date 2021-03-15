import { Sprite, Texture } from 'pixi.js';

/**
 * Initializes a new instance of Part
 * @class
 */
export default class Part extends Sprite {
  /**
   * Create Sprite object
   * @param {Object} texture The Sprite texture
   * @param {Number} rotation The rotation value
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} scaleX The x scale value
   * @param {Number} scaleY The y scale value
   * @param {Number} alpha The alpha value
   */
  constructor(texture, rotation, x, y, scaleX, scaleY, alpha) {
    super(Texture.from(texture));

    this.anchor.set(0.5);
    this.rotation = rotation;
    this.position.x = x;
    this.position.y = y;
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.alpha = alpha;
  }
}
