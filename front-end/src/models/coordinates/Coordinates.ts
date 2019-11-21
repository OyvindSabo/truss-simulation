import { UPDATE_COORDINATES } from '../../customEvents';

interface CoordinatesProps {
  x: number;
  y: number;
  z: number;
}

class Coordinates {
  _x: number;
  _y: number;
  _z: number;
  _changeListeners: (() => void)[];
  constructor({ x, y, z }: CoordinatesProps) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._changeListeners = [];
  }
  set({ x, y, z }: CoordinatesProps) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._callChangeListeners();
    window.dispatchEvent(UPDATE_COORDINATES);
  }
  get() {
    return {
      x: this._x,
      y: this._y,
      z: this._z,
    };
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
  toString() {
    return `(${this._x}, ${this._y}, ${this._z})`;
  }
}

export default Coordinates;
