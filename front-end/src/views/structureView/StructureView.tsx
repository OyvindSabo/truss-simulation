import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { state } from '../../state';
import { UPDATE_STRUCTURES } from '../../customEvents';
import RightPane from '../../components/rightPane/RightPane';
import Structure from '../../models/structure/Structure';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

const StructureView: React.FC<RouteComponentProps<{ structureId: string }>> = ({
  match,
}) => {
  const selectedStructureId = match.params.structureId;
  state.setSelectedStructureId(selectedStructureId);

  const [structures, setStructures] = useState<Structure[]>(
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

  const selectedStructure = structures.find(
    structure => structure.id === selectedStructureId
  );

  return selectedStructure ? (
    <>
      <SpaceFrameVisualization spaceFrameData={selectedStructure} />
      <RightPane
        isOpen={rightPaneIsOpen}
        onOpenClose={() => setRightPaneIsOpen(!rightPaneIsOpen)}
      ></RightPane>
    </>
  ) : (
    <ErrorScreen>THIS STRUCTURE DOES NOT EXIST</ErrorScreen>
  );
};

export default withRouter(StructureView);
