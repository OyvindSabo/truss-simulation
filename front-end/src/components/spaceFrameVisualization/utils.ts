import { SpaceFrameData } from '../../types';

/**
 * Returns the average of all node positions in the space frame
 *
 * @param param0
 */
export const getAverageNodePosition = ({ nodes }: SpaceFrameData) => {
  const { length } = nodes;
  return nodes.reduce(
    (average, node) => ({
      x: average.x + node.x / length,
      y: average.y + node.y / length,
      z: average.z + node.z / length,
    }),
    { x: 0, y: 0, z: 0 }
  );
};
