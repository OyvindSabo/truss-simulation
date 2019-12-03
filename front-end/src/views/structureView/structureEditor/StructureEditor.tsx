import React, { useState, useEffect } from 'react';
import Structure from '../../../models/structure/Structure';
import {
  StructureEditorContextEnum,
  StructureEditorContext,
} from '../../../types';
import { UPDATE_STRUCTURE_EDITOR_CONTEXT } from '../../../customEvents';
import { state } from '../../../state';
import CreateNodeEditor from './createNodeEditor/CreateNodeEditor';
import EditStructureEditor from './editStructureEditor/EditStructureEditor';
import { StructureEditorHeader } from './atoms';
import StructureOverviewEditor from './structureOverviewEditor/StructureOverviewEditor';
import CreateStrutEditor from './createStrutEditor/CreateStrutEditor';
import EditNodeEditor from './editNodeEditor/EditNodeEditor';

interface StructureEditorProps {
  structure: Structure;
}
const StructureEditor = ({ structure }: StructureEditorProps) => {
  const [structureEditorContext, setStructureEditorContext] = useState<
    StructureEditorContext
  >(state.getStructureEditorContext());
  useEffect(() => {
    window.addEventListener(UPDATE_STRUCTURE_EDITOR_CONTEXT.type, () => {
      setStructureEditorContext(state.getStructureEditorContext());
    });
    return () => {
      window.removeEventListener(UPDATE_STRUCTURE_EDITOR_CONTEXT.type, () => {
        setStructureEditorContext(state.getStructureEditorContext());
      });
    };
  }, []);

  if (
    structureEditorContext.context ===
    StructureEditorContextEnum.StructureOverview
  ) {
    return (
      <>
        <StructureEditorHeader>STRUCTURE OVERVIEW</StructureEditorHeader>
        <StructureOverviewEditor structure={structure} />
      </>
    );
  }
  if (
    structureEditorContext.context ===
    StructureEditorContextEnum.EditStructureInfo
  ) {
    return (
      <>
        <StructureEditorHeader>EDIT STRUCTURE INFO</StructureEditorHeader>
        <EditStructureEditor structure={structure} />
      </>
    );
  }
  if (
    structureEditorContext.context === StructureEditorContextEnum.CreateNode
  ) {
    return (
      <>
        <StructureEditorHeader>CREATE NODE</StructureEditorHeader>
        <CreateNodeEditor structure={structure} />
      </>
    );
  }
  if (
    structureEditorContext.context === StructureEditorContextEnum.CreateStrut
  ) {
    return (
      <>
        <StructureEditorHeader>CREATE STRUT</StructureEditorHeader>
        <CreateStrutEditor structure={structure} />
      </>
    );
  }
  if (structureEditorContext.context === StructureEditorContextEnum.EditNode) {
    console.log('Updated selected element');
    console.log(
      'selectedElementId: ',
      structureEditorContext.selectedElementId
    );
    return (
      <>
        <StructureEditorHeader>EDIT NODE</StructureEditorHeader>
        <EditNodeEditor
          structure={structure}
          selectedElementId={structureEditorContext.selectedElementId}
        />
      </>
    );
  }
  if (structureEditorContext.context === StructureEditorContextEnum.EditStrut) {
    return (
      <>
        <StructureEditorHeader>EDIT STRUT</StructureEditorHeader>
        {/* TODO: Update the next line to the correct one */}
        <CreateStrutEditor structure={structure} />
      </>
    );
  }
  return null;
};

export default StructureEditor;
