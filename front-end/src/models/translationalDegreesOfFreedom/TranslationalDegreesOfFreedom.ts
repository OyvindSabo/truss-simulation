interface TranslationalDegreesOfFreedomProps {
  ix: boolean;
  iy: boolean;
  iz: boolean;
}

class TranslationalDegreesOfFreedom {
  _ix: boolean;
  _iy: boolean;
  _iz: boolean;
  _changeListeners: (() => void)[];
  constructor({ ix, iy, iz }: TranslationalDegreesOfFreedomProps) {
    this._ix = ix;
    this._iy = iy;
    this._iz = iz;
    this._changeListeners = [];
  }
  set({ ix, iy, iz }: TranslationalDegreesOfFreedomProps) {
    this._ix = ix;
    this._iy = iy;
    this._iz = iz;
    this._callChangeListeners();
  }
  get() {
    return {
      ix: this._ix,
      iy: this._iy,
      iz: this._iz,
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
    return `(${this._ix}, ${this._iy}, ${this._iz})`;
  }
}

export default TranslationalDegreesOfFreedom;
