import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { state } from '../../state';
import RightPane from '../../components/rightPane/RightPane';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import TopBar from '../../components/topBar/TopBar';
import Switch from '../../components/switch/Switch';
import { SwitchContainer } from './atoms';
import StructureEditor from './structureEditor/StructureEditor';
import Structure from '../../models/structure/Structure';

const options = {
  first: { label: 'Edit', value: true },
  second: { label: 'Preview', value: false },
};

class StructureView extends Component<
  RouteComponentProps<{ structureId: string }>,
  { selectedStructureName: string; rightPaneIsOpen: boolean; editMode: boolean }
> {
  selectedStructure: Structure | undefined;
  constructor(props: RouteComponentProps<{ structureId: string }>) {
    super(props);
    const selectedStructureId = this.props.match.params.structureId;
    state.setSelectedStructureId(selectedStructureId);
    this.selectedStructure = state.structures.getById(selectedStructureId);
    this.state = {
      selectedStructureName: this.selectedStructure
        ? this.selectedStructure.name.get()
        : '',
      rightPaneIsOpen: true,
      editMode: true,
    };
  }

  componentDidMount() {
    this.selectedStructure &&
      this.selectedStructure.name.addChangeListener(() => {
        this.setState({
          selectedStructureName: this.selectedStructure
            ? this.selectedStructure.name.get()
            : '',
        });
      });
  }

  render = () => {
    const firstOptionSelected = this.state.editMode;
    return this.selectedStructure ? (
      <>
        <TopBar title={this.state.selectedStructureName} />
        <SwitchContainer>
          <Switch
            options={options}
            firstOptionSelected={firstOptionSelected}
            onClick={(editMode: boolean) => this.setState({ editMode })}
          />
        </SwitchContainer>
        <SpaceFrameVisualization
          structure={this.selectedStructure}
          editMode={this.state.editMode}
          baseUnit={10}
        />
        <RightPane
          isOpen={this.state.rightPaneIsOpen}
          onOpenClose={() =>
            this.setState({ rightPaneIsOpen: !this.state.rightPaneIsOpen })
          }
        >
          <StructureEditor structure={this.selectedStructure} />
        </RightPane>
      </>
    ) : (
      <ErrorScreen>THIS STRUCTURE DOES NOT EXIST</ErrorScreen>
    );
  };
}

export default withRouter(StructureView);
