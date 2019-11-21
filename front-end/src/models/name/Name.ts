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
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_NAME);
  }
  get() {
    return this._name;
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
    return this._name;
  }
}

export default Name;
