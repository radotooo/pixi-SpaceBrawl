import { Sprite } from 'pixi.js';
import Scene from './Scene';
import Play from './Play';
import Game from '../Game';
import gsap from 'gsap';
import Footer from '../components/Footer';

export default class Loading extends Scene {
  constructor() {
    super();
  }
  async onCreated() {
    const footer = new Footer();
    this.game = Game;
    // this.parent.switchScene(Play, { scene: 'play' });
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);
    console.log();
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
  onLoadProgress(val) {
    console.log(val);
    // console.log(this.background);
  }
}
