import { Container, Sprite, Text } from 'pixi.js';
import Assets from '../../core/AssetManager';
import PixiPlugin from 'gsap/PixiPlugin';
import gsap from 'gsap/all';

/**
 * Initializes a new instance of Counter
 * @class
 * @extends {PIXI.Container}
 */
export default class Counter extends Container {
  /**
   * @param {Number} count Тhe number from which we will count
   */
  constructor(count) {
    super();
    this._count = count;
    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._createCircle();
    this._createText();
  }

  /**
   * Add counter Numbers
   * @private
   */
  _createText() {
    const text = new Text('', {
      fontFamily: 'Ubuntu Mono',
      fontSize: 420,
      fontWeight: 900,
      fill: '0xffffff',
    });
    this._text = text;
    text.anchor.set(0.5);
    this._circle.addChild(this._text);
  }

  /**
   * Start counter animation
   * @public
   */
  async start() {
    gsap.registerPlugin(PixiPlugin);
    for (let i = this._count; i > 0; i--) {
      this._text.text = i;
      Assets.sounds.beep.play();
      Assets.sounds.beep.volume(0.5);
      await gsap.to(this._text, {
        pixi: {
          scaleY: 1.5,
          scaleX: 1.5,
        },
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      });
    }
    Assets.sounds.countdownEnd.play();
    Assets.sounds.countdownEnd.volume(0.3);
  }

  /**
   * @private
   */
  _createCircle() {
    const circle = new Sprite.from(Assets.images.circle);

    circle.anchor.set(0.5);
    circle.scale.set(0.65);
    this._circle = circle;
    this.addChild(circle);
  }
}
