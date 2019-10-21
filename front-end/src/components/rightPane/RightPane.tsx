import React from 'react';
import { RightPaneContainer, RotatingButton, ButtonContainer } from './atoms';
import rightChevron from '../../assets/icons/chevron-right-icon.png';
import Icon from '../icon/Icon';
import { ICON_COLOR } from '../../constants/config/colors';
import Center from '../center/Center';

interface RightPaneProps {
  isOpen: boolean;
  onOpenClose: () => void;
  children: any;
}
const RightPane = ({ isOpen, children, onOpenClose }: RightPaneProps) => {
  return (
    <>
      <RightPaneContainer isOpen={isOpen}>{children}</RightPaneContainer>
      <ButtonContainer id="buttonContainer">
        <Center>
          <RotatingButton isOpen={isOpen} onClick={onOpenClose}>
            <Icon icon={rightChevron} color={ICON_COLOR} />
          </RotatingButton>
        </Center>
      </ButtonContainer>
    </>
  );
};

export default RightPane;
