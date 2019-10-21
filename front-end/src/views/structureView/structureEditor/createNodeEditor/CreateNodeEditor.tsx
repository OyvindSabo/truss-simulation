import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import { validateCoordinates } from './utils';
import Node from '../../../../models/node/Node';

interface CreateNodeEditorProps {
  structure: Structure;
}
const CreateNodeEditor = ({ structure }: CreateNodeEditorProps) => {
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');
  const [z, setZ] = useState<string>('');
  const disabled = !validateCoordinates(x, y, z);
  const onClick = disabled
    ? undefined
    : () => {
        structure.nodes.add(
          new Node({ x: Number(x), y: Number(y), z: Number(z) })
        );
        setX('');
        setY('');
        setZ('');
      };
  return (
    <div>
      <table>
        <tr>
          <td>X-coordinate</td>
          <td>Y-coordinate</td>
          <td>Z-coordinate</td>
        </tr>
        <tr>
          <td>
            <Input
              value={x}
              onChange={({ target }) => setX(target.value)}
            ></Input>
          </td>
          <td>
            <Input
              value={y}
              onChange={({ target }) => setY(target.value)}
            ></Input>
          </td>
          <td>
            <Input
              value={z}
              onChange={({ target }) => setZ(target.value)}
            ></Input>
          </td>
        </tr>
      </table>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={onClick}
      >
        CREATE NODE
      </Button>
    </div>
  );
};

export default CreateNodeEditor;
