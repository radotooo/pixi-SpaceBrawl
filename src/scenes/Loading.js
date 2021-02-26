import Assets from '../core/AssetManager';
import Scene from './Scene';
import ProgressBar from '../components/Loading/Progressbar';
import Logo from '../components/Loading/Logo';
import config from '../config';

export default class Loading extends Scene {
  constructor() {
    super();

    this.config = config.scenes.Splash;
  }

  get finish() {
    return new Promise((res) => setTimeout(res, this.config.hideDelay));
  }

  preload() {
    const images = {
      ooo: Assets.images.ooo,
    };
    const sounds = {};

    return super.preload({ images, sounds });
  }

  onResize(width, height) {}

  onLoadProgress(val) {
    this._init();
    this._progressBar.fillProgressBar();
  }

  /**
   * @private
   */
  _init() {
    const progressBar = new ProgressBar();
    progressBar.y = 15;
    progressBar.x = 10;
    this._progressBar = progressBar;
    this.addChild(this._progressBar);

    const logo = new Logo();
    logo.x = this.width / 2 - 300;
    logo.y = this.height / 2 - 180;
    logo.scale.set(1.1);
    this._logo = logo;
    this.addChild(this._logo);
  }
}
