import Scene from './Scene';
import { checkCollision, delay, random } from '../core/utils';
import { Sprite, Texture, Ticker, Point } from 'pixi.js';
import Planet from '../components/Play/Planet';
import Rover from '../components/Play/Rover';
import Rocket from '../components/Play/Rocket';
import HealthBar from '../components/Play/HealthBar';
import gsap, { MotionPathPlugin } from 'gsap/all';
import config from '../config';
import Assets from '../core/AssetManager';
import { ShockwaveFilter } from '@pixi/filter-shockwave';

gsap.registerPlugin(MotionPathPlugin);

const EVENTS = {
  GAME_OVER: 'game_over',
};

export default class Play extends Scene {
  constructor() {
    super();
    /**
     * @type {String}
     * @private
     */
    this._name = 'play';
    /**
     * @type {Object}
     * @private
     */
    this._config = config.scenes.Play;

    /**
     * @type {Boolean}
     * @private
     */
    this._gameover = false;

    /**
     * @type {Boolean}
     * @private
     */
    this._rocketIsBouncedBack = false;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._player = null;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._enemy = null;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._planet1 = null;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._planet2 = null;

    /**
     * @type {PIXI.Ticker}
     * @private
     */
    this._ticker = null;
  }

  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._createPlayers();
    this._addPlayerToPlanet(this._player, this._planet1, -65, -400);
    this._addPlayerToPlanet(this._enemy, this._planet2, 40, 280, 180);
    this._addEventListeners();
    this._createTicker();
    this._setBotTurn();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * @private
   */
  _createBackground() {
    const background = new Sprite.from('playBg');
    background.anchor.set(0.5);
    this.addChild(background);
  }

  /**
   * @private
   */
  _createPlanets() {
    const planet1 = new Planet(Texture.from('planet1'), 512, 471);
    const planet2 = new Planet(Texture.from('planet2'), -730, -440);
    const planet3 = new Planet(Texture.from('planet3'), -880, 415);
    const planet4 = new Planet(Texture.from('planet4'), 945, -625);
    this._planet1 = planet1;
    this._planet2 = planet2;
    this.addChild(planet1, planet2, planet3, planet4);
  }

  /**
   * @private
   */
  _createPlayers() {
    const player = new Rover(this._config.rover);
    this._player = player;

    const bot = new Rover(this._config.rover);
    this._enemy = bot;
  }

  /**
   * @private
   */
  _addPlayerToPlanet(player, planet, x, y, angle = 0) {
    player.x = x;
    player.y = y;
    player.angle = angle;
    planet.addChild(player);
  }

  /**
   * @private
   */
  _createTicker() {
    this._ticker = new Ticker();
    this._ticker.add(() => this._update());
  }

  /**
   * @private
   */
  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.code === this._config.controls.moveShieldUp) {
        this._player.shield.activateTop();
      }

      if (event.code === this._config.controls.shoot) {
        if (this._isPlayerTurn && !this._gameover) {
          this._player.rocket.fire();
          if (Math.floor(random(0.5, 2))) this._enemy.shield.swap();
          this._ticker.start();
        }
      }

      if (event.code === this._config.controls.moveShieldDown) {
        this._player.shield.activateBottom();
      }
    });

    this._player.healthBar.once(HealthBar.events.NO_HEALTH, async () => {
      this._endGame(this._player, '1');
    });

    this._enemy.healthBar.once(HealthBar.events.NO_HEALTH, async () => {
      this._endGame(this._enemy, '2');
    });

    this._player.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._player.toggleVehicleGlowFilter();
        this._setBotTurn();
      }
    });

    this._enemy.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._enemy.toggleVehicleGlowFilter();
        this._setPlayerTurn();
      }
    });
  }

  /**
   * @private
   */
  async _setBotTurn() {
    this._isPlayerTurn = false;
    this._enemy.toggleVehicleGlowFilter();
    await delay(3000);
    this._enemy.rocket.fire();
    this._ticker.start();
    if (Math.floor(random(0.5, 2))) this._enemy.shield.swap();
  }

  /**
   * @private
   */
  _setPlayerTurn() {
    this._isPlayerTurn = true;
    this._player.toggleVehicleGlowFilter();
  }

  /**
   * @private
   */
  async _endGame(rover, winner) {
    this._gameover = true;

    await rover.explode();
    this.removeChild(rover);
    await delay(1600);
    this.emit(Play.events.GAME_OVER, { winner });
  }

  /**
   * @private
   */
  _detectInteraction(player, enemy) {
    const rocket = player.rocket.getBounds();
    const enemeyRover = enemy.vehicle.getBounds();
    const enemyShield = enemy.shield.getActiveShieldHitArea();

    if (checkCollision(rocket, enemeyRover, 1.2)) {
      this._rocketIsBouncedBack = false;
      this._ticker.stop();
      Assets.sounds.rocketExplosion2.play();
      enemy.healthBar.reduceHealth();
      player.rocket.resetRocket();
    }

    if (checkCollision(rocket, enemyShield.getBounds())) {
      if (this._rocketIsBouncedBack) {
        this._ticker.stop();
        this._rocketIsBouncedBack = false;
        player.rocket.resetRocket();
      } else {
        this._rocketIsBouncedBack = true;
        player.rocket.reverse();
      }
    }
  }

  /**
   * @private
   */
  _update() {
    if (this._isPlayerTurn === false) {
      if (this._rocketIsBouncedBack) {
        this._detectInteraction(this._enemy, this._enemy);
      } else {
        this._detectInteraction(this._enemy, this._player);
      }
    } else if (this._isPlayerTurn === true) {
      if (this._rocketIsBouncedBack) {
        this._detectInteraction(this._player, this._player);
      } else {
        this._detectInteraction(this._player, this._enemy);
      }
    }
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
    // this.width = width;
    // this.height = height;
  }
}
