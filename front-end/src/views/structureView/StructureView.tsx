import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { state } from '../../state';
import RightPane from '../../components/rightPane/RightPane';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import TopBar from '../../components/topBar/TopBar';
import Switch from '../../components/switch/Switch';
import { SwitchContainer } from './atoms';
import StructureEditor from './structureEditor/StructureEditor';

const StructureView: React.FC<RouteComponentProps<{ structureId: string }>> = ({
  match,
}) => {
  const selectedStructureId = match.params.structureId;
  state.setSelectedStructureId(selectedStructureId);

  const selectedStructure = state.structures.getById(selectedStructureId);
  const [rightPaneIsOpen, setRightPaneIsOpen] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(true);

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
        structure={selectedStructure}
        editMode={editMode}
        baseUnit={10}
      />
      <RightPane
        isOpen={rightPaneIsOpen}
        onOpenClose={() => setRightPaneIsOpen(!rightPaneIsOpen)}
      >
        <StructureEditor structure={selectedStructure} />
      </RightPane>
    </>
  ) : (
    <ErrorScreen>THIS STRUCTURE DOES NOT EXIST</ErrorScreen>
  );
};

export default withRouter(StructureView);
