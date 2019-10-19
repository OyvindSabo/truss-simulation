import styled from 'styled-components';
import { BUTTON_WIDTH, BUTTON_HEIGHT } from '../../constants/config/sizes';
import {
  PROTOSS_PYLON,
  VANADYL_BLUE,
  LYNX_WHITE,
  HINT_OF_PENSIVE,
  WHITE,
} from '../../constants/theme/colors';
import { TRANSITION } from '../../constants/theme/styles';

export const SwitchContainer = styled.div`
  width: ${2 * BUTTON_WIDTH}px;
  height: ${BUTTON_HEIGHT}px;
`;

interface SlidingButtonProps {
  firstOptionSelected: boolean;
}
export const SelectionMarker = styled.div<SlidingButtonProps>`
  color: ${WHITE};
  width: ${BUTTON_WIDTH}px;
  height: 100%;
  background: ${PROTOSS_PYLON};
  position: absolute;
  top: 0;
  cursor: pointer;
  transform: translate(
    ${({ firstOptionSelected }) => (firstOptionSelected ? 0 : BUTTON_WIDTH)}px,
    0
  );
  &:hover {
    background: ${VANADYL_BLUE};
  }
  transition: ${TRANSITION}s;
`;

export const OptionButton = styled.div`
  width: ${BUTTON_WIDTH}px;
  height: ${BUTTON_HEIGHT}px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  background: ${LYNX_WHITE};
  &:hover {
    background: ${HINT_OF_PENSIVE};
  }
  transition: ${TRANSITION}s;
`;
