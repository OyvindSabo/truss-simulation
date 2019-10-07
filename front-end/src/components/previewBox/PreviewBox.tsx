import React, { useState } from 'react';
import LightBoxShadow from '../boxShadow/LightBoxShadow';
import { PADDING, MARGIN } from '../../constants/styles';
import { OnClick, OnMouseDown, OnMouseUp } from '../../types';

interface PreviewBox {
  label: string;
  onClick?: OnClick;
  children?: any;
}
const PreviewBox = ({ label, onClick, children }: PreviewBox) => {
  const [shouldAbortClick, setShouldAbortClick] = useState<boolean>(false);
  return (
    <LightBoxShadow
      style={{ margin: `${MARGIN}px` }}
      onMouseDown={() => setShouldAbortClick(false)}
      onClick={shouldAbortClick ? undefined : onClick}
      onMouseMove={() => setShouldAbortClick(true)}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'white',
          cursor: 'pointer',
        }}
      >
        <div style={{ height: '360px', width: '640px', background: 'white' }}>
          {children}
        </div>
        <div style={{ padding: `${PADDING}px`, textAlign: 'center' }}>
          {label}
        </div>
      </div>
    </LightBoxShadow>
  );
};

export default PreviewBox;
