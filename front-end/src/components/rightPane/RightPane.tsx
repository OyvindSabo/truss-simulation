import React from 'react';
import { RightPaneContainer } from './atoms';

interface RightPaneProps {
  isOpen: boolean;
  children?: JSX.Element[];
}
const RightPane = ({ isOpen, children }: RightPaneProps) => {
  return <RightPaneContainer isOpen={isOpen}>{children}</RightPaneContainer>;
};
