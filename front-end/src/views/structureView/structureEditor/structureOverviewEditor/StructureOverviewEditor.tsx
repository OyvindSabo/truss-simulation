import React from 'react';
import Structure from '../../../../models/structure/Structure';
import Button from '../../../../components/button/Button';
import { ButtonType } from '../../../../components/button/types';
import Margin from '../../../../components/margin/Margin';
import { StructureEditorContextEnum } from '../../../../types';
import { state } from '../../../../state';

interface StructureOverviewEditorProps {
  structure: Structure;
}
const StructureOverviewEditor = ({
  structure,
}: StructureOverviewEditorProps) => (
  <div>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() =>
          state.setStructureEditorContext({
            context: StructureEditorContextEnum.EditStructureInfo,
            selectedElementId: null,
          })
        }
      >
        EDIT STRUCTURE INFO
      </Button>
    </Margin>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() =>
          state.setStructureEditorContext({
            context: StructureEditorContextEnum.CreateNode,
            selectedElementId: null,
          })
        }
      >
        CREATE NODE
      </Button>
    </Margin>
    <Margin>
      <Button
        style={{ width: '100%' }}
        buttonType={ButtonType.Primary}
        onClick={() =>
          state.setStructureEditorContext({
            context: StructureEditorContextEnum.CreateStrut,
            selectedElementId: null,
          })
        }
      >
        CREATE STRUT
      </Button>
    </Margin>
  </div>
);

export default StructureOverviewEditor;
