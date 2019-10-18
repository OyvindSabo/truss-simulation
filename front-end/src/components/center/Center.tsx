import React from 'react';
import CenterVertically from './CenterVertically';
import CenterHorizontally from './CenterHorizontally';

interface CenterProps {
  children: any;
}
const Center = ({ children }: CenterProps) => (
  <CenterVertically>
    <CenterHorizontally>{children}</CenterHorizontally>
  </CenterVertically>
);

export default Center;
