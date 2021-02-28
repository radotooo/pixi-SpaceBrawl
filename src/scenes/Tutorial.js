import { filters } from 'pixi.js';
import SpaceKey from '../components/Tutorial/SpaceKey';
import InfoBar from '../components/Tutorial/InfoBar';
import Button from '../components/Button';

import config from '../config';
import Scene from './Scene';
import ArrowKey from '../components/Tutorial/ArrowKeys';
import IndicatorDotSet from '../components/Tutorial/IndicatorDotSet';

export default class Tutorial extends Scene {
  constructor() {
    super();
    this._config = config.scenes.Tutorial;
    this._tutorialSlides = [];
    this._activeSlideIndex = 0;
  }

  async onCreated() {
    this._createBar();
    this._createArrowKeySlide(this._config.Keys.arrowUp);
    this._createArrowKeySlide(this._config.Keys.arrowDown);
    this._createSpaceKeySlide();
    this._createIndicatorDots(3, 20);
    this._createButton('NEXT', 210, 60);
    this._setInitialValues();
    this._addListeners();
  }

  _setInitialValues() {
    const currentSlide = this._tutorialSlides[this._activeSlideIndex];
    this._infoBar.update(currentSlide.description);
    currentSlide.alpha = 1;
  }

  _createArrowKeySlide(config) {
    const key = new ArrowKey(config);
    key.y = -key.height / 2;
    key.alpha = 0;
    this._tutorialSlides.push(key);
    this.addChild(key);
  }

  _createSpaceKeySlide() {
    const key = new SpaceKey(this._config.Keys.space);
    key.y = -key.height / 2;
    key.alpha = 0;
    this._tutorialSlides.push(key);
    this.addChild(key);
  }

  _createButton(text, width, height) {
    const button = new Button(text, width, height);

    button.pivot.x = button.width / 2;
    button.pivot.y = button.height / 2;
    button.y = window.innerHeight / 2 - 160;
    this._button = button;
    this._button.buttonMode = true;
    this._button.interactive = true;
    this.addChild(button);
  }

  _createIndicatorDots(count, gap) {
    const indicatorDotSet = new IndicatorDotSet(count, gap);

    indicatorDotSet.pivot.x = indicatorDotSet.width / 2;
    indicatorDotSet.pivot.y = indicatorDotSet.height / 2;
    indicatorDotSet.y = window.innerHeight / 2 - 338;
    this._indicatorDotSet = indicatorDotSet;
    this.addChild(this._indicatorDotSet);
  }

  _createBar() {
    const bar = new InfoBar('', 450, 50);

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

    blurFilter.blur = 40;
    blurFilter.quality = 6;
    this.background.filters = [blurFilter];
  }

  _addListeners() {
    this._button.on('click', async () => {
      this._button.handleClick();
      this._indicatorDotSet.update();
      this._changeActiveSlide();
    });
  }

  _changeActiveSlide() {
    if (this._activeSlideIndex >= this._tutorialSlides.length - 1) return;
    this._tutorialSlides[this._activeSlideIndex].alpha = 0;
    this._activeSlideIndex += 1;
    this._tutorialSlides[this._activeSlideIndex].alpha = 1;
    this._infoBar.update(
      this._tutorialSlides[this._activeSlideIndex].description
    );
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
