import { Container, AnimatedSprite } from 'pixi.js';
import Assets from '../../core/AssetManager';

/**
 * Initializes a new instance of Slide
 * @class
 * @extends {PIXI.Container}
 */
export default class Firework extends Container {
  constructor() {
    super();

    this._createFirework();
    this._play();
  }

  /**
   * @private
   */
  _createFirework() {
    const animation = new AnimatedSprite(
      Assets.spritesheets.fireworks.animations.booom
    );

    animation.anchor.set(0.5);
    animation.animationSpeed = 0.1;
    animation.loop = true;
    animation.scale.set(1.5);
    animation.alpha = 0;
    this._animation = animation;
    this.addChild(this._animation);
  }

  /**
   * Play animated sprite
   * @private
   */
  _play() {
    this._animation.alpha = 1;
    this._animation.play();
  }
}
