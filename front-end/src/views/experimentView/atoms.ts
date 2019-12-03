import styled from 'styled-components';
import { BUTTON_HEIGHT, RIGHT_PANE_WIDTH } from '../../constants/config/sizes';
import { TRANSITION } from '../../constants/theme/styles';

export const SwitchContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: ${BUTTON_HEIGHT}px;
`;

export const SpaceFrameVisualizationContainer = styled.div`
  transform: ${({ rightPaneIsOpen }: { rightPaneIsOpen: boolean }) =>
    `translate(-${rightPaneIsOpen ? RIGHT_PANE_WIDTH / 2 : 0}px, 0)`};
  transition: ${TRANSITION}s;
`;
