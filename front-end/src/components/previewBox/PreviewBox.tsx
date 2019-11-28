import React, { useState } from 'react';
import { OnClick } from '../../types';
import {
  MARGIN,
  PADDING,
  BORDER_WIDTH,
  FONT_SIZE,
} from '../../constants/theme/styles';
import { HINT_OF_PENSIVE, WHITE } from '../../constants/theme/colors';
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
          outline: `${BORDER_WIDTH}px solid ${HINT_OF_PENSIVE}`,
          background: WHITE,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            height: PREVIEW_HEIGHT,
            width: PREVIEW_WIDTH,
            background: WHITE,
          }}
        >
          {children}
        </div>
        <div
          style={{
            height: 2 * PADDING + FONT_SIZE,
            boxSizing: 'border-box',
            padding: PADDING,
            textAlign: 'center',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default PreviewBox;
