import Scene from './Scene';
import Counter from '../components/Countdown/Counter';

export default class Countdown extends Scene {
  async onCreated() {
    const counter = new Counter(3);
    this.addChild(counter);
    await counter.start();
    this.emitEv();
  }

  emitEv() {
    this.emit('radoto');
  }
  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    // eslint-disable-line no-unused-vars
  }
}
