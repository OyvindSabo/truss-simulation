import Experiment from '../experiment/Experiment';
import { UPDATE_EXPERIMENTS } from '../../customEvents';

class Experiments {
  _experiments: Experiment[];
  _changeListeners: (() => void)[];
  constructor() {
    this._experiments = [];
    this._changeListeners = [];
  }
  add(experiment: Experiment) {
    this._experiments.push(experiment);
    this._callChangeListeners();
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
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }
  set(experiments: Experiment[]) {
    this._experiments = experiments;
    this._experiments.forEach(experiment => {
      experiment.addChangeListener(this._callChangeListeners);
    });
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
  // This will be passed as a callback so it has to be an arrow function
  _callChangeListeners = () => {
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  };
  objectify() {
    return this._experiments.map(experiment => experiment.objectify());
  }
}

export default Experiments;
