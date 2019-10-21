import Name from '../name/Name';
import Coordinates from '../coordinates/Coordinates';

export interface NodeProps {
  id?: string;
  name?: string;
  x: number;
  y: number;
  z: number;
}

class Node {
  id: string;
  name: Name;
  coordinates: Coordinates;
  constructor({ id, name, x, y, z }: NodeProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.coordinates = new Coordinates({ x, y, z });
  }
}

export default Node;
