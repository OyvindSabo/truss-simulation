import { UPDATE_NODES } from '../../customEvents';
import Strut, { StrutProps } from '../strut/Strut';

class Struts {
  _struts: Strut[];
  _changeListeners: (() => void)[];
  constructor(struts: StrutProps[] = []) {
    this._struts = struts.map(strut => new Strut(strut)) || [];
    this._changeListeners = [];
  }
  add(strut: Strut) {
    this._struts.push(strut);

    this._callChangeListeners();
  }
  getById(id: string) {
    return this._struts.find(strut => strut.id === id);
  }
  get() {
    return this._struts;
  }
  removeById(id: string) {
    this._struts = this._struts.filter(strut => strut.id !== id);
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_NODES);
  }
  set(struts: Strut[]) {
    this._struts = struts;
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_NODES);
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
    return this._struts.map(strut => strut.objectify());
  }
}

export default Struts;
