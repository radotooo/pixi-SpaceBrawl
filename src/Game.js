import Loading from './scenes/Loading';
import Countdown from './scenes/Countdown';
import Play from './scenes/Play';
import Win from './scenes/Win';
import gsap from 'gsap/all';
import { Container } from 'pixi.js';
import Tutorial from './scenes/Tutorial';
import fire from './static/fire.json';
import fireworks from './static/fireworks.json';
import booom from './static/booom.json';
import Assets from './core/AssetManager';
import { PixiPlugin } from 'gsap/PixiPlugin';

// register the plugin
gsap.registerPlugin(PixiPlugin);

/**
 * Main game stage, manages scenes/levels.
 *
 * @extends {PIXI.Container}
 */
export default class Game extends Container {
  static get events() {
    return {
      SWITCH_SCENE: 'switch_scene',
    };
  }

  /**
   * @param {PIXI.Sprite} background
   */
  constructor({ background } = {}) {
    super();

    this._background = background;
    this.currentScene = null;
  }

  async start() {
    this._addEventListeners();

    await this.switchScene(Loading, { scene: 'loading' });
    await this.currentScene.finish;
    await this.switchScene(Tutorial, { scene: 'tutorial' });

    await Assets.prepareSpritesheets([{ texture: 'booom', data: booom }]);
    await Assets.prepareSpritesheets([
      { texture: 'fireworks', data: fireworks },
    ]);
    await Assets.prepareSpritesheets([{ texture: 'fire', data: fire }]);
  }

  /**
   * @param {Function} constructor
   * @param {String} scene
   * @param {Obejct} data
   */
  async switchScene(constructor, scene, data = {}) {
    await this._fadeOut();
    this.removeChild(this.currentScene);

    this.currentScene = new constructor(data);
    this.currentScene.alpha = 0;
    this.currentScene.background = this._background;

    this.addChild(this.currentScene);

    this.emit(Game.events.SWITCH_SCENE, { scene });

    this.currentScene.onCreated();
    await this._fadeIn();
  }

  /**
   * Add fade out on scene leave
   * @private
   */
  async _fadeOut() {
    await gsap.to(this.currentScene, {
      alpha: 0,
      duration: 0.2,
    });
  }

  /**
   * Add fade in on scene enter
   * @private
   */
  async _fadeIn() {
    await gsap.to(this.currentScene, {
      alpha: 1,
      duration: 0.2,
    });
  }

  /**
   * @private
   */
  _addEventListeners() {
    this.on(Game.events.SWITCH_SCENE, () => {
      this.currentScene.once(Tutorial.events.TUTORIAL_DONE, async () => {
        await this.switchScene(Countdown, { scene: 'countdown' });
      });

      this.currentScene.once(Countdown.events.START_GAME, async () => {
        await this.switchScene(Play, { scene: 'play' });
      });
      this.currentScene.on(Play.events.GAME_OVER, async (data) => {
        await this.switchScene(Win, { scene: 'win' }, data);
      });
      this.currentScene.once(
        Win.events.RESTART_GAME,
        async () => await this.switchScene(Countdown, { scene: 'countdown' })
      );
    });
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    if (this.currentScene === null) return;

    this.currentScene.onResize(width, height);
  }
}
