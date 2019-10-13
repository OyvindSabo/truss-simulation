import { Node, Strut } from '../../types';
import Name from '../name/Name';
import Description from '../description/Description';

interface StructureProps {
  id?: string;
  name?: string;
  description?: string;
  nodes?: Node[];
  struts?: Strut[];
}
class Structure {
  id: string;
  name: Name;
  description: Description;
  nodes: Node[];
  struts: Strut[];
  constructor({ id, name, description, nodes, struts }: StructureProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = new Description(description);
    this.nodes = nodes || [];
    this.struts = struts || [];
  }
}

export default Structure;
