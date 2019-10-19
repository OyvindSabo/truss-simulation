import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { state } from '../../state';
import { UPDATE_STRUCTURES } from '../../customEvents';
import RightPane from '../../components/rightPane/RightPane';
import Structure from '../../models/structure/Structure';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import TopBar from '../../components/topBar/TopBar';
import Switch from '../../components/switch/Switch';
import { SwitchContainer } from './atoms';

const StructureView: React.FC<RouteComponentProps<{ structureId: string }>> = ({
  match,
}) => {
  const selectedStructureId = match.params.structureId;
  state.setSelectedStructureId(selectedStructureId);

  const [structures, setStructures] = useState<Structure[]>(
    state.structures.get()
  );
  const [rightPaneIsOpen, setRightPaneIsOpen] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(true);
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

  const options = {
    first: { label: 'Edit', value: true },
    second: { label: 'Preview', value: false },
  };
  const firstOptionSelected = editMode;

  return selectedStructure ? (
    <>
      <TopBar title={selectedStructure.name.get()} />
      <SwitchContainer>
        <Switch
          options={options}
          firstOptionSelected={firstOptionSelected}
          onClick={setEditMode}
        />
      </SwitchContainer>
      <SpaceFrameVisualization
        spaceFrameData={selectedStructure}
        editMode={editMode}
        baseUnit={10}
      />
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
