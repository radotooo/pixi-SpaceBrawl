import Scene from './Scene';
import { Texture, Sprite } from 'pixi.js';
import Footer from '../components/Footer';
import Planet from '../components/Play/Planet';
import Rover from '../components/Play/Rover';
import Rocket from '../components/Play/Rocket';
import gsap, { MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(MotionPathPlugin);

export default class Play extends Scene {
  async onCreated() {
    const footer = new Footer();
    footer.x = -window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
    // const bg = new Sprite.from('planet1');
    // bg.width = this.width;
    // bg.height = this.height;
    // this.background = bg;
    // this.addChild(this.background);
    this._rocket = new Rocket(Texture.from('rocket'));
    this._rocket.y = 200;
    this._rocket.rotation = 2;
    this.launch();
    this.addChild(this._rocket);
    this._createPlanets();
    this._createRover();
    this._addEventListeners();
  }
  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this._rover.activateTopShield();
      }
      if (event.key === 'ArrowDown') {
        this._rover.activateBottomShield();
      }
    });
    document.addEventListener('click', () =>
      this._rover.healthBar.reduceHealth()
    );
  }

  launch() {
    gsap.set(this._rocket, {
      transformOrigin: '50% 50%',
    });

    gsap.to(this._rocket, {
      duration: 5,
      repeat: -1,
      ease: 'power3.Out',
      motionPath: {
        path:
          'M1 167C45.3333 79.3333 202 -69 474 39C814 174 609 502 413 423C300 371 326 274 413 260C491 254 847 347.667 1013 379',
        autoRotate: true,
        align: 'self',
        alignOrigin: [0.5, 0.5],
      },
    });
  }

  _createRover() {
    const rover = new Rover();
    rover.pivot.x = rover.width / 2;
    rover.pivot.y = rover.height / 2;
    this._rover = rover;
    this.addChild(rover);
  }

  _createPlanets() {
    const planet1 = new Planet(Texture.from('planet1'), 510, 465);
    const planet2 = new Planet(Texture.from('planet2'), -730, -440);
    const planet3 = new Planet(Texture.from('planet3'), -880, 415);
    const planet4 = new Planet(Texture.from('planet4'), 945, -625);
    this.addChild(planet1, planet2, planet3, planet4);
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
