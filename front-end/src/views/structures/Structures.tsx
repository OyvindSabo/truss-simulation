import React, { useState, useEffect } from 'react';
import { SpaceFrameData } from '../../types';
import { state } from '../../state';
import { SET_STRUCTURES } from '../../customEvents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PreviewBox from '../../components/previewBox/PreviewBox';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import plusIcon from '../../assets/icons/plus-icon-white.png';
import { HINT_OF_PENSIVE } from '../../constants/colors';
import { IMAGE_SPACING } from '../../constants/sizes';
import CreateNewStructureModal from '../../components/createNewStructureModal/CreateNewStructureModal';

const Structures: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [shouldDisplayModal, setShouldDisplayModal] = useState<boolean>(false);
  const [structures, setStructures] = useState<SpaceFrameData[]>(
    state.getStructures()
  );
  useEffect(() => {
    window.addEventListener(SET_STRUCTURES.type, () => {
      setStructures(state.getStructures());
    });
    return () => {
      window.removeEventListener(SET_STRUCTURES.type, () => {
        setStructures(state.getStructures());
      });
    };
  }, []);
  return (
    <>
      <CreateNewStructureModal
        active={shouldDisplayModal}
        onOutsideClick={() => setShouldDisplayModal(false)}
        onCancel={() => setShouldDisplayModal(false)}
        onSubmit={({ name, description }) => {
          console.log(
            'Create new structure with name:',
            name,
            'and description',
            description
          );
          history.push('/structures/3');
        }}
      />
      <PreviewBox
        label="CREATE NEW STRUCTURE"
        onClick={() => {
          console.log('Display modal');
          setShouldDisplayModal(true);
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
          label={structure.name}
          onClick={() => {
            state.setSelectedStructureId(structure.id);
            history.push(`/structures/${structure.id}`);
          }}
        >
          <SpaceFrameVisualization spaceFrameData={structures[key]} />
        </PreviewBox>
      ))}
    </>
  );
};

export default withRouter(Structures);
