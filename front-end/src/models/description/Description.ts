import { UPDATE_DESCRIPTION } from '../../customEvents';

class Description {
  _description: string;
  constructor(description?: string) {
    this._description = description || '';
  }
  set(description: string) {
    this._description = description;
    window.dispatchEvent(UPDATE_DESCRIPTION);
  }
  get() {
    return this._description;
  }
}

export default Description;
