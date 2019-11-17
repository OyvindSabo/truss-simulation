import React, { useState, useEffect } from 'react';
import { state } from '../../state';
import { UPDATE_STRUCTURES } from '../../customEvents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PreviewBox from '../../components/previewBox/PreviewBox';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import plusIcon from '../../assets/icons/plus-icon-white.png';
import Structure from '../../models/structure/Structure';
import { HINT_OF_PENSIVE } from '../../constants/theme/colors';
import { IMAGE_SPACING } from '../../constants/config/sizes';

const ExperimentsView: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [structures, setStructures] = useState<Structure[]>(
    state.structures.get()
  );
  useEffect(() => {
    window.addEventListener(UPDATE_STRUCTURES.type, () => {
      setStructures(state.structures.get());
    });
    return () => {
      window.removeEventListener(UPDATE_STRUCTURES.type, () => {
        setStructures(state.structures.get());
      });
    };
  }, []);
  return (
    <>
      <PreviewBox
        label="CREATE NEW STRUCTURE"
        onClick={() => {
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
      {structures.map((structure, key) => (
        <PreviewBox
          key={key}
          label={structure.name.get()}
          onClick={() => {
            state.setSelectedStructureId(structure.id);
            history.push(`/structures/${structure.id}`);
          }}
        >
          <SpaceFrameVisualization structure={structures[key]} />
        </PreviewBox>
      ))}
    </>
  );
};

export default withRouter(ExperimentsView);
