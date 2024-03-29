import Assets from '../core/AssetManager';
import Scene from './Scene';
import { Sprite } from 'pixi.js';
import { resizeScene } from '../core/utils';
import ProgressBar from '../components/Loading/ProgressBar';
import config from '../config';

export default class Loading extends Scene {
  constructor() {
    super();
    /**
     * @type {Object}
     * @private
     */
    this._config = config.scenes.Loading;

    /**
     * @type {PIXI.Container}
     * @private
     */
    this._progressBar = null;

    this._init();
  }

  get finish() {
    return new Promise((res) => setTimeout(res, this._config.hideDelay));
  }

  preload() {
    const images = {
      keyDefault: Assets.images['key-default'],
      keyLong: Assets.images['key-long'],
      arrow: Assets.images.arrow,
      circle: Assets.images.circle,
      planet1: Assets.images['planet-1'],
      planet2: Assets.images['planet-2'],
      planet3: Assets.images['planet-3'],
      planet4: Assets.images['planet-4'],
      rover: Assets.images.rover,
      star: Assets.images.star,
      fire: Assets.images.fire,
      1: Assets.images['1'],
      2: Assets.images['2'],
      wins: Assets.images.wins,
      fireworks: Assets.images.firework,
      playBg: Assets.images.playBg,
      countdownBg: Assets.images.countdownBg,
      booom: Assets.images.booom,
      roverShadow: Assets.images['rover-shadow'],
      roverHpBarbg: Assets.images['rover-health-bar'],
      roverHpBarFill: Assets.images['hp-bar'],
      rocket: Assets.images.rocket,
      shieldActive: Assets.images['shield-active'],
      shieldInactive: Assets.images['shield-inactive'],
    };

    const sounds = {
      shieldActivate: Assets.sounds.shieldActivate,
      beep: Assets.sounds.beep,
      roverExplosion: Assets.sounds.roverExplosion,
      bounce: Assets.sounds.bounce,
      rocketLaunch: Assets.sounds.rocketLaunch,
      rocketExplosion: Assets.sounds.rocketExplosion,
      victory: Assets.sounds.victory,
      mando: Assets.sounds.mando,
      tutorial: Assets.sounds.tutorial,
      countdownEnd: Assets.sounds.countdownEnd,
      winFirework: Assets.sounds.winFirework,
      rocketReverseHit: Assets.sounds.rocketReverseShieldHit,
    };

    return super.preload({ images, sounds });
  }

  // eslint-disable-next-line no-unused-vars
  onResize(width, height) {
    resizeScene(this);
  }

  onLoadProgress(val) {
    this._progressBar.fillProgressBar(val);
  }

  /**
   * @private
   */
  _init() {
    this._createProgressBar();
    this._createLogo();
    resizeScene(this);
  }

  /**
   * @private
   */
  _createProgressBar() {
    const progressBar = new ProgressBar();

    progressBar.y = 15;
    progressBar.x = this.width / 2 - progressBar.width / 2;

    this._progressBar = progressBar;
    this.addChild(this._progressBar);
  }

  /**
   * @private
   */
  _createLogo() {
    const logo = new Sprite.from(Assets.images.ooo);

    logo.y = -70;
    logo.anchor.set(0.5);

    this.addChild(logo);
  }
}
