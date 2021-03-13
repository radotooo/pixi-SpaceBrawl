import Scene from './Scene';
import Star from '../components/Win/Star';
import Firework from '../components/Win/Firework';
import Button from '../components/Button';
import Title from '../components/Win/Title';
import { delay } from '../core/utils';

export default class Win extends Scene {
  constructor({ winner }) {
    super();
    this._winner = winner;
    this.sortableChildren = true;
  }

  async onCreated() {
    this._createStars();
    this._createTitle();
    this._createButton();
    this._createEventListeners();
    this._createFireworks();
  }

  async _createFireworks() {
    const fireWork = new Firework(-400, -100);
    this.addChild(fireWork);
    await delay(300);
    const fireWork2 = new Firework(350, -250);
    this.addChild(fireWork2);
  }

  _createEventListeners() {
    this._button.on('click', () => {
      this._button.handleClick();
      this.emit('again');
    });
  }

  _createTitle() {
    const winner = new Title(this._winner, 0, -235);

    this.addChild(winner);
  }

  _createButton() {
    const button = new Button('RETRY', 210, 60, 0, 375, true, true);
    button.pivot.x = button.width / 2;
    button.pivot.y = button.height / 2;

    this._button = button;
    this.addChild(button);
  }

  _createStars() {
    const star = new Star(-540, -360, 0.65, 35);
    const star1 = new Star(418, -375, 0.35, 40);
    const star2 = new Star(660, -70, 0.35, 20);
    const star3 = new Star(-850, -65, 0.3, 35);
    this.addChild(star, star1, star2, star3);
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // fit(this.background, { width, height });
    // fit(this.star, { width, height });
    // eslint-disable-line no-unused-vars
    // this.width = width;
    // this.height = height;
  }
}
