import React from 'react';
import { TopBarContainer } from './atoms';
import CenterVertically from '../center/CenterVertically';

interface TopBarProps {
  title: string;
  children?: any;
}
const TopBar = ({ title, children }: TopBarProps) => (
  <TopBarContainer>
    <CenterVertically>
      <>{title}</>
      <>{children}</>
    </CenterVertically>
  </TopBarContainer>
);

export default TopBar;
