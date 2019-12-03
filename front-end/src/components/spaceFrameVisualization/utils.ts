import Structure from '../../models/structure/Structure';
import Node from '../../models/node/Node';
import Struts from '../../models/struts/Struts';
import Loads from '../../models/loads/Loads';
import Load from '../../models/load/Load';

/**
 * Returns the average of all node positions in the space frame
 *
 * @param param0
 */
export const getAverageNodePosition = ({ nodes }: Structure) => {
  const { length } = nodes.get();
  return nodes.get().reduce(
    (average, node) => ({
      x: average.x + node.coordinates.get().x / length,
      y: average.y + node.coordinates.get().y / length,
      z: average.z + node.coordinates.get().z / length,
    }),
    { x: 0, y: 0, z: 0 }
  );
};

export const getAnimatedPosition = (
  position: number,
  deformedPosition: number,
  animationFrame: number
) =>
  position +
  ((deformedPosition - position) *
    (1 + Math.sin((animationFrame / 180) * Math.PI))) /
    2;

export const getRadiusOfThickestStrut = (structure: Structure) => {
  const radiusesOfStruts = structure.struts.get().map(({ radius }) => radius);
  return Math.max(...radiusesOfStruts, 0);
};

export const getRadiusOfThickestConnectedStrut = (
  node: Node,
  struts: Struts
) => {
  const radiusesOfConnectedStruts = struts
    .get()
    .filter(({ source, target }) => [source, target].includes(node))
    .map(({ radius }) => radius);

  return Math.max(...radiusesOfConnectedStruts, 0);
};

const getStructureDimensions = (structure: Structure) => {
  const coordinates = structure.nodes.get().map(node => node.coordinates.get());
  const maxCoordinates = coordinates.reduce(
    (previousValue, currentValue) => ({
      x: Math.max(previousValue.x, currentValue.x),
      y: Math.max(previousValue.y, currentValue.y),
      z: Math.max(previousValue.z, currentValue.z),
    }),
    { x: -Infinity, y: -Infinity, z: -Infinity }
  );

  const minCoordinates = coordinates.reduce(
    (previousValue, currentValue) => ({
      x: Math.min(previousValue.x, currentValue.x),
      y: Math.min(previousValue.y, currentValue.y),
      z: Math.min(previousValue.z, currentValue.z),
    }),
    { x: Infinity, y: Infinity, z: Infinity }
  );

  return {
    x: Math.max(maxCoordinates.x - minCoordinates.x, 0),
    y: Math.max(maxCoordinates.y - minCoordinates.y, 0),
    z: Math.max(maxCoordinates.z - minCoordinates.z, 0),
  };
};

const getMaxStructureDimension = (structure: Structure) =>
  Math.max(...Object.values(getStructureDimensions(structure)));

const getMaxLoad = (loads: Loads) => {
  const maxLoad = Math.max(
    ...loads
      .get()
      .reduce(
        (previousValue, { fx, fy, fz }) => [...previousValue, fx, fy, fz],
        [] as number[]
      )
      .map(Math.abs),
    0
  );
  return maxLoad;
};

export const getLoadArrowShaftDimensions = (
  load: Load,
  loads: Loads,
  structure: Structure
) => {
  const maxLoad = getMaxLoad(loads);
  const maxStructureDimension = getMaxStructureDimension(structure);
  const scaleFactor = maxStructureDimension / ((5 / 2) * Math.log(1 + maxLoad));
  // The arrow length scales logarithmically with a length in the interval
  // [0, 2/5 * maxStructureDimension]
  return {
    x: Math.sign(load.fx) * Math.log(1 + Math.abs(load.fx)) * scaleFactor,
    y: Math.sign(load.fy) * Math.log(1 + Math.abs(load.fy)) * scaleFactor,
    z: Math.sign(load.fz) * Math.log(1 + Math.abs(load.fz)) * scaleFactor,
  };
};

export const getLoadArrowHeadRadius = (
  load: Load,
  loads: Loads,
  structure: Structure
) => {
  const { x, y, z } = getLoadArrowShaftDimensions(load, loads, structure);
  const loadMagnitude = Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
  );
  return loadMagnitude / 4;
};

export const getLoadArrowHeadHeight = (
  load: Load,
  loads: Loads,
  structure: Structure
) => {
  const { x, y, z } = getLoadArrowShaftDimensions(load, loads, structure);
  const loadMagnitude = Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
  );
  return loadMagnitude / 2;
};
