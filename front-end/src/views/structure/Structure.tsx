import React, { useState, useEffect } from 'react';
import SpaceFrameVisualization from '../../components/spaceFrameVisualization/SpaceFrameVisualization';
import { SpaceFrameData } from '../../types';
import { EMPTY_SPACE_FRAME } from '../../constants/fallbacks';
import { state } from '../../state';
import { SET_SELECTED_STRUCTURE_ID, SET_STRUCTURES } from '../../customEvents';

interface StructureProps {
  structure: SpaceFrameData;
}
const Structure: React.FC<StructureProps> = ({ structure }) => {
  const [structures, setStructures] = useState<SpaceFrameData[]>(
    state.getStructures()
  );
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(
    state.getSelectedStructureId()
  );
  useEffect(() => {
    window.addEventListener(SET_STRUCTURES.type, () => {
      setStructures(state.getStructures());
    });
    window.addEventListener(SET_SELECTED_STRUCTURE_ID.type, () => {
      setSelectedStructureId(state.getSelectedStructureId());
    });
    return () => {
      window.removeEventListener(SET_STRUCTURES.type, () => {
        setStructures(state.getStructures());
      });
      window.removeEventListener(SET_SELECTED_STRUCTURE_ID.type, () => {
        setSelectedStructureId(state.getSelectedStructureId());
      });
    };
  }, []);
  const selectedStructure =
    structures.find(structure => structure.id === selectedStructureId) ||
    EMPTY_SPACE_FRAME;
  return <SpaceFrameVisualization spaceFrameData={selectedStructure} />;
};

export default Structure;
