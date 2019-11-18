import React, { useState, useEffect } from 'react';
import { ExperimentEditorContext } from '../../../types';
import { UPDATE_EXPERIMENT_EDITOR_CONTEXT } from '../../../customEvents';
import { state } from '../../../state';
import { ExperimentEditorHeader } from './atoms';
import ExperimentOverviewEditor from './experimentOverviewEditor/ExperimentOverviewEditor';
import Experiment from '../../../models/experiment/Experiment';
import EditExperimentEditor from './editExperimentEditor/EditExperimentEditor';
import CreateLoadEditor from './createLoadEditor/CreateLoadEditor';

interface ExperimentEditorProps {
  experiment: Experiment;
}
const ExperimentEditor = ({ experiment }: ExperimentEditorProps) => {
  const [context, setContext] = useState<ExperimentEditorContext>(
    state.getExperimentEditorContext()
  );
  useEffect(() => {
    window.addEventListener(UPDATE_EXPERIMENT_EDITOR_CONTEXT.type, () => {
      setContext(state.getExperimentEditorContext());
    });
    return () => {
      window.removeEventListener(UPDATE_EXPERIMENT_EDITOR_CONTEXT.type, () => {
        setContext(state.getExperimentEditorContext());
      });
    };
  }, []);

  if (context === ExperimentEditorContext.ExperimentOverview) {
    return (
      <>
        <ExperimentEditorHeader>STRUCTURE OVERVIEW</ExperimentEditorHeader>
        <ExperimentOverviewEditor
          experiment={experiment}
          setContext={setContext}
        />
      </>
    );
  }
  if (context === ExperimentEditorContext.EditExperimentInfo) {
    return (
      <>
        <ExperimentEditorHeader>EDIT EXPERIMENT INFO</ExperimentEditorHeader>
        <EditExperimentEditor experiment={experiment} setContext={setContext} />
      </>
    );
  }
  if (context === ExperimentEditorContext.CreateLoad) {
    return (
      <>
        <ExperimentEditorHeader>CREATE LOAD</ExperimentEditorHeader>
        <CreateLoadEditor experiment={experiment} setContext={setContext} />
      </>
    );
  }
  return null;
};

export default ExperimentEditor;
