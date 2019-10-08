import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { SpaceFrameData } from '../../types';
import { EMPTY_SPACE_FRAME } from '../../constants/fallbacks';
import { state } from '../../state';
import { SET_STRUCTURES } from '../../customEvents';

interface StructureProps extends RouteComponentProps<{ structureId: string }> {
  structure: SpaceFrameData;
}
const Structure: React.FC<StructureProps> = ({ structure, match }) => {
  const selectedStructureId = match.params.structureId;
  state.setSelectedStructureId(selectedStructureId);

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
  const selectedStructure =
    structures.find(structure => structure.id === selectedStructureId) ||
    EMPTY_SPACE_FRAME;

  return <SpaceFrameVisualization spaceFrameData={selectedStructure} />;
};

export default withRouter(Structure);
