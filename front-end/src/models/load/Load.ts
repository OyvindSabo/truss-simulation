import Name from '../name/Name';
import Node from '../node/Node';

export interface LoadProps {
  id?: string;
  name?: string;
  node: Node;
  fx: number;
  fy: number;
  fz: number;
}

class Load {
  id: string;
  name: Name;
  node: Node;
  fx: number;
  fy: number;
  fz: number;
  _changeListeners: (() => void)[];
  constructor({ id, name, node, fx, fy, fz }: LoadProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.name.addChangeListener(this._callChangeListeners);

    this.node = node;
    this.fx = fx;
    this.fy = fy;
    this.fz = fz;
    this._changeListeners = [];
  }
  addChangeListener(changeListener: () => void) {
    this._changeListeners.push(changeListener);
  }
  // This will be passed as a callback so it has to be an arrow function
  _callChangeListeners = () => {
    this._changeListeners.forEach(changeListener => {
      changeListener();
    });
  };
  objectify() {
    return {
      id: this.id,
      name: this.name.objectify(),
      node: this.node.objectify(),
      fx: this.fx,
      fy: this.fy,
      fz: this.fz,
    };
  }
}

export default Load;
