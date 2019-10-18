import styled from 'styled-components';
import { RIGHT_PANE_BACKGROUND } from '../../constants/config/colors';
import {
  RIGHT_PANE_WIDTH,
  TOP_BAR_HEIGHT,
  BUTTON_HEIGHT,
} from '../../constants/config/sizes';
import { TRANSITION } from '../../constants/theme/styles';
import { OnClick } from '../../types';

export const RightPaneContainer = styled.div`
  background: ${RIGHT_PANE_BACKGROUND};
  position: fixed;
  height: 100vh;
  width: ${RIGHT_PANE_WIDTH}px;
  right: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 0 : -RIGHT_PANE_WIDTH}px;
  top: ${TOP_BAR_HEIGHT}px;
  transition: ${TRANSITION}s;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  height: ${BUTTON_HEIGHT}px;
  width: ${BUTTON_HEIGHT}px;
  top: ${TOP_BAR_HEIGHT}px;
  right: 0;
`;

interface OpenCloseButtonProps {
  isOpen: boolean;
  onClick: OnClick;
}
export const RotatingButton = styled.div<OpenCloseButtonProps>`
  transition: ${TRANSITION}s;
  transform: rotate(${({ isOpen }) => (isOpen ? 0 : 180)}deg);
  cursor: pointer;
`;
