import { Container, AnimatedSprite } from 'pixi.js';
import Assets from '../../core/AssetManager';

export default class Firework extends Container {
  constructor(x, y) {
    super();
    this._createFirework();
    this._play();
    this.x = x;
    this.y = y;
  }

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

  _play() {
    this._animation.alpha = 1;
    this._animation.play();
  }
}
