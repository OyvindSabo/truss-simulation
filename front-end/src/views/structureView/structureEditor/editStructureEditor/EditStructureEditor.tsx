import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { StructureEditorContextEnum } from '../../../../types';
import { state } from '../../../../state';

interface CreateNodeEditorProps {
  structure: Structure;
}
const EditStructureEditor = ({ structure }: CreateNodeEditorProps) => {
  const [name, setName] = useState<string>(structure.name.get());
  const [description, setDescription] = useState<string>(
    structure.description.get()
  );

  const onClick = () => {
    structure.name.set(name);
    structure.description.set(description);
    state.setStructureEditorContext({
      context: StructureEditorContextEnum.StructureOverview,
      selectedElementId: null,
    });
  };
  return (
    <div>
      <Margin>
        STRUCTURE NAME
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></Input>
      </Margin>
      <Margin>
        STRUCTURE DESCRIPTION
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

export default EditStructureEditor;
