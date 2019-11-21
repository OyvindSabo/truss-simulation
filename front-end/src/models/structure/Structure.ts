import { NodeData, StrutData } from '../../types';
import Name from '../name/Name';
import Description from '../description/Description';
import Nodes from '../nodes/Nodes';
import { StrutProps } from '../strut/Strut';
import Struts from '../struts/Struts';

export interface StructureProps {
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
  _changeListeners: (() => void)[];
  constructor({ id, name, description, nodes, struts }: StructureProps) {
    this.id = id || `${new Date().getTime()}`;

    this.name = new Name(name);
    this.name.addChangeListener(this._callChangeListeners);

    this.description = new Description(description);
    this.description.addChangeListener(this._callChangeListeners);

    this.nodes = new Nodes(nodes);
    this.nodes.addChangeListener(this._callChangeListeners);

    const strutsProps: StrutProps[] = [];
    (struts || []).forEach(({ id, name, sourceId, targetId, radius }) => {
      const source = this.nodes.getById(sourceId);
      const target = this.nodes.getById(targetId);
      if (!source || !target) return;
      strutsProps.push({ id, name, source, target, radius });
    });
    this.struts = new Struts(strutsProps);
    this.struts.addChangeListener(this._callChangeListeners);

    this._changeListeners = [];
  }

  getCfemExport() {
    const nodeIdToCfemId: { [key: string]: number } = {};
    // NODE nodeID X Y Z ix iy iz irx iry irz rotID
    const nodalData = this.nodes.get().map((node, nodeId) => {
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
    const elementData = this.struts.get().map((strut, elementId) => {
      const node1 = nodeIdToCfemId[strut.source.id];
      const node2 = nodeIdToCfemId[strut.target.id];
      return `TRUSS ${elementId} ${node1} ${node2}`;
    });
    return [...nodalData, ...elementData].join('\n');
  }

  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }

  // This will be passed as a callback so it has to be an arrow function
  _callChangeListeners = () => {
    console.log('calling Structure change listener');
    console.log('this._changeListeners: ', this._changeListeners);
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  };

  objectify() {
    return {
      id: this.id,
      name: this.name.objectify(),
      description: this.description.objectify(),
      nodes: this.nodes.objectify(),
      struts: this.struts.objectify(),
    };
  }
}

export default Structure;
