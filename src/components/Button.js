import { Container, Graphics, Text } from 'pixi.js';
import gsap from 'gsap/all';

/**
 * Initializes a new instance of Button
 * @class
 */
export default class Button extends Container {
  /**
   * @param {String} buttonText The button text value
   * @param {Number} width The button width size value
   * @param {Number} height The button height size value
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Boolean} buttonMode Make coursor pointer
   * @param {Boolean} interactive Make button clickable
   */
  constructor(
    buttonText,
    width,
    height,
    x = 0,
    y = 0,
    buttonMode = false,
    interactive = false
  ) {
    super();
    this._height = height;
    this._width = width;
    this._text = buttonText;

    this._init();

    this.x = x;
    this.y = y;
    this.buttonMode = buttonMode;
    this.interactive = interactive;
  }

  /**
   * @private
   */
  _init() {
    this._createBackground();
    this._createText();
    this._button.addChild(this._buttonText);
    this.addChild(this._button);
  }

  /**
   * @private
   */
  _createBackground() {
    const button = new Graphics();

    button.beginFill(0xffffff);
    button.drawRoundedRect(0, 0, this._width, this._height, this._height);
    button.endFill();
    this._button = button;
  }

  /**
   * @private
   */
  _createText() {
    const buttonText = new Text(this._text, {
      fontFamily: 'Arial',
      fontSize: 20,
      fontWeight: 600,
    });

    buttonText.anchor.set(0.5);
    buttonText.x = this._width / 2;
    buttonText.y = this._height / 2;
    this._buttonText = buttonText;
  }

  /**
   * @public
   */
  async handleClick() {
    await gsap.fromTo(
      this.scale,
      { x: 1, y: 1 },
      {
        duration: 0.05,
        x: 0.95,
        y: 0.95,
        yoyo: true,
        repeat: 1,
      }
    );
  }
}
