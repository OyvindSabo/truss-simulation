import Name from '../name/Name';
import Node from '../node/Node';

export interface StrutProps {
  id?: string;
  name?: string;
  source: Node;
  target: Node;
  radius?: number;
}

class Strut {
  id: string;
  name: Name;
  source: Node;
  target: Node;
  radius: number;
  constructor({ id, name, source, target, radius }: StrutProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.source = source;
    this.target = target;
    this.radius = radius || 0.1;
  }
}

export default Strut;
