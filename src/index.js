import Application from './core/Application';
import * as PIXI from 'pixi.js';

window.PIXI = PIXI;

if (process.env.NODE_ENV === 'development') {
  // required for pixi dev tools to work
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();

  // Used for automated testing only
  if (process.env.NODE_ENV === 'development') {
    window.__PIXI_APP = app;
  }
});
