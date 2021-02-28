import Assets from '../core/AssetManager';
import Scene from './Scene';
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
    };
    const sounds = {};

    return super.preload({ images, sounds });
  }

  onResize(width, height) {}

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
    const logo = new Logo(Assets.images.ooo);

    logo.x = this.width / 2 - 305;
    logo.y = this.height / 2 - 150;
    // logo.scale.set(1.1);
    this._logo = logo;
    this.addChild(this._logo);
  }
}
