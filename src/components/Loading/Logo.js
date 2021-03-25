import { Container, Sprite } from 'pixi.js';

/**
 * Initializes a new instance of Logo
 * @class
 * @extends {PIXI.Container}
 */
export default class Logo extends Container {
  /**
   * Logo sprite texture
   * @param {PIXI.Texture} texture
   */
  constructor(texture) {
    super();
    this._createLogo(texture);
  }

  /**
   * @private
   */
  _createLogo(texture) {
    const logo = new Sprite.from(texture);

    logo.anchor.set(0.5);
    this.addChild(logo);
  }
}
