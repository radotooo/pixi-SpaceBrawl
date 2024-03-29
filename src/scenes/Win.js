import Scene from './Scene';
import Star from '../components/Win/Star';
import Firework from '../components/Win/Firework';
import Button from '../components/Button';
import Title from '../components/Win/Title';
import { delay, random, resizeScene } from '../core/utils';
import Assets from '../core/AssetManager';

const EVENTS = {
  RESTART_GAME: 'restart_game',
};

export default class Win extends Scene {
  /**
   * @param {String} winner The win scene title texture
   */
  constructor({ winner }) {
    super();
    this._winner = winner;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._button = null;

    /**
     * @type {Boolean}
     * @private
     */
    this._sceneDone = false;
  }

  async onCreated() {
    this._createStars();
    this._createTitle();
    this._createButton();
    this._createFireworks(5);
    this._playVictorySound();
    this._addEventListeners();
    resizeScene(this);
  }

  static get events() {
    return EVENTS;
  }

  /**
   * @private
   */
  _createStars() {
    const star = new Star(-540, -340, 0.65, 35);
    const star1 = new Star(418, -355, 0.35, 40);
    const star2 = new Star(660, -50, 0.35, 20);
    const star3 = new Star(-850, -45, 0.3, 35);

    this.addChild(star, star1, star2, star3);
  }

  /**
   * @private
   */
  _createTitle() {
    const winner = new Title(this._winner);

    this.addChild(winner);
  }

  /**
   * @private
   */
  _createButton() {
    const button = new Button('RETRY', 210, 60, true, true);

    button.pivot.x = button.width / 2;
    button.pivot.y = button.height / 2;
    button.y = 375;

    this._button = button;
    this.addChild(button);
  }

  /**
   * @param {Number} count Fireworks count
   * @private
   */
  async _createFireworks(count) {
    await delay(1000);

    for (let i = 0; i < count; i++) {
      if (this._sceneDone) return;

      const fireWork = new Firework();

      fireWork.x = random(-500, 500);
      fireWork.y = random(-400, 100);
      this.addChild(fireWork);
      await delay(800);
    }
  }

  /**
   * @private
   */
  _playVictorySound() {
    Assets.sounds.victory.volume(0.5);
    Assets.sounds.victory.play();
  }

  /**
   * @private
   */
  _addEventListeners() {
    this._button.on('click', async () => {
      this._sceneDone = true;
      this._button.handleClick();
      this.emit(Win.events.RESTART_GAME);
    });
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  // eslint-disable-next-line no-unused-vars
  onResize(width, height) {
    resizeScene(this);
  }
}
