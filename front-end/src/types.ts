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

export enum StructureEditorContext {
  PreviewNodes = 'PREVIEW_NODES',
  CreateNode = 'CREATE_NODE',
  EditNode = 'EDIT_NODE',
  PreviewStruts = 'PREVIEW_STRUTS',
  CreateStrut = 'CREATE_STRUT',
  EditStrut = 'EDIT_STRUT',
}
