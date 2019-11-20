import Structure from '../../models/structure/Structure';
import Node from '../../models/node/Node';
import Struts from '../../models/struts/Struts';

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
