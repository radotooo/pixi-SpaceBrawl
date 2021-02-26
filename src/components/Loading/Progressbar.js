import { Container, Graphics } from 'pixi.js';
import PixiPlugin from 'gsap/PixiPlugin';
import gsap from 'gsap';

/**
 * Initializes a new instance of ProgressBar
 * @class
 */
export default class ProgressBar extends Container {
  constructor() {
    super();
    this._init();
  }

  _init() {
    gsap.registerPlugin(PixiPlugin);
    this._createBackground();
    this._createBar();
  }

  /**
   * @private
   */
  _createBackground() {
    this._background = new Graphics();
    this._background.lineStyle(4, '0xffffff');
    this._background.drawRoundedRect(0, 0, 600, 65, 32);
    this._background.pivot.set(this.width / 2, this.height / 2);
    this._background.position.x = this.width / 2 - this._background.width / 2;
    this._background.position.y = this.height / 2 - this._background.height / 2;
    this._background.endFill();
    this.addChild(this._background);
  }

  /**
   * @private
   */
  _createBar() {
    this._bar = new Graphics();
    this._bar.beginFill(0xffffff);
    this._bar.drawRoundedRect(0, 0, 585, 50, 32);
    this._bar.endFill();
    this._bar.x = -this.width / 2 + 7;
    this._bar.y = -this.height / 2 + 7;

    this.addChild(this._bar);
  }

  // TODO make it goood
  /**
   * @public
   */
  async fillProgressBar() {
    await gsap.fromTo(
      this._bar,
      {
        pixi: {
          fillColor: 0xffffff,
          width: 0,
        },
      },
      {
        pixi: {
          fillColor: 0xffffff,
          width: 585,
        },
        duration: 2,
        ease: 'Power4.easeOut',
      }
    );
  }
}
