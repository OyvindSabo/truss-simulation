import Structure from '../structure/Structure';
import Name from '../name/Name';

interface MonitorProps {
  id?: string;
  name?: string;
  description?: string;
  structure: Structure;
}
class Monitor {
  id: string;
  name: Name;
  description: string;
  structure: Structure;
  constructor({ id, name, description, structure }: MonitorProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = description || '';
    this.structure = structure;
  }
}

export default Monitor;
