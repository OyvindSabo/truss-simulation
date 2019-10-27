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
    this._changeListeners.forEach(changeListener => {
      console.log('changeListener: ', changeListener);
      changeListener();
    });
  }
  getById(id: string) {
    return this._struts.find(strut => strut.id === id);
  }
  get() {
    return this._struts;
  }
  removeById(id: string) {
    this._struts = this._struts.filter(strut => strut.id !== id);
    window.dispatchEvent(UPDATE_NODES);
  }
  set(struts: Strut[]) {
    this._struts = struts;
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
    window.dispatchEvent(UPDATE_NODES);
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
}

export default Struts;
