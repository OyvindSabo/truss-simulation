import Name from '../name/Name';
import Coordinates from '../coordinates/Coordinates';
import TranslationalDegreesOfFreedom from '../translationalDegreesOfFreedom/TranslationalDegreesOfFreedom';
import RotationalDegreesOfFreedom from '../rotationalDegreesOfFreedom/RotationalDegreesOfFreedom';

export interface NodeProps {
  id?: string;
  name?: string;
  x: number;
  y: number;
  z: number;
  // Translational degrees of freedom: true = fixed, false = free
  ix?: boolean;
  iy?: boolean;
  iz?: boolean;
  // Rotational degrees of freedom: true = fixed, false = free
  irx?: boolean;
  iry?: boolean;
  irz?: boolean;
}

class Node {
  id: string;
  name: Name;
  coordinates: Coordinates;
  translationalDegreesOfFreedom: TranslationalDegreesOfFreedom;
  rotationalDegreesOfFreedom: RotationalDegreesOfFreedom;
  _changeListeners: (() => void)[];
  constructor({
    id,
    name,
    x,
    y,
    z,
    ix = false,
    iy = false,
    iz = false,
    irx = false,
    iry = false,
    irz = false,
  }: NodeProps) {
    this.id = id || `${new Date().getTime()}`;
    this.name = new Name(name || '');
    this.name.addChangeListener(this._callChangeListeners);

    this.coordinates = new Coordinates({ x, y, z });
    this.coordinates.addChangeListener(this._callChangeListeners);

    this.translationalDegreesOfFreedom = new TranslationalDegreesOfFreedom({
      ix,
      iy,
      iz,
    });
    this.translationalDegreesOfFreedom.addChangeListener(
      this._callChangeListeners
    );

    this.rotationalDegreesOfFreedom = new RotationalDegreesOfFreedom({
      irx,
      iry,
      irz,
    });
    this.rotationalDegreesOfFreedom.addChangeListener(
      this._callChangeListeners
    );

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
      ...this.coordinates.get(),
      ...this.translationalDegreesOfFreedom.get(),
      ...this.rotationalDegreesOfFreedom.get(),
    };
  }
}

export default Node;
