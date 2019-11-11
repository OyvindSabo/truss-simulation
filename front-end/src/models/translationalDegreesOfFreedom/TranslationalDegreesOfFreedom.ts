interface TranslationalDegreesOfFreedomProps {
  ix: boolean;
  iy: boolean;
  iz: boolean;
}

class TranslationalDegreesOfFreedom {
  _ix: boolean;
  _iy: boolean;
  _iz: boolean;
  constructor({ ix, iy, iz }: TranslationalDegreesOfFreedomProps) {
    this._ix = ix;
    this._iy = iy;
    this._iz = iz;
  }
  set({ ix, iy, iz }: TranslationalDegreesOfFreedomProps) {
    this._ix = ix;
    this._iy = iy;
    this._iz = iz;
  }
  get() {
    return {
      ix: this._ix,
      iy: this._iy,
      iz: this._iz,
    };
  }
  toString() {
    return `(${this._ix}, ${this._iy}, ${this._iz})`;
  }
}

export default TranslationalDegreesOfFreedom;
