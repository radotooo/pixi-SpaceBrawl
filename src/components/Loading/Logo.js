import { Container, Sprite } from 'pixi.js';

/**
 * Initializes a new instance of Logo
 * @class
 */
export default class Logo extends Container {
  constructor() {
    super();
    this._init();
  }

  _init() {
    this._addLogo();
  }

  /**
   * @private
   */
  _addLogo() {
    const logo = new Sprite.from('ooo');
    logo.anchor.set(0.5);
    this._logo = logo;
    this.addChild(this._logo);
  }
}
