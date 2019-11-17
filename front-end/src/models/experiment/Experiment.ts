import Structure, { StructureProps } from '../structure/Structure';
import Name from '../name/Name';
import Loads from '../loads/Loads';
import { LoadProps } from '../load/Load';

interface ExperimentProps {
  id?: string;
  name?: string;
  description?: string;
  structure: StructureProps;
  loads?: LoadProps[];
  deformedStructure?: Structure;
}
class Experiment {
  id: string;
  name: Name;
  description: string;
  structure: Structure;
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
    this.structure = new Structure(structure);
    this.loads = new Loads(loads);
    this.deformedStructure = deformedStructure || null;
  }

  getCfemExport() {
    const nodeIdToCfemId: { [key: string]: number } = {};
    // NODE nodeID X Y Z ix iy iz irx iry irz rotID
    const nodalData = this.structure.nodes.get().map((node, nodeId) => {
      nodeIdToCfemId[node.id] = nodeId;
      const { x, y, z } = node.coordinates.get();

      const translationalDegreesOfFreedom = node.translationalDegreesOfFreedom.get();
      const ix = translationalDegreesOfFreedom.ix ? 1 : 0;
      const iy = translationalDegreesOfFreedom.iy ? 1 : 0;
      const iz = translationalDegreesOfFreedom.iz ? 1 : 0;

      const rotationalDegreesOfFreedom = node.rotationalDegreesOfFreedom.get();
      const irx = rotationalDegreesOfFreedom.irx ? 1 : 0;
      const iry = rotationalDegreesOfFreedom.iry ? 1 : 0;
      const irz = rotationalDegreesOfFreedom.irz ? 1 : 0;

      return `NODE ${nodeId} ${x} ${y} ${z} ${ix} ${iy} ${iz} ${irx} ${iry} ${irz}`;
    });
    // TRUSS elemID node1 node2 matID secID
    const elementData = this.structure.struts.get().map((strut, elementId) => {
      const node1 = nodeIdToCfemId[strut.source.id];
      const node2 = nodeIdToCfemId[strut.target.id];
      return `TRUSS ${elementId} ${node1} ${node2}`;
    });
    return [...nodalData, ...elementData].join('\n');
  }
}

export default Experiment;
