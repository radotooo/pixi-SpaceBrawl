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

    this._init();
  }

  /**
   * @private
   */
  _init() {
    const animation = new AnimatedSprite(
      Assets.spritesheets.booom.animations.booom
    );
    animation.anchor.set(0.5);
    animation.animationSpeed = 0.1;
    animation.loop = false;
    animation.scale.set(1.5);
    this.animation = animation;
    this.animation.alpha = 0;
    this.addChild(this.animation);
  }

  /**
   * Play animated sprite
   * @public
   */
  play() {
    this.animation.alpha = 1;
    this.animation.play();
    this.animation.onComplete = () => (this.animation.alpha = 0);
  }
}
