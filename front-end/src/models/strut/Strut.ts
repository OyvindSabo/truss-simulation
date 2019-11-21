import Name from '../name/Name';
import Node from '../node/Node';

export interface StrutProps {
  id?: string;
  name?: string;
  source: Node;
  target: Node;
  radius?: number;
}

class Strut {
  id: string;
  name: Name;
  source: Node;
  target: Node;
  radius: number;
  _changeListeners: (() => void)[];
  constructor({ id, name, source, target, radius }: StrutProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.name.addChangeListener(this._callChangeListeners);

    this.source = source;
    this.target = target;
    this.radius = radius || 0.1;
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
      sourceId: this.source.id,
      targetId: this.target.id,
      radius: this.radius,
    };
  }
}

export default Strut;
