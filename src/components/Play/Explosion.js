import { Container, AnimatedSprite } from 'pixi.js';
import Assets from './../../core/AssetManager';

/**
 * Initializes a new instance of Explosion
 * @class
 * @extends {PIXI.Container}
 */
export default class Explosion extends Container {
  constructor() {
    super();
    /**
     * @type {PIXI.AnimatedSprite}
     * @private
     */
    this._animation = null;

    this._createExplosion();
  }

  /**
   * @private
   */
  _createExplosion() {
    const animation = new AnimatedSprite(
      Assets.spritesheets.booom.animations.booom
    );

    animation.anchor.set(0.5);
    animation.animationSpeed = 0.1;
    animation.loop = false;
    animation.scale.set(1.5);

    this._animation = animation;
    this._animation.alpha = 0;
    this.addChild(this._animation);
  }

  /**
   * Play explosion animation
   * @public
   */
  play() {
    this._animation.alpha = 1;
    this._animation.play();
    this._animation.onComplete = () => (this._animation.alpha = 0);
  }
}
