import { NodeData, StrutData } from '../../types';
import Name from '../name/Name';
import Description from '../description/Description';
import Nodes from '../nodes/Nodes';
import { StrutProps } from '../strut/Strut';
import Struts from '../struts/Struts';

interface StructureProps {
  id?: string;
  name?: string;
  description?: string;
  nodes?: NodeData[];
  struts?: StrutData[];
}
class Structure {
  id: string;
  name: Name;
  description: Description;
  nodes: Nodes; // TODO: Create a class called nodes with nodes.add
  struts: Struts;
  constructor({ id, name, description, nodes, struts }: StructureProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name);
    this.description = new Description(description);
    this.nodes = new Nodes(nodes);
    const strutsProps: StrutProps[] = [];
    (struts || []).forEach(({ id, name, sourceId, targetId, radius }) => {
      const source = this.nodes.getById(sourceId);
      const target = this.nodes.getById(targetId);
      if (!source || !target) return;
      strutsProps.push({ id, name, source, target, radius });
    });
    this.struts = new Struts(strutsProps);
  }

  getCfemExport() {
    const nodeIdToCfemId: { [key: string]: number } = {};
    // NODE nodeID X Y Z ix iy iz irx iry irz rotID
    const nodalData = this.nodes.get().map((node, nodeId) => {
      nodeIdToCfemId[node.id] = nodeId;
      const { x, y, z } = node.coordinates.get();
      return `NODE ${nodeId} ${x} ${y} ${z}`;
    });
    // TRUSS elemID node1 node2 matID secID
    const elementData = this.struts.get().map((strut, elementId) => {
      const node1 = nodeIdToCfemId[strut.source.id];
      const node2 = nodeIdToCfemId[strut.target.id];
      return `TRUSS ${elementId} ${node1} ${node2}`;
    });
    return [...nodalData, ...elementData].join('\n');
  }
}

export default Structure;
