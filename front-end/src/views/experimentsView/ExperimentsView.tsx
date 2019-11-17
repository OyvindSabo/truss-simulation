import React, { useState, useEffect } from 'react';
import { state } from '../../state';
import { UPDATE_EXPERIMENTS } from '../../customEvents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PreviewBox from '../../components/previewBox/PreviewBox';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import plusIcon from '../../assets/icons/plus-icon-white.png';
import Structure from '../../models/structure/Structure';
import { HINT_OF_PENSIVE } from '../../constants/theme/colors';
import { IMAGE_SPACING } from '../../constants/config/sizes';
import Experiment from '../../models/experiment/Experiment';

const ExperimentsView: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [experiments, setExperiments] = useState<Experiment[]>(
    state.experiments.get()
  );
  useEffect(() => {
    // For consistency, rewrite Experiments accept change listeners
    window.addEventListener(UPDATE_EXPERIMENTS.type, () => {
      setExperiments(state.experiments.get());
    });
    return () => {
      window.removeEventListener(UPDATE_EXPERIMENTS.type, () => {
        setExperiments(state.experiments.get());
      });
    };
  }, []);
  return (
    <>
      <PreviewBox
        // This currently creates a new structure, not an experiment
        label="CREATE NEW EXPERIMENT"
        onClick={() => {
          // This one will have to be rewritten so that there is an extra step
          // where the user can select a structure to base the experiment on
          const newStructure = new Structure({});
          state.structures.add(newStructure);
          history.push(`/structures/${newStructure.id}`);
        }}
      >
        <div style={{ background: HINT_OF_PENSIVE, height: '100%' }}>
          <img
            src={plusIcon}
            style={{
              height: '100%',
              display: 'block',
              margin: 'auto',
              padding: `${IMAGE_SPACING}px`,
              boxSizing: 'border-box',
            }}
            alt="fireSpot"
          />
        </div>
      </PreviewBox>
      {experiments.map((experiment, key) => (
        <PreviewBox
          key={key}
          label={experiment.name.get()}
          onClick={() => {
            state.setSelectedStructureId(experiment.id);
            history.push(`/experiments/${experiment.id}`);
          }}
        >
          <SpaceFrameVisualization
            structure={experiment.structure}
            loads={experiment.loads}
          />
        </PreviewBox>
      ))}
    </>
  );
};

export default withRouter(ExperimentsView);
