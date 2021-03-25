import Scene from './Scene';
import { checkCollision, delay, random, resizeScene } from '../core/utils';
import { Sprite, Texture, Ticker } from 'pixi.js';
import Planet from '../components/Play/Planet';
import Rover from '../components/Play/Rover';
import Rocket from '../components/Play/Rocket';
import HealthBar from '../components/Play/HealthBar';
import gsap, { MotionPathPlugin } from 'gsap/all';
import config from '../config';

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

    /**
     * @type {Function}
     * @private
     */
    this._keyEvent = null;
  }

  async onCreated() {
    this._createBackground();
    this._createPlanets();
    this._createPlayers();
    this._addPlayerToPlanet(this._player, this._planet1, -65, -400);
    this._addPlayerToPlanet(this._enemy, this._planet2, 40, 280, 180);
    this._addEventListeners();
    resizeScene(this);
    this._createTicker();
    await delay(1000);
    this._setEnemyTurn();
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
    document.addEventListener(
      'keydown',
      (this._keyEvent = (event) => this._handleKeydown(event))
    );

    this._player.vehicle.healthBar.once(
      HealthBar.events.NO_HEALTH,
      async () => {
        await this._endScene(this._player);
        this._enemy.alpha = 0;
        this.emit(Play.events.GAME_OVER, { winner: '1' });
      }
    );

    this._enemy.vehicle.healthBar.once(HealthBar.events.NO_HEALTH, async () => {
      await this._endScene(this._enemy);
      this._player.alpha = 0;
      this.emit(Play.events.GAME_OVER, { winner: '2' });
    });

    this._player.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._setEnemyTurn();
      }
    });

    this._enemy.rocket.on(Rocket.events.RESET, () => {
      if (!this._gameover) {
        this._setPlayerTurn();
      }
    });
  }

  /**
   * @private
   */
  _handleKeydown(event) {
    if (event.code === this._config.controls.moveShieldUp) {
      this._player.shield.activateTop();
    }

    if (event.code === this._config.controls.shoot) {
      if (this._isPlayerTurn && !this._gameover) {
        this._player.rocket.fire();
        this._ticker.start();
      }
    }

    if (event.code === this._config.controls.moveShieldDown) {
      this._player.shield.activateBottom();
    }
  }

  /**
   * @private
   */
  _randomShieldActivation(rover) {
    if (Math.floor(random(0.6, 2))) rover.shield.swap();
  }

  /**
   * @private
   */
  async _setEnemyTurn() {
    this._isPlayerTurn = false;
    this._enemy.vehicle.toggleVehicleGlowFilter();
    await delay(2000);
    this._randomShieldActivation(this._enemy);
    this._enemy.rocket.fire();
    this._ticker.start();
  }

  /**
   * @private
   */
  _setPlayerTurn() {
    this._isPlayerTurn = true;
    this._player.vehicle.toggleVehicleGlowFilter();
    this._randomShieldActivation(this._enemy);
  }

  /**
   * @private
   */
  _detectInteraction(player, enemy) {
    const rocket = player.rocket.getBounds();
    const enemeyRover = enemy.vehicle.getBounds();
    const enemyShield = enemy.shield.getActiveShieldHitArea();

    if (checkCollision(rocket, enemeyRover)) {
      this._rocketIsBouncedBack = false;
      this._ticker.stop();
      player.rocket.playExplosionSound();
      enemy.vehicle.healthBar.reduceHealth();
      player.rocket.resetRocket();
    }

    if (checkCollision(rocket, enemyShield.getBounds())) {
      if (this._rocketIsBouncedBack) {
        this._ticker.stop();
        this._rocketIsBouncedBack = false;
        player.rocket.playShieldHitSound();
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
      this._interact(this._enemy, this._player);
    } else if (this._isPlayerTurn === true) {
      this._interact(this._player, this._enemy);
    }
  }

  /**
   * @private
   */
  _interact(rover, enemy) {
    if (this._rocketIsBouncedBack) {
      this._detectInteraction(rover, rover);
    } else {
      this._detectInteraction(rover, enemy);
    }
  }

  /**
   * @private
   */
  async _shakeScene() {
    await gsap.fromTo(
      this,
      {
        x: '-8',
        delay: 0.5,
      },
      {
        x: '+8',
        duration: 0.04,
        yoyo: true,
        repeat: 25,
        ease: 'Power2.easeOut',
      }
    );
  }

  /**
   * @private
   */
  async _endScene(rover) {
    this._gameover = true;
    await rover.explode();
    await this._shakeScene();
    document.removeEventListener('keydown', this._keyEvent);
    this.removeChild(rover);
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
