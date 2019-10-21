import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { StructureEditorContext } from '../../../../types';

interface CreateNodeEditorProps {
  structure: Structure;
  setContext: (structureEditorContext: StructureEditorContext) => void;
}
const EditStructureEditor = ({
  structure,
  setContext,
}: CreateNodeEditorProps) => {
  const [name, setName] = useState<string>(structure.name.get());
  const [description, setDescription] = useState<string>(
    structure.description.get()
  );

  const onClick = () => {
    structure.name.set(name);
    structure.description.set(description);
    setContext(StructureEditorContext.StructureOverview);
  };
  return (
    <div>
      <Margin>
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></Input>
      </Margin>
      <Margin>
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
