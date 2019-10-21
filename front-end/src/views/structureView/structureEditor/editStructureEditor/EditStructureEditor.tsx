import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Node from '../../../../models/node/Node';

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
  };
  return (
    <div>
      <Input
        value={name}
        onChange={({ target }) => setName(target.value)}
      ></Input>
      <Input
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      ></Input>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={onClick}
      >
        SAVE
      </Button>
    </div>
  );
};

export default EditStructureEditor;
