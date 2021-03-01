import { Container, Graphics } from 'pixi.js';
import PixiPlugin from 'gsap/PixiPlugin';
import Bar from '../Bar';
import gsap from 'gsap';

/**
 * Initializes a new instance of ProgressBar
 * @class
 */
export default class ProgressBar extends Container {
  constructor() {
    super();
    /**
     * @private
     * @type {PIXI.Graphics}
     */
    this._bar = new Bar(550, 55);

    this._init();
  }
  /**
   * @private
   */
  _init() {
    gsap.registerPlugin(PixiPlugin);
    this._createProgressBar();
    this._bar.addChild(this._progressBar);
    this.addChild(this._bar);
  }

  /**
   * @private
   */
  _createProgressBar() {
    const progressBar = new Graphics();

    progressBar.beginFill(0xffffff);
    progressBar.drawRoundedRect(0, 0, 535, 40, 32);
    progressBar.endFill();
    progressBar.x = 7;
    progressBar.y = 7;
    this._progressBar = progressBar;
  }

  // TODO make it goood
  /**
   * @public
   */
  async fillProgressBar() {
    await gsap.fromTo(
      this._progressBar,
      {
        pixi: {
          fillColor: 0xffffff,
          width: 0,
        },
      },
      {
        pixi: {
          fillColor: 0xffffff,
          width: 535,
        },
        duration: 2,
        ease: 'Power4.easeOut',
      }
    );
  }
}
