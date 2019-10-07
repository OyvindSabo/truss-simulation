import React from 'react';
import LightBoxShadow from '../boxShadow/LightBoxShadow';
import { PADDING, MARGIN } from '../../constants/styles';

interface PreviewBox {
  label: string;
}
const PreviewBox = ({ label }: PreviewBox) => (
  <LightBoxShadow style={{ margin: `${MARGIN}px` }}>
    <div
      style={{
        display: 'inline-block',
        background: 'white',
        cursor: 'pointer',
      }}
    >
      <div
        style={{ height: '360px', width: '640px', background: 'white' }}
      ></div>
      <div style={{ padding: `${PADDING}px`, textAlign: 'center' }}>
        {label}
      </div>
    </div>
  </LightBoxShadow>
);

export default PreviewBox;
