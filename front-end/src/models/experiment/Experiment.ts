import Structure from '../structure/Structure';
import Name from '../name/Name';
import Loads from '../loads/Loads';
import { LoadProps } from '../load/Load';

interface ExperimentProps {
  id?: string;
  name?: string;
  description?: string;
  structure?: Structure;
  loads?: LoadProps[];
  deformedStructure?: Structure;
}
class Experiment {
  id: string;
  name: Name;
  description: string;
  structure: Structure | null;
  loads: Loads;
  deformedStructure: Structure | null;
  constructor({
    id,
    name,
    description,
    structure,
    loads,
    deformedStructure,
  }: ExperimentProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = description || '';
    this.structure = structure || null;
    this.loads = new Loads(loads);
    this.deformedStructure = deformedStructure || null;
  }
}

export default Experiment;
