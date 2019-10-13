import React from 'react';
import { RightPaneContainer, OpenCloseButton } from './atoms';
import rightChevron from '../../assets/icons/chevron-right-icon.png';
import Icon from '../icon/Icon';
import { ICON_COLOR } from '../../constants/config/colors';

interface RightPaneProps {
  isOpen: boolean;
  onOpenClose: () => void;
  children?: JSX.Element[];
}
const RightPane = ({ isOpen, children, onOpenClose }: RightPaneProps) => {
  return (
    <>
      <RightPaneContainer isOpen={isOpen}>{children}</RightPaneContainer>
      <OpenCloseButton isOpen={isOpen} onClick={onOpenClose}>
        <Icon icon={rightChevron} color={ICON_COLOR} />
      </OpenCloseButton>
    </>
  );
};

export default RightPane;
