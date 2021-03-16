import { Texture, Sprite } from 'pixi.js';
import gsap from 'gsap';

/**
 * Initializes a new instance of Star
 * @class
 * @extends {PIXI.Sprite}
 */
export default class Star extends Sprite {
  /**
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} scale The scale value
   * @param {Number} angle The angle value
   */
  constructor(x, y, scale, angle) {
    super(Texture.from('star'));

    this.x = x;
    this.y = y;
    this.scale.set(scale);
    this.angle = angle;
    this.anchor.set(0.5);

    this._addRotationEffect();
    this._float();
  }

  /**
   * Add flaot effect to star
   * @private
   */
  _float() {
    gsap.to(this, {
      x: '+=random(-20,20)',
      y: '+=random(-20,20)',
      yoyo: true,
      repeat: 1,
      duration: 'random(1,2)',
      ease: 'power1.inOut',
      onComplete: () => this._float(),
    });
  }

  /**
   * Add rotation effect to star on mouse movement
   * @private
   */
  _addRotationEffect() {
    window.addEventListener('mousemove', ({ movementY }) => {
      gsap.set(this, {
        pixi: {
          angle: movementY <= 0 ? `-=random(1,3)` : '+=random(1,3)',
        },
      });
    });
  }
}
