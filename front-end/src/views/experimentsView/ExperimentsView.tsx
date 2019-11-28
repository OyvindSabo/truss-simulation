import React, { useState, useEffect } from 'react';
import { state } from '../../state';
import { UPDATE_EXPERIMENTS } from '../../customEvents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PreviewBox from '../../components/previewBox/PreviewBox';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import plusIcon from '../../assets/icons/plus-icon-white.png';
import { HINT_OF_PENSIVE } from '../../constants/theme/colors';
import { IMAGE_SPACING, PREVIEW_HEIGHT } from '../../constants/config/sizes';
import Experiment from '../../models/experiment/Experiment';
import Modal from '../../components/modal/Modal';
import {
  MARGIN,
  PADDING,
  BORDER_WIDTH,
  FONT_SIZE,
} from '../../constants/theme/styles';

const ExperimentsView: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [experiments, setExperiments] = useState<Experiment[]>(
    state.experiments.get()
  );
  const [selectStructureModalIsOpen, setSelectStructureModalIsOpen] = useState<
    boolean
  >(false);
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
        label="CREATE NEW EXPERIMENT"
        onClick={() => {
          setSelectStructureModalIsOpen(true);
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
          onDelete={() => {
            state.experiments.removeById(experiment.id);
          }}
        >
          <SpaceFrameVisualization
            structure={experiment.structure}
            loads={experiment.loads}
          />
        </PreviewBox>
      ))}
      <Modal
        active={selectStructureModalIsOpen}
        onOutsideClick={() => setSelectStructureModalIsOpen(false)}
      >
        <div
          style={{
            borderBottom: `${BORDER_WIDTH}px solid ${HINT_OF_PENSIVE}`,
            padding: PADDING,
          }}
        >
          SELECT A STRUCTURE FOR YOUR EXPERIMENT
        </div>
        <div
          style={{
            height: PREVIEW_HEIGHT + FONT_SIZE + 4 * MARGIN,
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {state.structures.get().map((structure, key) => (
            <PreviewBox
              key={key}
              label={structure.name.get()}
              onClick={() => {
                const newExperiment = new Experiment({ structure });
                state.experiments.add(newExperiment);
                state.setSelectedExperimentId(newExperiment.id);
                history.push(`/experiments/${newExperiment.id}`);
              }}
            >
              <SpaceFrameVisualization structure={structure} />
            </PreviewBox>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default withRouter(ExperimentsView);
