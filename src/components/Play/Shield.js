import { Container, Graphics, Sprite } from 'pixi.js';
import HitArea from './HitArea';

export default class Shield extends Container {
  constructor() {
    super();
    /**
     *@type {PIXI.Sprite}
     * @public
     */
    this.activeShieldTop = null;
    /**
     *@type {PIXI.Sprite}
     * @public
     */
    this.activeShieldBottom = null;
    /**
     *@type {Array}
     * @public
     */
    this.bottomHitArea = null;
    /**
     *@type {Array}
     * @public
     */
    this.topHitArea = null;
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createInactiveShield();
    this._createActiveShield();
    this._createBottomActiveShieldHitArea();
    this._createTopActiveShieldHitArea();
  }
  getActiveShield() {
    if (this.activeShieldBottom.alpha === 1) {
      return this.bottomHitArea;
    }

    // console.log('vlizame');
    return this.topHitArea;
  }

  /**
   * @private
   */
  _createBottomActiveShieldHitArea() {
    const hitArea = new HitArea(-105, 120, 210, 50, 90);

    this.bottomHitArea = hitArea;
    this.addChild(hitArea);
  }

  /**
   * @private
   */
  _createTopActiveShieldHitArea() {
    const hitArea = new HitArea(-120, -170, 210, 60);

    this.topHitArea = hitArea;
    this.addChild(hitArea);
  }
  /**
   * @public
   */
  activateBottom() {
    this.activeShieldBottom.alpha = 1;
    this.activeShieldTop.alpha = 0;
    // Assets.sounds.shieldActivate.play();
  }
  /**
   * @public
   */
  activateTop() {
    this.activeShieldBottom.alpha = 0;
    this.activeShieldTop.alpha = 1;
    // Assets.sounds.shieldActivate.play();
  }
  /**
   * Swap active shield parts
   * @public
   */
  swap() {
    if (this.activeShieldBottom.alpha === 1) {
      this.activateTop();
    } else {
      this.activateBottom();
    }
  }
  /**
   * @private
   */
  _createInactiveShield() {
    const bottom = this._createShield(
      'shieldInactive',
      -0.8,
      -120,
      -20,
      0.84,
      0.82
    );

    const top = this._createShield(
      'shieldInactive',
      0.8,
      -18,
      -120,
      0.84,
      0.84
    );
    this.addChild(bottom, top);
  }
  /**
   * @private
   */
  _createActiveShield() {
    const bottom = this._createShield(
      'shieldActive',
      -2.35,
      -117,
      -20,
      0.84,
      0.82
    );
    this.activeShieldBottom = bottom;

    const top = this._createShield(
      'shieldActive',
      -0.8,
      -18,
      -120,
      0.84,
      0.84,
      0
    );

    this.activeShieldTop = top;
    this.addChild(this.activeShieldTop, this.activeShieldBottom);
  }
  /**
   * Create Sprite object
   * @param {Object} texture The Sprite texture
   * @param {Number} rotation The rotation value
   * @param {Number} x The x coordinate value
   * @param {Number} y The y coordinate value
   * @param {Number} scaleX The x scale value
   * @param {Number} scaleY The y scale value
   * @param {Number} alpha The alpha value
   */
  _createShield(texture, rotation, x, y, scaleX, scaleY, alpha = 1) {
    const shield = new Sprite.from(texture);

    shield.anchor.set(0.5);
    shield.rotation = rotation;
    shield.position.x = x;
    shield.position.y = y;
    shield.scale.x = scaleX;
    shield.scale.y = scaleY;
    shield.alpha = alpha;

    return shield;
  }
}
