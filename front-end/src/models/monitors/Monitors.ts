import Monitor from '../monitor/Monitor';
import { UPDATE_MONITORS } from '../../customEvents';

class Monitors {
  _monitors: Monitor[];
  constructor() {
    this._monitors = [];
  }
  add(monitor: Monitor) {
    this._monitors.push(monitor);
    window.dispatchEvent(UPDATE_MONITORS);
  }
  getById(id: string) {
    return this._monitors.find(monitor => monitor.id === id);
  }
  get() {
    return this._monitors;
  }
  removeById(id: string) {
    this._monitors = this._monitors.filter(structure => structure.id !== id);
    window.dispatchEvent(UPDATE_MONITORS);
  }
  set(monitors: Monitor[]) {
    this._monitors = monitors;
    window.dispatchEvent(UPDATE_MONITORS);
  }
}

export default Monitors;
