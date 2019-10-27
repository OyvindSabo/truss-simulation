import React, { useState } from 'react';
import Structure from '../../../../models/structure/Structure';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Node from '../../../../models/node/Node';
import { StructureEditorContext } from '../../../../types';
import Strut from '../../../../models/strut/Strut';
import Margin from '../../../../components/margin/Margin';
import { MARGIN } from '../../../../constants/theme/styles';
import {
  BUTTON_HEIGHT,
  STRUCTURE_EDITOR_HEADER_HEIGHT,
} from '../../../../constants/config/sizes';

interface CreateStrutEditorProps {
  structure: Structure;
  setContext: (structureEditorContext: StructureEditorContext) => void;
}
const CreateStrutEditor = ({
  structure,
  setContext,
}: CreateStrutEditorProps) => {
  const [sourceNode, setSourceNode] = useState<Node | null>(null);
  const [targetNode, setTargetNode] = useState<Node | null>(null);
  const disabled = !(sourceNode && targetNode);
  const onCreateStrutClick = disabled
    ? undefined
    : () => {
        structure.struts.add(
          new Strut({ source: sourceNode!, target: targetNode! })
        );
        setContext(StructureEditorContext.StructureOverview);
      };
  return (
    <div style={{ height: `calc(100% - ${STRUCTURE_EDITOR_HEADER_HEIGHT}px` }}>
      <Margin
        style={{ height: `calc(100% - ${4 * MARGIN + BUTTON_HEIGHT}px)` }}
      >
        <div
          style={{
            height: '100%',
            overflowY: 'scroll',
          }}
        >
          {structure.nodes.get().map(node => (
            <Button
              key={node.id}
              style={{ width: '100%' }}
              buttonType={ButtonType.Primary}
              disabled={
                !!sourceNode &&
                !!targetNode &&
                ![sourceNode, targetNode].includes(node)
              }
              highlighted={[sourceNode, targetNode].includes(node)}
              onClick={() => {
                // If node is already selected, undselect it
                if ([sourceNode, targetNode].includes(node)) {
                  if (node === sourceNode) {
                    setSourceNode(null);
                  } else {
                    setTargetNode(null);
                  }
                } else if ([sourceNode, targetNode].includes(null)) {
                  if (sourceNode === null) {
                    setSourceNode(node);
                  } else {
                    setTargetNode(node);
                  }
                }
              }}
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

export default CreateStrutEditor;
