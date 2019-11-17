import Name from '../name/Name';
import Node from '../node/Node';

export interface LoadProps {
  id?: string;
  name?: string;
  node: Node;
  fx: number;
  fy: number;
  fz: number;
}

class Load {
  id: string;
  name: Name;
  node: Node;
  fx: number;
  fy: number;
  fz: number;
  constructor({ id, name, node, fx, fy, fz }: LoadProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.node = node;
    this.fx = fx;
    this.fy = fy;
    this.fz = fz;
  }
}

export default Load;
