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
import { ICON_COLOR } from '../../constants/config/colors';
import trashIcon from '../../assets/icons/trash-icon.png';
import Icon from '../icon/Icon';

interface PreviewBox {
  label: string;
  onClick?: OnClick;
  onDelete?: () => void;
  children?: any;
}
const PreviewBox = ({ label, onClick, onDelete, children }: PreviewBox) => {
  const [shouldAbortClick, setShouldAbortClick] = useState<boolean>(false);
  return (
    <div style={{ margin: `${MARGIN}px`, display: 'inline-block' }}>
      <div
        style={{
          display: 'inline-block',
          outline: `${BORDER_WIDTH}px solid ${HINT_OF_PENSIVE}`,
          background: WHITE,
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            height: PREVIEW_HEIGHT,
            width: PREVIEW_WIDTH,
            background: WHITE,
          }}
          onMouseDown={() => setShouldAbortClick(false)}
          onClick={shouldAbortClick ? undefined : onClick}
          onMouseMove={() => setShouldAbortClick(true)}
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
          <span onClick={onClick} style={{ cursor: 'pointer' }}>
            {label}
          </span>
          {onDelete && (
            <Icon
              style={{ float: 'right' }}
              icon={trashIcon}
              color={ICON_COLOR}
              onClick={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewBox;
