import Structure from '../structure/Structure';
import Name from '../name/Name';

interface ExperimentProps {
  id?: string;
  name?: string;
  description?: string;
  structure?: Structure;
  deformedStructure?: Structure;
}
class Experiment {
  id: string;
  name: Name;
  description: string;
  structure: Structure | null;
  deformedStructure: Structure | null;
  constructor({
    id,
    name,
    description,
    structure,
    deformedStructure,
  }: ExperimentProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = description || '';
    this.structure = structure || null;
    this.deformedStructure = deformedStructure || null;
  }
}

export default Experiment;
