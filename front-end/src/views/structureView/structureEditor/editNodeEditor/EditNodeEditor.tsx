import React, { useState, useEffect } from 'react';
import Structure from '../../../../models/structure/Structure';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import { validateCoordinates } from './utils';
import { StructureEditorContextEnum } from '../../../../types';
import Switch from '../../../../components/switch/Switch';
import { SwitchContainer } from './atoms';
import { state } from '../../../../state';

interface CreateNodeEditorProps {
  structure: Structure;
  selectedElementId: string;
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

const EditNodeEditor = ({
  structure,
  selectedElementId,
}: CreateNodeEditorProps) => {
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

  useEffect(() => {
    const node = structure.nodes
      .get()
      .find(node => node.id === selectedElementId);
    if (!node) return;
    setX(`${node.coordinates.get().x}`);
    setY(`${node.coordinates.get().y}`);
    setZ(`${node.coordinates.get().z}`);
    setIX(node.translationalDegreesOfFreedom.get().ix);
    setIY(node.translationalDegreesOfFreedom.get().iy);
    setIZ(node.translationalDegreesOfFreedom.get().iz);
    setIRX(node!.rotationalDegreesOfFreedom.get().irx);
    setIRY(node!.rotationalDegreesOfFreedom.get().iry);
    setIRZ(node!.rotationalDegreesOfFreedom.get().irz);
  }, [selectedElementId, structure]);

  const onUpdateNodeClick = disabled
    ? undefined
    : () => {
        const node = structure.nodes
          .get()
          .find(node => node.id === selectedElementId);
        if (!node) return;
        node.coordinates.set({ x: Number(x), y: Number(y), z: Number(z) });
        node.translationalDegreesOfFreedom.set({ ix, iy, iz });
        node.rotationalDegreesOfFreedom.set({ irx, iry, irz });
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
        state.setStructureEditorContext({
          context: StructureEditorContextEnum.StructureOverview,
          selectedElementId: null,
        });
      };
  const onDeleteNodeClick = () => {
    // These should rather be methods on the top level context
    structure.nodes.removeById(selectedElementId);
    structure.struts.removeByNodeId(selectedElementId);
    state.setStructureEditorContext({
      context: StructureEditorContextEnum.StructureOverview,
      selectedElementId: null,
    });
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
        onClick={onUpdateNodeClick}
        disabled={disabled}
      >
        UPDATE NODE
      </Button>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Danger}
        onClick={onDeleteNodeClick}
        disabled={disabled}
      >
        DELETE NODE
      </Button>
    </div>
  );
};

export default EditNodeEditor;
