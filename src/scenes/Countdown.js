import Scene from './Scene';
import Counter from '../components/Countdown/Counter';
import { Sprite } from 'pixi.js';
import config from '../config';
import { delay, fit, resizeScene } from '../core/utils';

const EVENTS = {
  START_GAME: 'start_game',
};

export default class Countdown extends Scene {
  constructor() {
    super();
    /**
     * @type {String}
     * @private
     */
    this._name = 'countdown';

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._counter = null;

    /**
     * @type {Object}
     * @private
     */
    this._config = config.scenes.Countdown;
  }

  async onCreated() {
    this._createBackground();
    this._createCounter();
    resizeScene(this);
    await delay(300);
    await this._counter.start();
    this.emit(Countdown.events.START_GAME);
  }

  static get events() {
    return EVENTS;
  }

  /**
   * @private
   */
  _createBackground() {
    const bg = new Sprite.from('countdownBg');

    bg.anchor.set(0.5);
    this.addChild(bg);
  }

  /**
   * @private
   */
  async _createCounter() {
    const counter = new Counter(this._config.counter);

    this._counter = counter;
    this.addChild(this._counter);
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    fit(this.background, width, height);
    resizeScene(this);
    // eslint-disable-line no-unused-vars
  }
}
