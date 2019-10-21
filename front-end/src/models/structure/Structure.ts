import { Strut } from '../../types';
import Name from '../name/Name';
import Description from '../description/Description';
import Nodes from '../nodes/Nodes';
import { NodeProps } from '../node/Node';

interface StructureProps {
  id?: string;
  name?: string;
  description?: string;
  nodes?: NodeProps[];
  struts?: Strut[];
}
class Structure {
  id: string;
  name: Name;
  description: Description;
  nodes: Nodes; // TODO: Create a class called nodes with nodes.add
  struts: Strut[];
  constructor({ id, name, description, nodes, struts }: StructureProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = new Description(description);
    this.nodes = new Nodes(nodes);
    this.struts = struts || [];
  }
}

export default Structure;
