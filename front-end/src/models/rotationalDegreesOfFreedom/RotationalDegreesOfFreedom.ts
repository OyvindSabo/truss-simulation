interface RotationalDegreesOfFreedomProps {
  irx: boolean;
  iry: boolean;
  irz: boolean;
}

class RotationalDegreesOfFreedom {
  _irx: boolean;
  _iry: boolean;
  _irz: boolean;
  _changeListeners: (() => void)[];
  constructor({ irx, iry, irz }: RotationalDegreesOfFreedomProps) {
    this._irx = irx;
    this._iry = iry;
    this._irz = irz;
    this._changeListeners = [];
  }
  set({ irx, iry, irz }: RotationalDegreesOfFreedomProps) {
    this._irx = irx;
    this._iry = iry;
    this._irz = irz;
    this._callChangeListeners();
  }
  get() {
    return {
      irx: this._irx,
      iry: this._iry,
      irz: this._irz,
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
    return `(${this._irx}, ${this._iry}, ${this._irz})`;
  }
}

export default RotationalDegreesOfFreedom;
