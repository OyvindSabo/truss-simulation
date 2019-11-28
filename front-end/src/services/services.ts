import Structure, { StructureProps } from '../models/structure/Structure';
import Experiment from '../models/experiment/Experiment';
import Structures from '../models/structures/Structures';
import { LoadProps } from '../models/load/Load';
import Experiments from '../models/experiments/Experiments';

export const loadStructures = (): Structure[] => {
  const stringifiedStructuresProps = localStorage.getItem('structures');
  if (!stringifiedStructuresProps) return [];
  const structuresProps = JSON.parse(
    stringifiedStructuresProps
  ) as StructureProps[];
  const structures = structuresProps.map(structureProps => {
    return new Structure(structureProps);
  });
  return structures;
};

export const saveStructures = (structures: Structures) => {
  localStorage.setItem('structures', JSON.stringify(structures.objectify()));
};

export const loadExperiments = (structures: Structures): Experiment[] => {
  const stringifiedExperimentsProps = localStorage.getItem('experiments');
  if (!stringifiedExperimentsProps) return [];
  const experimentsProps = JSON.parse(stringifiedExperimentsProps) as {
    id: string;
    name: string;
    description: string;
    structureId: string;
    loads: {
      id: string;
      name: string;
      nodeId: string;
      fx: number;
      fy: number;
      fz: number;
    }[];
    deformedStructure: StructureProps;
  }[];
  const experiments = experimentsProps
    .map(({ id, name, description, structureId, loads }) => {
      const structure = structures.getById(structureId);
      if (!structure) return null;
      const loadsProps = loads
        .map(load => {
          const { nodeId } = load;
          const node = structure.nodes.getById(nodeId);
          if (!node) return null;
          return { ...load, node };
        })
        .filter(Boolean) as LoadProps[];
      return new Experiment({
        id,
        name,
        description,
        structure,
        loads: loadsProps,
        deformedStructure: undefined /*new Structure(deformedStructure)*/,
      });
    })
    .filter(Boolean) as Experiment[];
  return experiments;
};

export const saveExperiments = (experiments: Experiments) => {
  localStorage.setItem('experiments', JSON.stringify(experiments.objectify()));
};
