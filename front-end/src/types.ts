export type OnClick = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type OnMouseDown = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type OnMouseUp = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type OnMouseMove = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type NodeData = {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  ix?: boolean;
  iy?: boolean;
  iz?: boolean;
  irx?: boolean;
  iry?: boolean;
  irz?: boolean;
};

export type StrutData = {
  id: string;
  name: string;
  sourceId: string;
  targetId: string;
  radius: number;
};

export type SpaceFrameData = {
  id: string;
  name: string;
  nodes: NodeData[];
  struts: StrutData[];
};

export enum StructureEditorContextEnum {
  StructureOverview = 'STRUCTURE_OVERVIEW',
  EditStructureInfo = 'EDIT_STRUCTURE_INFO',
  PreviewNodes = 'PREVIEW_NODES',
  CreateNode = 'CREATE_NODE',
  EditNode = 'EDIT_NODE',
  PreviewStruts = 'PREVIEW_STRUTS',
  CreateStrut = 'CREATE_STRUT',
  EditStrut = 'EDIT_STRUT',
}

export type StructureEditorContext =
  | {
      context: StructureEditorContextEnum.StructureOverview;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.EditStructureInfo;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.PreviewNodes;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.CreateNode;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.EditNode;
      selectedElementId: string;
    }
  | {
      context: StructureEditorContextEnum.PreviewStruts;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.CreateStrut;
      selectedElementId: null;
    }
  | {
      context: StructureEditorContextEnum.EditStrut;
      selectedElementId: string;
    };

export enum ExperimentEditorContextEnum {
  ExperimentOverview = 'STRUCTURE_OVERVIEW',
  EditExperimentInfo = 'EDIT_STRUCTURE_INFO',
  CreateLoad = 'CREATE_LOAD',
  EditLoad = 'EDIT_LOAD',
}

export type ExperimentEditorContext =
  | {
      context: ExperimentEditorContextEnum.ExperimentOverview;
      selectedElementId: null;
    }
  | {
      context: ExperimentEditorContextEnum.EditExperimentInfo;
      selectedElementId: null;
    }
  | {
      context: ExperimentEditorContextEnum.CreateLoad;
      selectedElementId: null;
    }
  | {
      context: ExperimentEditorContextEnum.EditLoad;
      selectedElementId: string;
    };
