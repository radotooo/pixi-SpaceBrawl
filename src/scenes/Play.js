import Scene from './Scene';
import { checkCollision } from '../core/utils';
import { Texture, Ticker } from 'pixi.js';
import Planet from '../components/Play/Planet';
import Rover from '../components/Play/Rover';
import gsap, { MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(MotionPathPlugin);

export default class Play extends Scene {
  async onCreated() {
    this._createPlanets();
    this._createPlayers();
    this._playerPlanet.addChild(this._player);
    this._botPlanet.addChild(this._bot);
    this._addEventListeners();
    this._createTicker();
    this.rocketIsBouncedBack = false;
    this._ticker.start();
    this.setBotTurn();
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  _createTicker() {
    this._ticker = new Ticker();
    this._ticker.add(() => this._update());
  }

  _detectInteraction(player, rover) {
    const rocket = player.rocket.getBounds();
    const enemeyRover = rover.vehicle.getBounds();
    const enemyShield = rover.shield.getActiveShield();

    if (checkCollision(rocket, enemeyRover, 1.5, 1.5)) {
      this._ticker.stop();
      rover.healthBar.reduceHealth();
      player.rocket.resetRocket();
    }

    enemyShield.forEach((element) => {
      if (checkCollision(rocket, element.getBounds())) {
        if (this.rocketIsBouncedBack) {
          this._ticker.stop();
          player.rocket.resetRocket();
        } else {
          this.rocketIsBouncedBack = true;
          player.rocket.reverse();
        }
      }
    });
  }

  _update() {
    if (this._isPlayerTurn === false) {
      if (this.rocketIsBouncedBack) {
        this._detectInteraction(this._bot, this._bot);
      } else {
        this._detectInteraction(this._bot, this._player);
      }
    } else if (this._isPlayerTurn === true) {
      if (this.rocketIsBouncedBack) {
        this._detectInteraction(this._player, this._player);
      } else {
        this._detectInteraction(this._player, this._bot);
      }
    }
  }

  _createPlayers() {
    const player = new Rover();
    player.position.x = -65;
    player.position.y = -400;
    this._player = player;
    // this._isPlayerTurn = false;

    const bot = new Rover();
    bot.position.x = 42;
    bot.position.y = 280;
    bot.angle = 180;
    this._bot = bot;
    // this._botTurn = true;
  }

  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this._player.shield.activateTop();
        this._bot.shield.activateTop();
      }

      if (event.key === ' ') {
        if (this._isPlayerTurn) {
          this._player.rocket.fire();
          this._ticker.start();
        }
      }
      if (event.key === 'ArrowDown') {
        this._player.shield.activateBottom();
        this._bot.shield.activateBottom();
      }
    });
    document.addEventListener('click', () =>
      this._player.healthBar.reduceHealth()
    );

    this._player.rocket.on('reverse', () => {
      this.rocketIsBouncedBack = true;
    });

    this._player.rocket.on('reset', () => {
      this.rocketIsBouncedBack = false;
      this.setBotTurn();
    });

    this._bot.rocket.on('reset', () => {
      this.rocketIsBouncedBack = false;
      this.setPlayerTurn();
    });

    this._bot.rocket.on('reverse', () => {
      this.rocketIsBouncedBack = true;
    });
  }

  setPlayerTurn() {
    this._isPlayerTurn = true;
  }

  async setBotTurn() {
    this._isPlayerTurn = false;
    await this.delay(3000);
    this._bot.rocket.fire();
    this._ticker.start();
  }
  _createPlanets() {
    const planet1 = new Planet(Texture.from('planet1'), 512, 471);
    const planet2 = new Planet(Texture.from('planet2'), -730, -440);
    const planet3 = new Planet(Texture.from('planet3'), -880, 415);
    const planet4 = new Planet(Texture.from('planet4'), 945, -625);
    this._playerPlanet = planet1;
    this._botPlanet = planet2;
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
