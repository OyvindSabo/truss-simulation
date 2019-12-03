import React from 'react';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { ExperimentEditorContextEnum } from '../../../../types';
import Experiment from '../../../../models/experiment/Experiment';

interface ExperimentOverviewEditorProps {
  experiment: Experiment;
  setContext: (experimentEditorContext: ExperimentEditorContextEnum) => void;
}
const ExperimentOverviewEditor = ({
  experiment,
  setContext,
}: ExperimentOverviewEditorProps) => (
  <div>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() =>
          setContext(ExperimentEditorContextEnum.EditExperimentInfo)
        }
      >
        EDIT EXPERIMENT INFO
      </Button>
    </Margin>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() => setContext(ExperimentEditorContextEnum.CreateLoad)}
      >
        CREATE LOAD
      </Button>
    </Margin>
  </div>
);

export default ExperimentOverviewEditor;
