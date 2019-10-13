import Structure from '../structure/Structure';
import { UPDATE_STRUCTURES } from '../../customEvents';

class Structures {
  structures: Structure[];
  constructor() {
    this.structures = [];
  }
  add(structure: Structure) {
    this.structures.push(structure);
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
  getById(id: string) {
    return this.structures.find(structure => structure.id === id);
  }
  get() {
    return this.structures;
  }
  removeById(id: string) {
    this.structures = this.structures.filter(structure => structure.id !== id);
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
  set(structures: Structure[]) {
    this.structures = structures;
    window.dispatchEvent(UPDATE_STRUCTURES);
  }
}

export default Structures;
