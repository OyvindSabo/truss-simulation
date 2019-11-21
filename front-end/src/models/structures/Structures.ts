import Structure from '../structure/Structure';
import { UPDATE_STRUCTURES } from '../../customEvents';

class Structures {
  _structures: Structure[];
  _changeListeners: (() => void)[];
  constructor() {
    // TODO: It should be possible to initialize Structures with an array of structure props
    this._structures = [];
    this._changeListeners = [];
  }
  add = (structure: Structure) => {
    this._structures.push(structure);
    structure.addChangeListener(this._callChangeListeners);
    this._callChangeListeners();

    window.dispatchEvent(UPDATE_STRUCTURES);
  };
  getById(id: string) {
    return this._structures.find(structure => structure.id === id);
  }
  get() {
    return this._structures;
  }
  removeById(id: string) {
    this._structures = this._structures.filter(
      structure => structure.id !== id
    );
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
  set(structures: Structure[]) {
    this._structures = structures;
    this._callChangeListeners();
    this._structures.forEach(structure => {
      structure.addChangeListener(this._callChangeListeners);
    });
    window.dispatchEvent(UPDATE_STRUCTURES);
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
    return this._structures.map(structure => structure.objectify());
  }
}

export default Structures;
