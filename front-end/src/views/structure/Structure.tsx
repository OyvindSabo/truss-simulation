import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { SpaceFrameData } from '../../types';
import { EMPTY_SPACE_FRAME } from '../../constants/fallbacks';
import { state } from '../../state';
import { UPDATE_STRUCTURES } from '../../customEvents';
import RightPane from '../../components/rightPane/RightPane';

interface StructureProps extends RouteComponentProps<{ structureId: string }> {
  structure: SpaceFrameData;
}
const Structure: React.FC<StructureProps> = ({ structure, match }) => {
  const selectedStructureId = match.params.structureId;
  state.setSelectedStructureId(selectedStructureId);

  const [structures, setStructures] = useState<SpaceFrameData[]>(
    state.structures.get()
  );
  const [rightPaneIsOpen, setRightPaneIsOpen] = useState<boolean>(true);
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
  const selectedStructure =
    structures.find(structure => structure.id === selectedStructureId) ||
    EMPTY_SPACE_FRAME;

  return (
    <>
      <SpaceFrameVisualization spaceFrameData={selectedStructure} />
      <RightPane
        isOpen={rightPaneIsOpen}
        onOpenClose={() => setRightPaneIsOpen(!rightPaneIsOpen)}
      ></RightPane>
    </>
  );
};

export default withRouter(Structure);
