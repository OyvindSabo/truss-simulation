import React from 'react';

interface CenterVerticallyProps {
  children: any;
}
const CenterVertically = ({ children }: CenterVerticallyProps) => (
  <div style={{ height: '100%' }}>
    <div
      style={{
        position: 'relative',
        top: '50%',
        transform: 'translate(0, -50%)',
      }}
    >
      {children}
    </div>
  </div>
);

export default CenterVertically;
