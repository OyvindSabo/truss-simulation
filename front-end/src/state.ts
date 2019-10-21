import {
  UPDATE_SELECTED_STRUCTURE_ID,
  UPDATE_SELECTED_EXPERIMENT_ID,
  UPDATE_SELECTED_MONITOR_ID,
  UPDATE_STRUCTURE_EDITOR_CONTEXT,
} from './customEvents';
import Structures from './models/structures/Structures';
import { loadStructures, loadExperiments } from './services/services';
import Experiments from './models/experiments/Experiments';
import Monitors from './models/monitors/Monitors';
import { StructureEditorContext } from './types';

export class State {
  structures: Structures;
  experiments: Experiments;
  monitors: Monitors;
  _state: {
    selectedStructureId: string | null;
    selectedExperimentId: string | null;
    selectedMonitoringId: string | null;

    structureEditorContext: StructureEditorContext;
  };
  constructor() {
    this.structures = new Structures();
    this.experiments = new Experiments();
    this.monitors = new Monitors();
    this._state = {
      selectedStructureId: null,
      selectedExperimentId: null,
      selectedMonitoringId: null,

      structureEditorContext: StructureEditorContext.CreateNode,
    };
  }
  load() {
    this.structures.set(loadStructures());
    this.experiments.set(loadExperiments());
    // TODO: this.experiments.set(loadExperiments());
    // TODO: this.monitors.set(loadMonitors());
  }

  getSelectedStructureId() {
    return this._state.selectedStructureId;
  }
  setSelectedStructureId(selectedStructureId: string | null) {
    this._state.selectedStructureId = selectedStructureId;
    window.dispatchEvent(UPDATE_SELECTED_STRUCTURE_ID);
  }

  getSelectedExperimentId() {
    return this._state.selectedExperimentId;
  }
  setSelectedExperimentId(selectedExperimentId: string | null) {
    this._state.selectedExperimentId = selectedExperimentId;
    window.dispatchEvent(UPDATE_SELECTED_EXPERIMENT_ID);
  }

  getSelectedMonitorId() {
    return this._state.selectedStructureId;
  }
  setSelectedMonitorId(selectedMonitoringId: string | null) {
    this._state.selectedMonitoringId = selectedMonitoringId;
    window.dispatchEvent(UPDATE_SELECTED_MONITOR_ID);
  }

  getStructureEditorContext() {
    return this._state.structureEditorContext;
  }
  setStructureEditorContext(structureEditorContext: StructureEditorContext) {
    this._state.structureEditorContext = structureEditorContext;
    window.dispatchEvent(UPDATE_STRUCTURE_EDITOR_CONTEXT);
  }
}

export const state = new State();
