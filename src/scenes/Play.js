import Scene from './Scene';
import { checkCollision, delay, random } from '../core/utils';
import { Sprite, Texture, Ticker } from 'pixi.js';
import Planet from '../components/Play/Planet';
import Rover from '../components/Play/Rover';
import Rocket from '../components/Play/Rocket';
import HealthBar from '../components/Play/HealthBar';
import gsap, { MotionPathPlugin } from 'gsap/all';
import config from '../config';
import { GlowFilter } from '@pixi/filter-glow';
gsap.registerPlugin(MotionPathPlugin);

const EVENTS = {
  GAME_OVER: 'game_over',
};

export default class Play extends Scene {
  constructor() {
    super();
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
  }

  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._createPlayers();
    this._addPlayerToPlanet(this._player, this._planet1, -65, -400);
    this._addPlayerToPlanet(this._bot, this._planet2, 40, 280, 180);
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
    this._bot = bot;
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
    this._ticker.start();
  }

  /**
   * @private
   */
  async _setBotTurn() {
    this._isPlayerTurn = false;
    this._player.vehicle.filters = [];
    this._bot.vehicle.filters = [
      new GlowFilter({
        outerStrength: 3,
        distance: 1,
      }),
    ];

    await delay(3000);
    this._bot.rocket.fire();
    this._ticker.start();
    if (Math.floor(random(0.3, 2))) this._bot.shield.swap();
  }

  /**
   * @private
   */
  _setPlayerTurn() {
    this._isPlayerTurn = true;
    this._bot.vehicle.filters = [];
    this._player.vehicle.filters = [
      new GlowFilter({
        outerStrength: 3,
        distance: 1,
      }),
    ];
  }

  /**
   * @private
   */
  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.code === this._config.controls.moveShieldUp) {
        this._player.shield.activateTop();
        this._bot.shield.activateTop();
      }

      if (event.code === this._config.controls.shoot) {
        if (this._isPlayerTurn && !this._gameover) {
          this._player.rocket.fire();
          this._ticker.start();
        }
      }
      if (event.code === this._config.controls.moveShieldDown) {
        this._player.shield.activateBottom();
        this._bot.shield.activateBottom();
      }
    });

    this._player.healthBar.once(HealthBar.events.NO_HEALTH, async () => {
      this._gameover = true;
      await this._player.explode();
      await delay(1600);
      this.emit(Play.events.GAME_OVER, { winner: '1' });
    });

    this._bot.healthBar.once(HealthBar.events.NO_HEALTH, async () => {
      this._gameover = true;
      await this._bot.explode();
      await delay(1600);
      this.emit(Play.events.GAME_OVER, { winner: '2' });
    });

    this._player.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._setBotTurn();
      }
    });

    this._bot.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._setPlayerTurn();
      }
    });
  }

  /**
   * @private
   */
  _detectInteraction(player, enemy) {
    const rocket = player.rocket.getBounds();
    const enemeyRover = enemy.vehicle.getBounds();
    const enemyShield = enemy.shield.getActiveShieldHitArea();

    if (checkCollision(rocket, enemeyRover, 1.2, 1)) {
      this._rocketIsBouncedBack = false;
      this._ticker.stop();
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
        this._detectInteraction(this._bot, this._bot);
      } else {
        this._detectInteraction(this._bot, this._player);
      }
    } else if (this._isPlayerTurn === true) {
      if (this._rocketIsBouncedBack) {
        this._detectInteraction(this._player, this._player);
      } else {
        this._detectInteraction(this._player, this._bot);
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
