import { Container, Graphics } from 'pixi.js';
import Bar from '../Bar';

/**
 * Initializes a new instance of ProgressBar
 * @class
 * @extends {PIXI.Container}
 */
export default class ProgressBar extends Container {
  constructor() {
    super();
    /**
     * @private
     * @type {PIXI.Graphics}
     */
    this._bar = null;
    /**
     * @private
     * @type {PIXI.Graphics}
     */
    this._progressBar = null;

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._bar = new Bar(550, 55);
    this._progressBar = new Graphics();

    this.addChild(this._bar);
  }

  /**
   * @public
   */
  fillProgressBar(val) {
    this._progressBar.clear();
    const progressBar = new Graphics();
    progressBar.beginFill(0xffffff);
    progressBar.drawRoundedRect(0, 0, 540 * (val / 100), 40, 32);
    progressBar.endFill();
    progressBar.x = 7;
    progressBar.y = 7;
    this._progressBar = progressBar;
    this._bar.addChild(this._progressBar);
  }
}
