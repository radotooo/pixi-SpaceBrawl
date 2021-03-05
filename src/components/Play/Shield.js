import { Container, Sprite } from 'pixi.js';
import Point from './Point';

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
    this.bottomHitPoints = [];
    /**
     *@type {Array}
     * @public
     */
    this.topHitPoints = [];
    this._init();
  }
  /**
   * @private
   */
  _init() {
    this._createInactiveShield();
    this._createActiveShield();
    this._createBottomActiveShieldHitPoints();
    this._createTopActiveShieldHitPoints();
  }

  /**
   * @private
   */
  _createBottomActiveShieldHitPoints() {
    const point = new Point(-120, -85, 20);
    const point2 = new Point(-125, -25, 30);
    const point3 = new Point(-110, 35, 30);

    this.bottomHitPoints.push(point, point2, point3);
    this.addChild(point, point2, point3);
  }

  /**
   * @private
   */
  _createTopActiveShieldHitPoints() {
    const point = new Point(-80, -125, 20);
    const point2 = new Point(-15, -130, 30);
    const point3 = new Point(45, -115, 20);

    this.topHitPoints.push(point, point2, point3);
    this.addChild(point, point2, point3);
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
      0.82,
      0
    );
    this.activeShieldBottom = bottom;

    const top = this._createShield(
      'shieldActive',
      -0.75,
      -16,
      -117,
      0.84,
      0.84
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
  _createShield(texture, rotation, x, y, scaleX, scaleY, alpha) {
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
