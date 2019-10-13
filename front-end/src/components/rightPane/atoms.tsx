import styled from 'styled-components';
import { RIGHT_PANE_BACKGROUND } from '../../constants/config/colors';
import { RIGHT_PANE_WIDTH } from '../../constants/config/sizes';
import { MARGIN, TRANSITION } from '../../constants/theme/styles';
import { OnClick } from '../../types';

export const RightPaneContainer = styled.div`
  background: ${RIGHT_PANE_BACKGROUND};
  position: fixed;
  height: 100vh;
  width: ${RIGHT_PANE_WIDTH}px;
  right: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 0 : -RIGHT_PANE_WIDTH}px;
  top: 0;
  transition: ${TRANSITION}s;
`;

interface OpenCloseButtonProps {
  isOpen: boolean;
  onClick: OnClick;
}
export const OpenCloseButton = styled.div<OpenCloseButtonProps>`
  position: fixed;
  top: ${MARGIN}px;
  right: ${MARGIN}px;
  transition: ${TRANSITION}s;
  transform: rotate(${({ isOpen }) => (isOpen ? 0 : 180)}deg);
  cursor: pointer;
`;
