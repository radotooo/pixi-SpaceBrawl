import { Container } from 'pixi.js';
import HitArea from './HitArea';
import Part from './Part';
import Assets from '../../core/AssetManager';

/**
 * Initializes a new instance of Shield
 * @class
 * @extends {PIXI.Containerclass}
 */
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
     *@type {PIXI.Graphics}
     * @public
     */
    this.bottomHitArea = null;

    /**
     *@type {PIXI.Graphics}
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

  /**
   * @private
   */
  _createInactiveShield() {
    const bottom = new Part('shieldInactive', -0.8, -120, -20, 0.84, 0.82);

    const top = new Part('shieldInactive', 0.8, -18, -120, 0.84, 0.84);
    this.addChild(bottom, top);
  }

  /**
   * @private
   */
  _createActiveShield() {
    const bottom = new Part('shieldActive', -2.35, -117, -20, 0.84, 0.82);
    this.activeShieldBottom = bottom;

    const top = new Part('shieldActive', -0.8, -18, -120, 0.84, 0.84, 0);

    this.activeShieldTop = top;
    this.addChild(this.activeShieldTop, this.activeShieldBottom);
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
   * Get active shield hit area
   * @returns {PIXI.Graphics}
   */
  getActiveShieldHitArea() {
    if (this.activeShieldBottom.alpha === 1) {
      return this.bottomHitArea;
    }

    return this.topHitArea;
  }

  /**
   * @public
   */
  activateBottom() {
    this.activeShieldBottom.alpha = 1;
    this.activeShieldTop.alpha = 0;
    Assets.sounds.shieldActivate.play();
  }

  /**
   * @public
   */
  activateTop() {
    this.activeShieldBottom.alpha = 0;
    this.activeShieldTop.alpha = 1;
    Assets.sounds.shieldActivate.play();
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
}
