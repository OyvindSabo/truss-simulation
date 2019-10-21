import { UPDATE_NODES } from '../../customEvents';
import Node, { NodeProps } from '../node/Node';

class Nodes {
  _nodes: Node[];
  _changeListeners: (() => void)[];
  constructor(nodes: NodeProps[] = []) {
    this._nodes = nodes.map(node => new Node(node)) || [];
    this._changeListeners = [];
  }
  add(node: Node) {
    this._nodes.push(node);
    console.log('Added node');
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
    window.dispatchEvent(UPDATE_NODES);
  }
  getById(id: string) {
    return this._nodes.find(node => node.id === id);
  }
  get() {
    return this._nodes;
  }
  removeById(id: string) {
    this._nodes = this._nodes.filter(node => node.id !== id);
    window.dispatchEvent(UPDATE_NODES);
  }
  set(nodes: Node[]) {
    this._nodes = nodes;
    window.dispatchEvent(UPDATE_NODES);
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
}

export default Nodes;
