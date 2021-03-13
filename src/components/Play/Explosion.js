import { Container, AnimatedSprite } from 'pixi.js';
import Assets from './../../core/AssetManager';
// import { ColorOverlayFilter } from '@pixi/filter-color-overlay';

export default class Explosion extends Container {
  constructor(x, y) {
    super();
    this._init();

    this.x = x;
    this.y = y;
  }

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

  play() {
    this.animation.alpha = 1;
    this.animation.play();
    this.animation.onComplete = () => (this.animation.alpha = 0);
  }
}
