import { Container, AnimatedSprite, BLEND_MODES } from 'pixi.js';
import Assets from './../../core/AssetManager';

/**
 * Initializes a new instance of Fire
 * @class
 */
export default class Fire extends Container {
  constructor() {
    super();
    /**
     * @type {PIXI.AnimatedSprite}
     * @private
     */
    this._fire = null;

    this._createFire();
    this._play();
  }

  /**
   * @private
   */
  _createFire() {
    const fire = new AnimatedSprite(Assets.spritesheets.fire.animations.fire);
    fire.blendMode = BLEND_MODES.ADD;
    fire.anchor.set(0.5);
    this._fire = fire;
    this.addChild(this._fire);
  }

  /**
   * Play animated sprite
   * @private
   */
  _play() {
    this._fire.play();
    this.alpha = 1;
  }
}
