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
    this._ticker.start();
    // await this.delay(3000);
    // this._bot.fireRocket();
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

  _checkShield(rocket, shieldHitPoints, player) {
    shieldHitPoints.forEach((element) => {
      if (checkCollision(rocket, element.getBounds())) {
        if (this.reverse) {
          player.resetRocket();
        } else {
          this.reverse = true;
          player.reverseRocket();
        }
      }
    });
  }

  _detectInteraction(player, rover) {
    const rocket = player._rocket.getBounds();
    const enemeyRover = rover.vehicle.getBounds();
    const playerRover = player.vehicle.getBounds();
    const enemyShield = rover.shield.getActiveShield();

    if (checkCollision(rocket, enemeyRover, 1.5, 1.5)) {
      this._ticker.stop();
      rover.healthBar.reduceHealth();
      player.resetRocket();
      // this._ticker.start();
    }

    enemyShield.forEach((element) => {
      if (checkCollision(rocket, element.getBounds())) {
        if (this.reverse) {
          player.resetRocket();
        } else {
          this.reverse = true;
          player.reverseRocket();
        }
      }
    });
  }

  _detectInteractionWithShield(player, shield) {}

  _update() {
    if (this._botTurn) {
      const botRocket = this._bot._rocket.getBounds();
      this._checkShield(
        botRocket,
        this._player.shield.getActiveShield(),
        this._bot
      );
    }

    if (this._playerTurn) {
      const playerRocket = this._player._rocket.getBounds();
      const botRover = this._bot.vehicle.getBounds();
      const playerRover = this._player.vehicle.getBounds();

      if (this.reverse) {
        if (checkCollision(playerRocket, playerRover, 1.5)) {
          this._ticker.stop();
          this._player.healthBar.reduceHealth();
          this._player.resetRocket();
        }

        this._checkShield(
          playerRocket,
          this._player.shield.getActiveShield(),
          this._player
        );
      } else {
        this._detectInteraction(this._player, this._bot);
        // if (checkCollision(playerRocket, botRover, 1.5)) {
        //   this._ticker.stop();
        //   this._bot.healthBar.reduceHealth();
        //   this._player.resetRocket();
        // }

        // this._checkShield(
        //   playerRocket,
        //   this._bot.shield.getActiveShield(),
        //   this._player
        // );
      }
    }
  }

  _createPlayers() {
    const player = new Rover();
    player.position.x = -65;
    player.position.y = -400;
    this._player = player;
    this._playerTurn = true;

    const bot = new Rover();
    bot.position.x = 42;
    bot.position.y = 280;
    bot.angle = 180;
    this._bot = bot;
    this._botTurn = true;
  }

  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this._player.shield.activateTop();
        this._bot.shield.activateTop();
      }
      if (event.key === ' ' && this._playerTurn) {
        this._ticker.start();
        this.reverse = false;
        // this.fireRocket();
        this._player.fireRocket();
        // this._bot.fireRocket();
      }
      if (event.key === 'ArrowDown') {
        this._player.shield.activateBottom();
        this._bot.shield.activateBottom();
      }
    });
    document.addEventListener('click', () =>
      this._player.healthBar.reduceHealth()
    );
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
