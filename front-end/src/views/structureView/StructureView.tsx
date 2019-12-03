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
import Icon from '../../components/icon/Icon';
import downloadIcon from '../../assets/icons/download-icon.png';
import { ICON_COLOR, STRUCTURE_COLOR } from '../../constants/config/colors';
import Node from '../../models/node/Node';
import Strut from '../../models/strut/Strut';

const options = {
  first: { label: 'Edit', value: true },
  second: { label: 'Preview', value: false },
};

interface OnClick {
  clickedNode?: Node;
  clickedStrut?: Strut;
  selectedNodes: Node[];
  selectedStruts: Strut[];
  selectedNodeObjects: THREE.Mesh[];
  selectedStrutObjects: THREE.Mesh[];
}

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

  downloadFile = () => {
    if (this.selectedStructure) {
      const element = document.createElement('a');
      const fileContent = this.selectedStructure.getCfemExport();
      const file = new Blob([fileContent], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `${this.state.selectedStructureName}.usf`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  onClick = ({
    clickedNode,
    clickedStrut,
    selectedNodes,
    selectedStruts,
    selectedNodeObjects,
    selectedStrutObjects,
  }: OnClick) => {
    if (!this.selectedStructure) return;
    if (selectedNodes.length === 2) {
      const [source, target] = selectedNodes;
      this.selectedStructure.struts.add(new Strut({ source, target }));
      selectedNodeObjects.forEach(selectedObject => {
        (selectedObject.material as any).color.set(STRUCTURE_COLOR);
      });
      selectedStrutObjects.forEach(selectedObject => {
        (selectedObject.material as any).color.set(STRUCTURE_COLOR);
      });
    }
  };

  render = () => {
    const firstOptionSelected = this.state.editMode;
    return this.selectedStructure ? (
      <>
        <TopBar title={this.state.selectedStructureName}>
          {' '}
          <Icon
            icon={downloadIcon}
            color={ICON_COLOR}
            onClick={() => this.downloadFile()}
          />
        </TopBar>
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
          onClick={this.onClick}
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
