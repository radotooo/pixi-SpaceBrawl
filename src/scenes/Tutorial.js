import gsap from 'gsap/all';
import { filters } from 'pixi.js';
import config from '../config';

import InfoBar from '../components/Tutorial/InfoBar';
import Button from '../components/Button';
import Scene from './Scene';
import Slide from '../components/Tutorial/Slide';
import IndicatorDotSet from '../components/Tutorial/IndicatorDotSet';

const EVENTS = {
  TUTORIAL_DONE: 'tutorial_done',
};

export default class Tutorial extends Scene {
  constructor() {
    super();
    /**
     * @type {Object}
     * @private
     */
    this._config = config.scenes.Tutorial;
    /**
     * @type {Array}
     * @private
     */
    this._tutorialSlides = [];
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
  }
  static get events() {
    return EVENTS;
  }
  async onCreated() {
    this._createDescriptionBar();
    this._createSlide(this._config.slides.arrowUp);
    this._createSlide(this._config.slides.arrowDown);
    this._createSlide(this._config.slides.space);
    this._createIndicatorDots(3, 20);
    this._createButton('NEXT', 210, 60);
    this._setInitialValues();
    // this._setBackgroundBlur();
    this._addListeners();
  }

  /**
   * @private
   */
  _setInitialValues() {
    const currentSlide = this._tutorialSlides[this._activeSlideIndex];
    this._infoBar.setText(currentSlide.description);
    currentSlide.alpha = 1;
  }

  /**
   * @private
   */
  _createSlide(config) {
    const key = new Slide(config);
    key.y = -key.height / 2;
    key.alpha = 0;
    this._tutorialSlides.push(key);
    this.addChild(key);
  }

  /**
   * @private
   */
  _createButton(text, width, height) {
    const button = new Button(text, width, height);

    button.pivot.x = button.width / 2;
    button.pivot.y = button.height / 2;
    button.y = this.height / 2 + 45;
    this._button = button;
    this._button.buttonMode = true;
    this._button.interactive = true;
    this.addChild(button);
  }

  /**
   * @private
   */
  _createIndicatorDots(count, gap) {
    const indicatorDotSet = new IndicatorDotSet(count, gap);

    indicatorDotSet.pivot.x = indicatorDotSet.width / 2;
    indicatorDotSet.pivot.y = indicatorDotSet.height / 2;
    indicatorDotSet.y = this.height / 2 - 100;
    this._indicatorDotSet = indicatorDotSet;
    this.addChild(this._indicatorDotSet);
  }
  /**
   * @private
   */
  _createDescriptionBar() {
    const bar = new InfoBar(450, 50);

    bar.x = -this.width / 2 - bar.width / 2;
    bar.y = this.height / 2 + bar.height / 2;
    this._infoBar = bar;
    this.addChild(this._infoBar);
  }
  /**
   * Set background blur effect
   * @private
   */
  _setBackgroundBlur() {
    const blurFilter = new filters.BlurFilter();

    blurFilter.blur = 70;
    blurFilter.quality = 8;
    this.background.filters = [blurFilter];
  }
  /**
   * @private
   */
  _addListeners() {
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
    if (this._activeSlideIndex >= this._tutorialSlides.length - 1) {
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
    this._animationIsPlaying = true;
    const tl = new gsap.timeline();
    await tl
      .to(this._tutorialSlides[this._activeSlideIndex], {
        alpha: 0,
        duration: 0.2,
      })
      .to(
        this._infoBar,
        {
          alpha: 0,
          duration: 0.2,
        },
        '<'
      );
    this._animationIsPlaying = false;
  }

  /**
   * @private
   */
  async _showNextSlide() {
    this._animationIsPlaying = true;
    const tl = new gsap.timeline();
    this._infoBar.setText(
      this._tutorialSlides[this._activeSlideIndex].description
    );
    await tl
      .to(this._tutorialSlides[this._activeSlideIndex], {
        alpha: 1,
        duration: 0.2,
      })
      .to(
        this._infoBar,
        {
          alpha: 1,
          duration: 0.2,
        },
        '<'
      );
    this._animationIsPlaying = false;
  }
  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
