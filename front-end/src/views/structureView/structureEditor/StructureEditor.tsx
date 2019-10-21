import React, { useState, useEffect } from 'react';
import Structure from '../../../models/structure/Structure';
import { StructureEditorContext } from '../../../types';
import { UPDATE_STRUCTURE_EDITOR_CONTEXT } from '../../../customEvents';
import { state } from '../../../state';
import CreateNodeEditor from './createNodeEditor/CreateNodeEditor';
import EditStructureEditor from './editStructureEditor/EditStructureEditor';

interface StructureEditorProps {
  structure: Structure;
}
const StructureEditor = ({ structure }: StructureEditorProps) => {
  const [context, setContext] = useState<StructureEditorContext>(
    state.getStructureEditorContext()
  );
  useEffect(() => {
    window.addEventListener(UPDATE_STRUCTURE_EDITOR_CONTEXT.type, () => {
      setContext(state.getStructureEditorContext());
    });
    return () => {
      window.removeEventListener(UPDATE_STRUCTURE_EDITOR_CONTEXT.type, () => {
        setContext(state.getStructureEditorContext());
      });
    };
  }, []);

  if (context === StructureEditorContext.EditStructure) {
    return <EditStructureEditor structure={structure} />;
  }
  if (context === StructureEditorContext.CreateNode) {
    return <CreateNodeEditor structure={structure} />;
  }
  return null;
};

export default StructureEditor;
