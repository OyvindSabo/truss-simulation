import React, { useState, useEffect } from 'react';
import { SpaceFrameData } from '../../types';
import { state } from '../../state';
import { SET_STRUCTURES } from '../../customEvents';
import PreviewBox from '../../components/previewBox/PreviewBox';

const Structures = () => {
  const [structures, setStructures] = useState<SpaceFrameData[]>(
    state.getStructures()
  );
  useEffect(() => {
    window.addEventListener(SET_STRUCTURES.type, () => {
      setStructures(state.getStructures());
    });
    return () => {
      window.removeEventListener(SET_STRUCTURES.type, () => {
        setStructures(state.getStructures());
      });
    };
  }, []);
  return structures.map(structure => <PreviewBox label={structure.name} />);
};

export default Structures;
