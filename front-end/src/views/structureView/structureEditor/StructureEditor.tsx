import React, { useState, useEffect } from 'react';
import Structure from '../../../models/structure/Structure';
import { StructureEditorContext } from '../../../types';
import { UPDATE_STRUCTURE_EDITOR_CONTEXT } from '../../../customEvents';
import { state } from '../../../state';
import CreateNodeEditor from './createNodeEditor/CreateNodeEditor';
import EditStructureEditor from './editStructureEditor/EditStructureEditor';
import { StructureEditorHeader } from './atoms';
import StructureOverviewEditor from './structureOverviewEditor/StructureOverviewEditor';

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

  if (context === StructureEditorContext.StructureOverview) {
    return (
      <>
        <StructureEditorHeader>STRUCTURE OVERVIEW</StructureEditorHeader>
        <StructureOverviewEditor
          structure={structure}
          setContext={setContext}
        />
      </>
    );
  }
  if (context === StructureEditorContext.EditStructureInfo) {
    return (
      <>
        <StructureEditorHeader>EDIT STRUCTURE INFO</StructureEditorHeader>
        <EditStructureEditor structure={structure} setContext={setContext} />
      </>
    );
  }
  if (context === StructureEditorContext.CreateNode) {
    return (
      <>
        <StructureEditorHeader>CREATE NODE</StructureEditorHeader>
        <CreateNodeEditor structure={structure} setContext={setContext} />
      </>
    );
  }
  return null;
};

export default StructureEditor;
