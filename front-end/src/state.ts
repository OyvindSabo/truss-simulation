import {
  UPDATE_SELECTED_STRUCTURE_ID,
  UPDATE_SELECTED_EXPERIMENT_ID,
  UPDATE_SELECTED_MONITOR_ID,
  UPDATE_STRUCTURE_EDITOR_CONTEXT,
} from './customEvents';
import Structures from './models/structures/Structures';
import {
  loadStructures,
  loadExperiments,
  saveStructures,
  saveExperiments,
} from './services/services';
import Experiments from './models/experiments/Experiments';
import Monitors from './models/monitors/Monitors';
import {
  StructureEditorContext,
  ExperimentEditorContext,
  StructureEditorContextEnum,
  ExperimentEditorContextEnum,
} from './types';

export class State {
  structures: Structures;
  experiments: Experiments;
  monitors: Monitors;
  _state: {
    selectedStructureId: string | null;
    selectedExperimentId: string | null;
    selectedMonitoringId: string | null;

    structureEditorContext: StructureEditorContext;
    experimentEditorContext: ExperimentEditorContext;
  };
  constructor() {
    this.structures = new Structures();
    this.experiments = new Experiments();
    this.monitors = new Monitors();
    this._state = {
      selectedStructureId: null,
      selectedExperimentId: null,
      selectedMonitoringId: null,

      structureEditorContext: {
        context: StructureEditorContextEnum.StructureOverview,
        selectedElementId: null,
      },
      experimentEditorContext: {
        context: ExperimentEditorContextEnum.ExperimentOverview,
        selectedElementId: null,
      },
    };
  }
  load() {
    this.structures.set(loadStructures());
    this.structures.addChangeListener(this.saveStructures);

    // Experiments refer to structures, so we have to supply them
    this.experiments.set(loadExperiments(this.structures));
    this.experiments.addChangeListener(this.saveExperiments);

    // TODO: this.monitors.set(loadMonitors());
    // TODO: this.monitors.addChangeListener(this.saveMonitors);
  }

  // This will be passed as a callback so it has to be an arrow function
  saveStructures = () => {
    saveStructures(this.structures);
  };

  // This will be passed as a callback so it has to be an arrow function
  saveExperiments = () => {
    console.log('saveExperiments');
    saveExperiments(this.experiments);
  };

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
    if (
      structureEditorContext.context === StructureEditorContextEnum.EditNode ||
      structureEditorContext.context === StructureEditorContextEnum.EditStrut
    ) {
      this._state.structureEditorContext = {
        context: structureEditorContext.context,
        selectedElementId: structureEditorContext.selectedElementId,
      };
    } else {
      this._state.structureEditorContext = {
        context: structureEditorContext.context,
        selectedElementId: null,
      };
    }
    window.dispatchEvent(UPDATE_STRUCTURE_EDITOR_CONTEXT);
  }

  getExperimentEditorContext() {
    return this._state.experimentEditorContext;
  }
  setExperimentEditorContext(experimentEditorContext: ExperimentEditorContext) {
    this._state.experimentEditorContext = experimentEditorContext;
  }
}

export const state = new State();
