import gsap from 'gsap/all';
import config from '../config';
import Button from '../components/Button';
import Scene from './Scene';
import Slide from '../components/Tutorial/Slide';
import IndicatorDotSet from '../components/Tutorial/IndicatorDotSet';
import Assets from '../core/AssetManager';
import { resizeScene } from '../core/utils';

const EVENTS = {
  TUTORIAL_DONE: 'tutorial_done',
};

export default class Tutorial extends Scene {
  constructor() {
    super();
    /**
     * @type {String}
     * @private
     */
    this._name = 'tutorial';

    /**
     * @type {Object}
     * @private
     */
    this._config = config.scenes.Tutorial;

    /**
     * @type {Array}
     * @private
     */
    this._slides = [];

    /**
     * @type {Number}
     * @private
     */
    this._activeSlideIndex = 0;

    /**
     * @type {Boolean}
     * @private
     */
    this._animationIsPlaying = false;

    /**
     * @type {Boolean}
     * @private
     */
    this._tutorialDone = false;
  }

  static get events() {
    return EVENTS;
  }

  async onCreated() {
    this._createSlides();
    this._createIndicatorDots();
    this._createButton();
    this._addEventListeners();
    resizeScene(this);
  }

  /**
   * @private
   */
  _createSlides() {
    const arrowUp = new Slide(
      0,
      -220,
      'keyDefault',
      'Press the "Up arrow" key to move the shield up',
      true,
      'arrow',
      270
    );

    const arrowDown = new Slide(
      0,
      -220,
      'keyDefault',
      'Press the "Down arrow" key to move the shield down',
      false,
      'arrow',
      90
    );

    const space = new Slide(
      0,
      -115,
      'keyLong',
      'Press the "Space" key to shoot'
    );

    this.addChild(arrowUp, arrowDown, space);
    this._slides.push(arrowUp, arrowDown, space);
  }

  /**
   * @private
   */
  _createIndicatorDots() {
    const indicatorDotSet = new IndicatorDotSet(this._slides.length, 20);

    indicatorDotSet.pivot.x = indicatorDotSet.width / 2;
    indicatorDotSet.pivot.y = indicatorDotSet.height / 2;
    indicatorDotSet.y = 120;

    this._indicatorDotSet = indicatorDotSet;
    this.addChild(this._indicatorDotSet);
  }

  /**
   * @private
   */
  _createButton() {
    const button = new Button('NEXT', 210, 60, true, true);

    button.pivot.x = button.width / 2;
    button.pivot.y = button.height / 2;
    button.y = 300;

    this._button = button;
    this.addChild(button);
  }

  /**
   * @private
   */
  _addEventListeners() {
    this._button.on('click', async () => {
      this._button.handleClick();
      if (this._animationIsPlaying) return;
      this._indicatorDotSet.update();
      this._changeActiveSlide();
    });
  }

  /**
   * @private
   */
  async _changeActiveSlide() {
    if (this._activeSlideIndex >= this._slides.length - 1) {
      this._tutorialDone = true;
      this.emit(Tutorial.events.TUTORIAL_DONE);

      return;
    }

    await this._hideCurrentSlide();
    this._activeSlideIndex += 1;
    await this._showNextSlide();
  }

  /**
   * @private
   */
  async _hideCurrentSlide() {
    Assets.sounds.tutorial.play();
    this._animationIsPlaying = true;

    await gsap.to(this._slides[this._activeSlideIndex], {
      alpha: 0,
      duration: 0.1,
    });

    this._animationIsPlaying = false;
  }

  /**
   * @private
   */
  async _showNextSlide() {
    this._animationIsPlaying = true;

    await gsap.to(this._slides[this._activeSlideIndex], {
      alpha: 1,
      duration: 0.1,
    });

    this._animationIsPlaying = false;
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
