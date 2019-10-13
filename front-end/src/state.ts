import {
  UPDATE_SELECTED_STRUCTURE_ID,
  UPDATE_EXPERIMENTS,
  UPDATE_SELECTED_EXPERIMENT_ID,
  UPDATE_MONITORINGS,
  UPDATE_SELECTED_MONITORING_ID,
} from './customEvents';
import Structures from './models/structures/Structures';
import { loadStructures } from './services/services';

export class State {
  structures: Structures;
  _state: {
    selectedStructureId: string | null;
    experiments: any[]; // TODO
    selectedExperimentId: string | null;
    monitorings: any[]; // TODO
    selectedMonitoringId: string | null;
  };
  constructor() {
    this.structures = new Structures();
    this._state = {
      selectedStructureId: null,

      experiments: [],
      selectedExperimentId: null,

      monitorings: [],
      selectedMonitoringId: null,
    };
  }
  load() {
    this.structures.set(loadStructures());
  }

  getSelectedStructureId() {
    return this._state.selectedStructureId;
  }
  setSelectedStructureId(selectedStructureId: string | null) {
    this._state.selectedStructureId = selectedStructureId;
    window.dispatchEvent(UPDATE_SELECTED_STRUCTURE_ID);
  }

  getExperiments() {
    return this._state.experiments;
  }
  setExperiments(experiments: any[]) {
    this._state.experiments = experiments;
    window.dispatchEvent(UPDATE_EXPERIMENTS);
  }

  getSelectedExperimentId() {
    return this._state.selectedExperimentId;
  }
  setSelectedExperimentId(selectedExperimentId: string | null) {
    this._state.selectedExperimentId = selectedExperimentId;
    window.dispatchEvent(UPDATE_SELECTED_EXPERIMENT_ID);
  }

  getMonitorings() {
    return this._state.monitorings;
  }
  setMonitorings(monitorings: any[]) {
    this._state.monitorings = monitorings;
    window.dispatchEvent(UPDATE_MONITORINGS);
  }

  getSelectedMonitoringId() {
    return this._state.selectedStructureId;
  }
  setSelectedMonitoringId(selectedMonitoringId: string | null) {
    this._state.selectedMonitoringId = selectedMonitoringId;
    window.dispatchEvent(UPDATE_SELECTED_MONITORING_ID);
  }
}

export const state = new State();
