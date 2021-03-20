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
    this._activeShieldTop = null;

    /**
     *@type {PIXI.Sprite}
     * @public
     */
    this._activeShieldBottom = null;

    /**
     *@type {PIXI.Graphics}
     * @public
     */
    this._bottomHitArea = null;

    /**
     *@type {PIXI.Graphics}
     * @public
     */
    this._topHitArea = null;

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
    this._activeShieldBottom = bottom;

    const top = new Part('shieldActive', -0.8, -18, -120, 0.84, 0.84, 0);

    this._activeShieldTop = top;
    this.addChild(this._activeShieldTop, this._activeShieldBottom);
  }

  /**
   * @private
   */
  _createBottomActiveShieldHitArea() {
    const hitArea = new HitArea(-105, 120, 210, 50, 90);

    this._bottomHitArea = hitArea;
    this.addChild(this._bottomHitArea);
  }

  /**
   * @private
   */
  _createTopActiveShieldHitArea() {
    const hitArea = new HitArea(-120, -170, 210, 60);

    this._topHitArea = hitArea;
    this.addChild(this._topHitArea);
  }

  /**
   * Get active shield hit area
   * @returns {PIXI.Graphics}
   */
  getActiveShieldHitArea() {
    if (this._activeShieldBottom.alpha === 1) {
      return this._bottomHitArea;
    }

    return this._topHitArea;
  }

  /**
   * @public
   */
  activateBottom() {
    this._activateShield(this._activeShieldBottom, this._activeShieldTop);
  }

  /**
   * @public
   */
  activateTop() {
    this._activateShield(this._activeShieldTop, this._activeShieldBottom);
  }

  /**
   * Active shield parts
   * @private
   */
  _activateShield(shieldPart, shieldPart2) {
    if (shieldPart.alpha === 1) return;
    shieldPart.alpha = 1;
    shieldPart2.alpha = 0;
    Assets.sounds.shieldActivate.play();
  }

  /**
   * Swap active shield parts
   * @public
   */
  swap() {
    if (this._activeShieldBottom.alpha === 1) {
      this.activateTop();
    } else {
      this.activateBottom();
    }
  }
}
