import Structure from '../structure/Structure';

interface ExperimentProps {
  id?: string;
  name?: string;
  description?: string;
  structure: Structure;
}
class Experiment {
  id: string;
  name: string;
  description: string;
  structure: Structure;
  constructor({ id, name, description, structure }: ExperimentProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = name || '';
    this.description = description || '';
    this.structure = structure;
  }
}

export default Experiment;
