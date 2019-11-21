import Load, { LoadProps } from '../load/Load';

class Loads {
  _loads: Load[];
  _changeListeners: (() => void)[];
  constructor(loads: LoadProps[] = []) {
    this._loads = loads.map(load => new Load(load)) || [];
    this._changeListeners = [];
  }
  add(load: Load) {
    this._loads.push(load);
    this._callChangeListeners();
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  }
  getById(id: string) {
    return this._loads.find(load => load.id === id);
  }
  get() {
    return this._loads;
  }
  removeById(id: string) {
    this._loads = this._loads.filter(load => load.id !== id);
    this._callChangeListeners();
  }
  set(loads: Load[]) {
    this._loads = loads;
    this._callChangeListeners();
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
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
    return this._loads.map(load => load.objectify());
  }
}

export default Loads;
