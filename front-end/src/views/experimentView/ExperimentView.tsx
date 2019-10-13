import React, { useState, useEffect } from 'react';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { state } from '../../state';
import Experiment from '../../models/experiment/Experiment';
import { UPDATE_EXPERIMENTS } from '../../customEvents';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

interface ExperimentProps
  extends RouteComponentProps<{ experimentId: string }> {
  //structure: SpaceFrameData;
}
const ExperimentView: React.FC<ExperimentProps> = ({
  /*structure,*/ match,
}) => {
  const selectedExperimentId = match.params.experimentId;
  state.setSelectedStructureId(selectedExperimentId);

  const [experiments, setExperiments] = useState<Experiment[]>(
    state.experiments.get()
  );

  useEffect(() => {
    window.addEventListener(UPDATE_EXPERIMENTS.type, () => {
      setExperiments(state.experiments.get());
    });
    return () => {
      window.removeEventListener(UPDATE_EXPERIMENTS.type, () => {
        setExperiments(state.experiments.get());
      });
    };
  }, []);

  const selectedExperiment = experiments.find(
    experiment => experiment.id === selectedExperimentId
  );

  console.log('selectedExperimentId: ', selectedExperimentId);
  console.log('experiments: ', experiments);
  console.log('selectedExperiment: ', selectedExperiment);
  return selectedExperiment &&
    selectedExperiment.structure &&
    selectedExperiment.deformedStructure ? (
    <SpaceFrameVisualization
      spaceFrameData={selectedExperiment.structure}
      deformedSpaceFrameData={selectedExperiment.deformedStructure}
    />
  ) : (
    <ErrorScreen>THIS EXPERIMENT DOES NOT EXIST</ErrorScreen>
  );
};

export default withRouter(ExperimentView);
