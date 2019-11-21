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
    this._callChangeListeners();
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
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_NODES);
  }
  set(nodes: Node[]) {
    this._nodes = nodes;
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_NODES);
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
  // This will be passed as a callback so it has to be an arrow function
  _callChangeListeners = () => {
    console.log('Calling nodes change listener');
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  };
  objectify() {
    return this._nodes.map(node => node.objectify());
  }
}

export default Nodes;
