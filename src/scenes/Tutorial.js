import { Sprite, BlurFilter, filters, PIXI } from 'pixi.js';

import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';

export default class Tutorial extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    // this._addFooter();
    this._setBackgroundBlur();
  }

  // /**
  //  * @private
  //  */
  // _addFooter() {
  //   const footer = new Footer();
  //   footer.x = -window.innerWidth / 2;
  //   footer.y = window.innerHeight / 2 - footer.height;
  //   this.addChild(footer);
  // }

  /**
   * Set background blur effect
   * @private
   */
  _setBackgroundBlur() {
    const blurFilter = new filters.BlurFilter();
    blurFilter.blur = 10;

    this.background.filters = [blurFilter];
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
