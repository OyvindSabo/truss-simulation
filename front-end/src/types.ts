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

export type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
};

export type Strut = {
  id: string;
  name: string;
  sourceId: string;
  targetId: string;
  radius: number;
};

export type SpaceFrameData = {
  id: string;
  name: string;
  nodes: Node[];
  struts: Strut[];
};

export enum StructureEditorContext {
  PreviewNodes = 'PREVIEW_NODES',
  CreateNode = 'CREATE_NODE',
  EditNode = 'EDIT_NODE',
  PreviewStruts = 'PREVIEW_STRUTS',
  CreateStrut = 'CREATE_STRUT',
  EditStrut = 'EDIT_STRUT',
}
