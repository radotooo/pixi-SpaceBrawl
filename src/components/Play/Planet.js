import { Sprite } from 'pixi.js';
export default class Planet extends Sprite {
  constructor(texture, x = 0, y = 0, scaleX = 1, scaleY = 1) {
    super(texture);
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.anchor.set(0.5);
  }
}
