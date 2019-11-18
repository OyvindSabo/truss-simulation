import React, { useState } from 'react';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Node from '../../../../models/node/Node';
import { ExperimentEditorContext } from '../../../../types';
import Margin from '../../../../components/margin/Margin';
import { MARGIN } from '../../../../constants/theme/styles';
import {
  BUTTON_HEIGHT,
  EXPERIMENT_EDITOR_HEADER_HEIGHT,
} from '../../../../constants/config/sizes';
import Experiment from '../../../../models/experiment/Experiment';
import Input from '../../../../components/input/Input';
import { validateLoad } from './utils';
import Load from '../../../../models/load/Load';

interface CreateLoadEditorProps {
  experiment: Experiment;
  setContext: (experimentEditorContext: ExperimentEditorContext) => void;
}
const CreateLoadEditor = ({
  experiment,
  setContext,
}: CreateLoadEditorProps) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [fx, setFx] = useState<string>('');
  const [fy, setFy] = useState<string>('');
  const [fz, setFz] = useState<string>('');
  const disabled = !(selectedNode && validateLoad(fx, fy, fz));
  const onCreateStrutClick = disabled
    ? undefined
    : () => {
        experiment.loads.add(
          new Load({
            node: selectedNode!,
            fx: Number(fx),
            fy: Number(fy),
            fz: Number(fz),
          })
        );
        setContext(ExperimentEditorContext.ExperimentOverview);
      };
  return (
    <div style={{ height: `calc(100% - ${EXPERIMENT_EDITOR_HEADER_HEIGHT}px` }}>
      <Margin
        style={{ height: `calc(100% - ${4 * MARGIN + BUTTON_HEIGHT}px)` }}
      >
        <div
          style={{
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <table>
            <tr>
              <td>X-coordinate</td>
              <td>Y-coordinate</td>
              <td>Z-coordinate</td>
            </tr>
            <tr>
              <td>
                <Input
                  value={fx}
                  onChange={({ target }) => setFx(target.value)}
                ></Input>
              </td>
              <td>
                <Input
                  value={fy}
                  onChange={({ target }) => setFy(target.value)}
                ></Input>
              </td>
              <td>
                <Input
                  value={fz}
                  onChange={({ target }) => setFz(target.value)}
                ></Input>
              </td>
            </tr>
          </table>
          {experiment.structure.nodes.get().map(node => (
            <Button
              key={node.id}
              style={{ width: '100%' }}
              buttonType={ButtonType.Primary}
              highlighted={selectedNode === node}
              onClick={() =>
                setSelectedNode(selectedNode === node ? null : node)
              }
            >
              {node.coordinates.toString()}
            </Button>
          ))}
        </div>
      </Margin>
      <Margin>
        <Button
          style={{ width: '100%' }}
          buttonType={ButtonType.Primary}
          onClick={onCreateStrutClick}
          disabled={disabled}
        >
          CREATE STRUT
        </Button>
      </Margin>
    </div>
  );
};

export default CreateLoadEditor;
