import Assets from '../core/AssetManager';
import Scene from './Scene';
import { Sprite } from 'pixi.js';
import { fit } from '../core/utils';
import ProgressBar from '../components/Loading/ProgressBar';
import Logo from '../components/Loading/Logo';
import config from '../config';

export default class Loading extends Scene {
  constructor() {
    super();

    this.config = config.scenes.Splash;
    this._init();
  }

  get finish() {
    return new Promise((res) => setTimeout(res, this.config.hideDelay));
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
      // explosion: Assets.images.explosion,
      booom: Assets.images.booom,
      booom3: Assets.images.booom3,
      // exp3: Assets.images.exp3,
      roverShadow: Assets.images['rover-shadow'],
      roverHpBarbg: Assets.images['rover-health-bar'],
      roverHpBarFill: Assets.images['hp-bar'],
      rocket: Assets.images.rocket,
      shieldActive: Assets.images['shield-active'],
      shieldInactive: Assets.images['shield-inactive'],
    };
    const sounds = {
      // shieldActivate: Assets.sounds.shieldActivate,
    };

    return super.preload({ images, sounds });
  }

  onResize(width, height) {
    fit(this, { width, height });

    // fit(this._progressBar, { width, height });
  }

  onLoadProgress() {
    this._progressBar.fillProgressBar();
  }

  _init() {
    this._createProgressBar();
    this._createLogo();
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
    this._logo = logo;
    this.addChild(this._logo);
  }
}
