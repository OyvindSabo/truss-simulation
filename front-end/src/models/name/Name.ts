import { UPDATE_NAME } from '../../customEvents';

class Name {
  _name: string;
  constructor(name?: string) {
    this._name = name || '';
  }
  set(name: string) {
    this._name = name;
    window.dispatchEvent(UPDATE_NAME);
  }
  get() {
    return this._name;
  }
}

export default Name;
