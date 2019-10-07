import React, { useState, useEffect } from 'react';
import { SpaceFrameData } from '../../types';
import { state } from '../../state';
import { SET_STRUCTURES } from '../../customEvents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PreviewBox from '../../components/previewBox/PreviewBox';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';

const Structures: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
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
