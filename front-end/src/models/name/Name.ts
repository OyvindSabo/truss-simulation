import { UPDATE_NAME } from '../../customEvents';

class Name {
  _name: string;
  _changeListeners: (() => void)[];
  constructor(name?: string) {
    this._name = name || '';
    this._changeListeners = [];
  }
  set(name: string) {
    this._name = name;
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
    window.dispatchEvent(UPDATE_NAME);
  }
  get() {
    return this._name;
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
}

export default Name;
