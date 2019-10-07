import React from 'react';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { SpaceFrameData } from '../../types';
import { structureDataSource } from '../../services/structure/structure';
import { withPropsFromDataSource } from '../../libs/sorcerer/sorcerer';

interface StructureProps {
  structure: SpaceFrameData;
}
const Structure: React.FC<StructureProps> = ({ structure }) => {
  return <SpaceFrameVisualization spaceFrameData={structure} />;
};

export default withPropsFromDataSource(Structure, structureDataSource);
