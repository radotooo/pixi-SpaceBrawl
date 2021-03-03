import { Sprite } from 'pixi.js';
import config from '../../config';

export default class Rocket extends Sprite {
  constructor(texture, x = 0, y = 0, scaleX = 1, scaleY = 1) {
    super(texture);
    this._flyingPaths = config.Rocket.paths;
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.anchor.set(0.5);
  }
}
