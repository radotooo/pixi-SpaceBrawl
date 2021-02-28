import { Sprite, Container } from 'pixi.js';

export default class Key extends Container {
  constructor(config) {
    super();
    this._config = config;

    this._createSpaceKey();
  }

  get description() {
    return this._config.description;
  }

  _createSpaceKey() {
    const key = new Sprite.from('keyLong');
    key.anchor.set(0.5);
    this._spaceKey = key;
    this.addChild(this._spaceKey);
  }
}
