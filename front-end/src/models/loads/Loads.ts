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
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  }
  set(loads: Load[]) {
    this._loads = loads;
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
}

export default Loads;
