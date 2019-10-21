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
  constructor({ x, y, z }: CoordinatesProps) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  set({ x, y, z }: CoordinatesProps) {
    this._x = x;
    this._y = y;
    this._z = z;
    window.dispatchEvent(UPDATE_COORDINATES);
  }
  get() {
    return {
      x: this._x,
      y: this._y,
      z: this._z,
    };
  }
}

export default Coordinates;
