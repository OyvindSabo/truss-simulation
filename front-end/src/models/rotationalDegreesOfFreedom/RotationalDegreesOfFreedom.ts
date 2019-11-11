interface RotationalDegreesOfFreedomProps {
  irx: boolean;
  iry: boolean;
  irz: boolean;
}

class RotationalDegreesOfFreedom {
  _irx: boolean;
  _iry: boolean;
  _irz: boolean;
  constructor({ irx, iry, irz }: RotationalDegreesOfFreedomProps) {
    this._irx = irx;
    this._iry = iry;
    this._irz = irz;
  }
  set({ irx, iry, irz }: RotationalDegreesOfFreedomProps) {
    this._irx = irx;
    this._iry = iry;
    this._irz = irz;
  }
  get() {
    return {
      irx: this._irx,
      iry: this._iry,
      irz: this._irz,
    };
  }
  toString() {
    return `(${this._irx}, ${this._iry}, ${this._irz})`;
  }
}

export default RotationalDegreesOfFreedom;
