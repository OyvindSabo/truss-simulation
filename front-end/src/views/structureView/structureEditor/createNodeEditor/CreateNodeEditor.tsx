import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import { validateCoordinates } from './utils';
import Node from '../../../../models/node/Node';
import { StructureEditorContext } from '../../../../types';
import Switch from '../../../../components/switch/Switch';
import { SwitchContainer } from './atoms';

interface CreateNodeEditorProps {
  structure: Structure;
  setContext: (structureEditorContext: StructureEditorContext) => void;
}

const ixOptions = {
  first: { label: 'ix: Free', value: true },
  second: { label: 'ix: Fixed', value: false },
};

const iyOptions = {
  first: { label: 'iy: Free', value: true },
  second: { label: 'yx: Fixed', value: false },
};

const izOptions = {
  first: { label: 'iz: Free', value: true },
  second: { label: 'yz: Fixed', value: false },
};

const irxOptions = {
  first: { label: 'irx: Free', value: true },
  second: { label: 'irx: Fixed', value: false },
};

const iryOptions = {
  first: { label: 'iry: Free', value: true },
  second: { label: 'yrx: Fixed', value: false },
};

const irzOptions = {
  first: { label: 'irz: Free', value: true },
  second: { label: 'yrz: Fixed', value: false },
};

const CreateNodeEditor = ({ structure, setContext }: CreateNodeEditorProps) => {
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');
  const [z, setZ] = useState<string>('');
  const [ix, setIX] = useState<boolean>(false);
  const [iy, setIY] = useState<boolean>(false);
  const [iz, setIZ] = useState<boolean>(false);
  const [irx, setIRX] = useState<boolean>(false);
  const [iry, setIRY] = useState<boolean>(false);
  const [irz, setIRZ] = useState<boolean>(false);
  const disabled = !validateCoordinates(x, y, z);
  const onCreateNodeClick = disabled
    ? undefined
    : () => {
        structure.nodes.add(
          new Node({
            x: Number(x),
            y: Number(y),
            z: Number(z),
            ix,
            iy,
            iz,
            irx,
            iry,
            irz,
          })
        );
        // The following resetting is not really necessary since we navigate
        // away after creating a node, but I'm considering to make it optional
        // to navigate away, so I'll keep them for now.
        setX('');
        setY('');
        setZ('');
        setIX(false);
        setIY(false);
        setIZ(false);
        setIRX(false);
        setIRY(false);
        setIRZ(false);
        setContext(StructureEditorContext.StructureOverview);
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
      <br />
      Translational degrees of freedom:
      <SwitchContainer>
        <Switch
          options={ixOptions}
          firstOptionSelected={!ix}
          onClick={(ix: boolean) => setIX(!ix)}
        />
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          options={iyOptions}
          firstOptionSelected={!iy}
          onClick={(iy: boolean) => setIY(!iy)}
        />
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          options={izOptions}
          firstOptionSelected={!iz}
          onClick={(iz: boolean) => setIZ(!iz)}
        />
      </SwitchContainer>
      <br />
      Rotational degrees of freedom:
      <SwitchContainer>
        <Switch
          options={irxOptions}
          firstOptionSelected={!irx}
          onClick={(irx: boolean) => setIRX(!irx)}
        />
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          options={iryOptions}
          firstOptionSelected={!iry}
          onClick={(iry: boolean) => setIRY(!iry)}
        />
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          options={irzOptions}
          firstOptionSelected={!irz}
          onClick={(irz: boolean) => setIRZ(!irz)}
        />
      </SwitchContainer>
      <br />
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={onCreateNodeClick}
        disabled={disabled}
      >
        CREATE NODE
      </Button>
    </div>
  );
};

export default CreateNodeEditor;
