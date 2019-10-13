import React, { useState } from 'react';
import { OnClick } from '../../types';
import { MARGIN, PADDING } from '../../constants/theme/styles';
import { HINT_OF_PENSIVE } from '../../constants/theme/colors';
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from '../../constants/config/sizes';

interface PreviewBox {
  label: string;
  onClick?: OnClick;
  children?: any;
}
const PreviewBox = ({ label, onClick, children }: PreviewBox) => {
  const [shouldAbortClick, setShouldAbortClick] = useState<boolean>(false);
  return (
    <div
      style={{ margin: `${MARGIN}px`, display: 'inline-block' }}
      onMouseDown={() => setShouldAbortClick(false)}
      onClick={shouldAbortClick ? undefined : onClick}
      onMouseMove={() => setShouldAbortClick(true)}
    >
      <div
        style={{
          display: 'inline-block',
          outline: `1px solid ${HINT_OF_PENSIVE}`,
          background: 'white',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            height: PREVIEW_HEIGHT,
            width: PREVIEW_WIDTH,
            background: 'white',
          }}
        >
          {children}
        </div>
        <div style={{ padding: `${PADDING}px`, textAlign: 'center' }}>
          {label}
        </div>
      </div>
    </div>
  );
};

export default PreviewBox;
