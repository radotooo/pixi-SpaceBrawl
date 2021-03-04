import { Container, Sprite } from 'pixi.js';
import config from '../../config';
import Fire from './Fire';

export default class Rocket extends Container {
  constructor() {
    super();
    this._flyingPaths = config.Rocket.paths;
    this._init();
  }
  _init() {
    this.sortableChildren = true;
    this._createRocket();
    this._addFire();
  }

  _createRocket() {
    const rocket = new Sprite.from('rocket');
    this.addChild(rocket);
  }

  _addFire() {
    const fire = new Fire();
    fire.position.x = 20;
    fire.position.y = 75;
    fire.angle = 270;
    fire.scale.x = 0.2;
    fire.scale.y = 0.12;
    fire.zIndex = -1;
    this.addChild(fire);
  }
}
