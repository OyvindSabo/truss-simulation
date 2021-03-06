import React, { useState } from 'react';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { ExperimentEditorContextEnum } from '../../../../types';
import Experiment from '../../../../models/experiment/Experiment';

interface CreateNodeEditorProps {
  experiment: Experiment;
  setContext: (experimentEditorContext: ExperimentEditorContextEnum) => void;
}
const EditExperimentEditor = ({
  experiment,
  setContext,
}: CreateNodeEditorProps) => {
  const [name, setName] = useState<string>(experiment.name.get());
  const [description, setDescription] = useState<string>(
    experiment.description.get()
  );

  const onClick = () => {
    experiment.name.set(name);
    experiment.description.set(description);
    setContext(ExperimentEditorContextEnum.ExperimentOverview);
  };
  return (
    <div>
      <Margin>
        EXPERIMENT NAME
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></Input>
      </Margin>
      <Margin>
        EXPERIMENT DESCRIPTION
        <Input
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></Input>
      </Margin>
      <Margin>
        <Button
          style={{ width: '100%' }}
          buttonType={ButtonType.Primary}
          onClick={onClick}
        >
          SAVE
        </Button>
      </Margin>
    </div>
  );
};

export default EditExperimentEditor;
