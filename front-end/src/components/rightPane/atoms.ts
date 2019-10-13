import styled from 'styled-components';
import { RIGHT_PANE_BACKGROUND } from '../../constants/config/colors';
import { RIGHT_PANE_WIDTH } from '../../constants/config/sizes';

export const RightPaneContainer = styled.div`
  background: ${RIGHT_PANE_BACKGROUND};
  position: fixed;
  height: 100vh;
  width: ${RIGHT_PANE_WIDTH}px;
  left: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 0 : -RIGHT_PANE_WIDTH}px;
  top: 0;
  z-index: 1;
`;
