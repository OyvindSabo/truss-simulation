import React, { Component } from 'react';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { state } from '../../state';
import Experiment from '../../models/experiment/Experiment';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import TopBar from '../../components/topBar/TopBar';
import Icon from '../../components/icon/Icon';
import downloadIcon from '../../assets/icons/download-icon.png';
import { ICON_COLOR } from '../../constants/config/colors';
import Switch from '../../components/switch/Switch';
import RightPane from '../../components/rightPane/RightPane';
import { SwitchContainer } from './atoms';
import ExperimentEditor from './experimentEditor/ExperimentEditor';

const options = {
  first: { label: 'Edit', value: true },
  second: { label: 'Preview', value: false },
};

class ExperimentView extends Component<
  RouteComponentProps<{ experimentId: string }>,
  {
    selectedExperimentName: string;
    rightPaneIsOpen: boolean;
    editMode: boolean;
  }
> {
  selectedExperiment: Experiment | undefined;
  constructor(props: RouteComponentProps<{ experimentId: string }>) {
    super(props);
    const selectedExperimentId = this.props.match.params.experimentId;
    state.setSelectedExperimentId(selectedExperimentId);
    this.selectedExperiment = state.experiments.getById(selectedExperimentId);
    this.state = {
      selectedExperimentName: this.selectedExperiment
        ? this.selectedExperiment.name.get()
        : '',
      rightPaneIsOpen: true,
      editMode: true,
    };
  }

  componentDidMount() {
    this.selectedExperiment &&
      this.selectedExperiment.name.addChangeListener(() => {
        this.setState({
          selectedExperimentName: this.selectedExperiment
            ? this.selectedExperiment.name.get()
            : '',
        });
      });
  }

  downloadFile = () => {
    if (this.selectedExperiment) {
      const element = document.createElement('a');
      const fileContent = this.selectedExperiment.getCfemExport();
      const file = new Blob([fileContent], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `${this.state.selectedExperimentName}.usf`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  render = () => {
    const firstOptionSelected = this.state.editMode;
    return this.selectedExperiment && this.selectedExperiment.structure ? (
      <>
        <TopBar title={this.state.selectedExperimentName}>
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
          structure={this.selectedExperiment.structure}
          editMode={this.state.editMode}
          deformedSpaceFrameData={this.selectedExperiment.deformedStructure}
          baseUnit={10}
        />
        <RightPane
          isOpen={this.state.rightPaneIsOpen}
          onOpenClose={() =>
            this.setState({ rightPaneIsOpen: !this.state.rightPaneIsOpen })
          }
        >
          <ExperimentEditor experiment={this.selectedExperiment} />
        </RightPane>
      </>
    ) : (
      <ErrorScreen>THIS EXPERIMENT DOES NOT EXIST</ErrorScreen>
    );
  };
}

export default withRouter(ExperimentView);
