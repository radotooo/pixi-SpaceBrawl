/* eslint-disable operator-linebreak */
/**
 * @desc fits display object, by altering its scale, into passed width and height
 * @param {PIXI.DisplayObject} element
 * @param {Object} size
 * @param {Number} size.width
 * @param {Number} size.height
 * @param {Boolean} [ignoreRatio = true]
 * @param {Boolean} [overscale = false] - if true the scaled elememnt may have scale bigger then 1
 */
export function fit(
  element,
  width,
  height,
  ignoreRatio = false,
  overscale = false
) {
  const wScale = width / element.width;
  const hScale = height / element.height;
  const max = overscale ? Infinity : 1;
  const scale = Math.min(wScale, hScale, max);

  /* eslint-disable no-param-reassign */
  element.scale.x *= ignoreRatio ? wScale : scale;
  element.scale.y *= ignoreRatio ? hScale : scale;
  /* eslint-enable no-param-reassign */
}

/**
 * @desc centers a display /vertically, horizontally or both/ object into its parent
 * @param {PIXI.DisplayObject} element
 * @param {Number} width
 * @param {Number} height
 * @param {Boolean} vertically
 * @param {Boolean} horizontally
 */
export function center(
  element,
  { width, height },
  { vertically = true, horizontally = true } = {}
) {
  /* eslint-disable no-param-reassign */
  element.x = horizontally ? width / 2 - element.width / 2 : element.x;
  element.y = vertically ? height / 2 - element.height / 2 : element.y;
  /* eslint-enable no-param-reassign */
}

/**
 * @param {Number} min
 * @param {Number} max
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @param {Object} el1 PIXI element bounds
 * @param {Object} el2 PIXI element bounds
 * @param {Number} el2Width Reduce element2 width
 * @param {Number} el2Height Reduce element2 height
 * @param {Number} el1Width Reduce element1 width
 * @param {Number} el1Height Reduce element1 height
 * @returns {Boolean}
 */
export function checkCollision(
  el1,
  el2,
  el2Width = 1,
  el2Height = 1,
  el1Width = 1.5,
  el1Height = 1.5
) {
  return (
    // eslint-disable-next-line operator-linebreak
    el1.x + el1.width / el1Width > el2.x &&
    el1.x < el2.x + el2.width / el2Width &&
    el1.y + el1.height / el1Height > el2.y &&
    el1.y < el2.y + el2.height / el2Height
  );
}

/**
 * @param {Number} ms Milliseconds
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Change stage scale based on window width
 * @param {PIXI.Container} scene
 * @param {Number} width Window width
 */
export function resizeScene(scene) {
  const ratio = window.innerWidth / 1920;

  if (ratio < 0.1) return;
  scene.scale.set(ratio);
}

/**
 * Set howler stereo property based on element bounds
 * @private
 */
export function setSpatial(audio, element) {
  const shielBounds = element.getBounds();

  if (shielBounds.x > window.innerWidth / 2) {
    audio.stereo(0.9);
  } else {
    audio.stereo(-0.9);
  }
}
