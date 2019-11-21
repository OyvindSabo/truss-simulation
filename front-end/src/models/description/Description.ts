import { UPDATE_DESCRIPTION } from '../../customEvents';

class Description {
  _description: string;
  _changeListeners: (() => void)[];
  constructor(description?: string) {
    this._description = description || '';
    this._changeListeners = [];
  }
  set(description: string) {
    this._description = description;
    window.dispatchEvent(UPDATE_DESCRIPTION);
    this._callChangeListeners();
  }
  get() {
    return this._description;
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
    return this._description;
  }
}

export default Description;
