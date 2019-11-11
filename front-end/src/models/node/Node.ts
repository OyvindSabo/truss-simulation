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
    this.coordinates = new Coordinates({ x, y, z });
    this.translationalDegreesOfFreedom = new TranslationalDegreesOfFreedom({
      ix,
      iy,
      iz,
    });
    this.rotationalDegreesOfFreedom = new RotationalDegreesOfFreedom({
      irx,
      iry,
      irz,
    });
  }
}

export default Node;
