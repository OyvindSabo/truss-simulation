import Structure from '../structure/Structure';
import { UPDATE_STRUCTURES } from '../../customEvents';

class Structures {
  _structures: Structure[];
  constructor() {
    this._structures = [];
  }
  add(structure: Structure) {
    this._structures.push(structure);
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
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
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
  set(structures: Structure[]) {
    this._structures = structures;
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
}

export default Structures;
