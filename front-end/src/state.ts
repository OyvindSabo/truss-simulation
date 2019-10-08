import { SpaceFrameData } from './types';
import {
  SET_STRUCTURES,
  SET_SELECTED_STRUCTURE_ID,
  SET_EXPERIMENTS,
  SET_SELECTED_EXPERIMENT_ID,
  SET_MONITORINGS,
  SET_SELECTED_MONITORING_ID,
} from './customEvents';

export class State {
  _state: {
    structures: SpaceFrameData[];
    selectedStructureId: string | null;
    experiments: any[]; // TODO
    selectedExperimentId: string | null;
    monitorings: any[]; // TODO
    selectedMonitoringId: string | null;
  };
  constructor() {
    this._state = {
      structures: [],
      selectedStructureId: null,

      experiments: [],
      selectedExperimentId: null,

      monitorings: [],
      selectedMonitoringId: null,
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

  getExperiments() {
    return this._state.experiments;
  }
  setExperiments(experiments: any[]) {
    this._state.experiments = experiments;
    window.dispatchEvent(SET_EXPERIMENTS);
  }

  getSelectedExperimentId() {
    return this._state.selectedExperimentId;
  }
  setSelectedExperimentId(selectedExperimentId: string | null) {
    this._state.selectedExperimentId = selectedExperimentId;
    window.dispatchEvent(SET_SELECTED_EXPERIMENT_ID);
  }

  getMonitorings() {
    return this._state.monitorings;
  }
  setMonitorings(monitorings: any[]) {
    this._state.monitorings = monitorings;
    window.dispatchEvent(SET_MONITORINGS);
  }

  getSelectedMonitoringId() {
    return this._state.selectedStructureId;
  }
  setSelectedMonitoringId(selectedMonitoringId: string | null) {
    this._state.selectedMonitoringId = selectedMonitoringId;
    window.dispatchEvent(SET_SELECTED_MONITORING_ID);
  }
}

export const state = new State();
