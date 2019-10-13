import { Node, Strut } from '../../types';

interface StructureProps {
  id?: string;
  name?: string;
  description?: string;
  nodes?: Node[];
  struts?: Strut[];
}
class Structure {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  struts: Strut[];
  constructor({ id, name, description, nodes, struts }: StructureProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = name || '';
    this.description = description || '';
    this.nodes = nodes || [];
    this.struts = struts || [];
  }
}

export default Structure;
