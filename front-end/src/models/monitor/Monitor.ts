import Structure from '../structure/Structure';

interface MonitorProps {
  id?: string;
  name?: string;
  description?: string;
  structure: Structure;
}
class Monitor {
  id: string;
  name: string;
  description: string;
  structure: Structure;
  constructor({ id, name, description, structure }: MonitorProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = name || '';
    this.description = description || '';
    this.structure = structure;
  }
}

export default Monitor;
