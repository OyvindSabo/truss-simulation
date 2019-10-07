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
