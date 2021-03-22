import { Container, AnimatedSprite } from 'pixi.js';
import Assets from '../../core/AssetManager';
import { delay } from '../../core/utils';

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
    animation.loop = false;
    animation.scale.set(1.5);
    animation.alpha = 0;
    this._animation = animation;
    this.addChild(this._animation);
  }

  /**
   * Play animated sprite
   * @private
   */
  async _play() {
    this._animation.alpha = 1;
    this._animation.play();
    await delay(400);
    Assets.sounds.winFirework.play();
    this._animation.onComplete = () => (this._animation.alpha = 0);
  }
}
