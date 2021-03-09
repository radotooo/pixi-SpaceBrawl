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
  { width, height },
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
  return Math.random() * (max - min) + min;
}

export function checkCollision(el1, el2, el2Width = 1, el2Height = 1) {
  return (
    el1.x + el1.width / 1.5 > el2.x &&
    el1.x < el2.x + el2.width / el2Width &&
    el1.y + el1.height / 1.5 > el2.y &&
    el1.y < el2.y + el2.height / el2Height
  );
}

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
