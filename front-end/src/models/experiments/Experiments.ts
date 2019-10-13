import Experiment from '../experiment/Experiment';
import { UPDATE_EXPERIMENTS } from '../../customEvents';

class Experiments {
  _experiments: Experiment[];
  constructor() {
    this._experiments = [];
  }
  add(experiment: Experiment) {
    this._experiments.push(experiment);
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }
  getById(id: string) {
    return this._experiments.find(experiment => experiment.id === id);
  }
  get() {
    return this._experiments;
  }
  removeById(id: string) {
    this._experiments = this._experiments.filter(
      structure => structure.id !== id
    );
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }
  set(experiments: Experiment[]) {
    this._experiments = experiments;
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }
}

export default Experiments;
