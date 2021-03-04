import { Container, AnimatedSprite, BLEND_MODES } from 'pixi.js';
import Assets from './../../core/AssetManager';

export default class Fire extends Container {
  constructor() {
    super();

    this._top = null;
    this._bottom = null;

    this._bottom = new AnimatedSprite(Assets.spritesheets.fire.animations.fire);
    this._bottom.blendMode = BLEND_MODES.HUE;
    this._bottom.alpha = 0.1;
    this._bottom.anchor.set(0.5);
    this.addChild(this._bottom);

    this._top = new AnimatedSprite(Assets.spritesheets.fire.animations.fire);
    this._top.blendMode = BLEND_MODES.ADD_NPM;
    this._top.anchor.set(0.5);
    this.addChild(this._top);

    this.ignite();
  }

  ignite() {
    this._top.play();
    this._bottom.play();
    this.alpha = 1;
  }

  extinguish() {
    this._top.pause();
    this._bottom.pause();
    this.alpha = 0;
  }
}
