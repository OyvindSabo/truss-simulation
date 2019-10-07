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
