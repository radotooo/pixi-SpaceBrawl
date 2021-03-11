import Scene from './Scene';
import { checkCollision, delay, random } from '../core/utils';
import { Sprite, Texture, Ticker } from 'pixi.js';
import Planet from '../components/Play/Planet';
import Explosion from '../components/Play/Explosion';
import Rover from '../components/Play/Rover';
import gsap, { MotionPathPlugin } from 'gsap/all';
import Rocket from '../components/Play/Rocket';

gsap.registerPlugin(MotionPathPlugin);

export default class Play extends Scene {
  async onCreated() {
    this._createPlanets();
    this._createPlayers();
    this._addPlayerToPlanet(this._player, this._planet1, -65, -400);
    this._addPlayerToPlanet(this._bot, this._planet2, 40, 280, 180);
    // const explosion = new Explosion();
    // // explosion.angle = 180;

    // this.addChild(explosion);
    this._addEventListeners();
    this._createTicker();
    this.setBotTurn();
  }

  async test() {
    this.rocket2.x = 400;
    this.rocket2.y = 45;

    this.rocket.x = -580;
    this.rocket.y = -150;

    this.rocket.pivot.x = this.rocket.width / 2;
    this.rocket.pivot.y = this.rocket.height / 2;
  }
  _addPlayerToPlanet(player, planet, x, y, angle = 0) {
    player.x = x;
    player.y = y;
    player.angle = angle;
    planet.addChild(player);
  }
  _createTicker() {
    this._ticker = new Ticker();
    this._ticker.add(() => this._update());
    this._ticker.start();
  }

  _detectInteraction(player, enemy) {
    const rocket = player.rocket.getBounds();
    const enemeyRover = enemy.vehicle.getBounds();
    const enemyShield = enemy.shield.getActiveShield();

    if (checkCollision(rocket, enemeyRover, 1.2, 1)) {
      this.rocketIsBouncedBack = false;
      this._ticker.stop();
      enemy.healthBar.reduceHealth();
      player.rocket.resetRocket();
    }

    if (checkCollision(rocket, enemyShield.getBounds())) {
      if (this.rocketIsBouncedBack) {
        this.rocketIsBouncedBack = false;
        this._ticker.stop();
        player.rocket.resetRocket();
      } else {
        this.rocketIsBouncedBack = true;
        player.rocket.reverse();
      }
    }
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
    this._player = player;

    const bot = new Rover();
    this._bot = bot;
  }

  _addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this._player.shield.activateTop();
        this._bot.shield.activateTop();
      }

      if (event.key === ' ') {
        if (this._isPlayerTurn) {
          // if (Math.floor(random(0.5, 2))) this._bot.shield.swap();
          this._player.rocket.fire();
          this._ticker.start();
        }
      }
      if (event.key === 'ArrowDown') {
        this._player.shield.activateBottom();
        this._bot.shield.activateBottom();
      }
    });

    // this._player.rocket.on('reverse', () => {
    //   this.rocketIsBouncedBack = true;
    // });

    this._player.rocket.on('reset', () => {
      this.setBotTurn();
    });

    this._bot.rocket.on('reset', () => {
      this.setPlayerTurn();
    });

    // this._bot.rocket.on('reverse', () => {
    //   this.rocketIsBouncedBack = true;
    // });
  }

  setPlayerTurn() {
    this._isPlayerTurn = true;
  }

  async setBotTurn() {
    this._isPlayerTurn = false;
    await delay(3000);
    this._bot.rocket.fire();
    this._ticker.start();
    // if (Math.floor(random(0.3, 2))) this._bot.shield.swap();
  }

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
