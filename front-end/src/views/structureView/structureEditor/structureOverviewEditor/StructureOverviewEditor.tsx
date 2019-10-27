import React from 'react';
import Structure from '../../../../models/structure/Structure';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { StructureEditorContext } from '../../../../types';

interface StructureOverviewEditorProps {
  structure: Structure;
  setContext: (structureEditorContext: StructureEditorContext) => void;
}
const StructureOverviewEditor = ({
  structure,
  setContext,
}: StructureOverviewEditorProps) => (
  <div>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() => setContext(StructureEditorContext.EditStructureInfo)}
      >
        EDIT STRUCTURE INFO
      </Button>
    </Margin>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() => setContext(StructureEditorContext.CreateNode)}
      >
        CREATE NODE
      </Button>
    </Margin>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() => setContext(StructureEditorContext.CreateNode)}
      >
        CREATE STRUT
      </Button>
    </Margin>
  </div>
);

export default StructureOverviewEditor;
