import { SpaceFrameData } from './types';
import { SET_SELECTED_STRUCTURE_ID, SET_STRUCTURES } from './customEvents';

export class State {
  _state: {
    structures: SpaceFrameData[];
    selectedStructureId: string | null;
  };
  constructor() {
    this._state = {
      structures: [],
      selectedStructureId: null,
    };
  }
  getState() {
    return this._state;
  }

  getStructures() {
    return this._state.structures;
  }
  setStructures(structures: SpaceFrameData[]) {
    this._state.structures = structures;
    window.dispatchEvent(SET_STRUCTURES);
  }

  getSelectedStructureId() {
    return this._state.selectedStructureId;
  }
  setSelectedStructureId(selectedStructureId: string | null) {
    this._state.selectedStructureId = selectedStructureId;
    window.dispatchEvent(SET_SELECTED_STRUCTURE_ID);
  }
}

export const state = new State();
