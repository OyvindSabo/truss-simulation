import styled from 'styled-components';
import {
  BLUE_NIGHTS,
  ELECTROMAGNETIC,
  LYNX_WHITE,
} from '../../constants/theme/colors';
import { NAVIGATOR_WIDTH } from '../../constants/config/sizes';
import { PADDING } from '../../constants/theme/styles';

export const NavigatorContainer = styled.div`
  background: ${BLUE_NIGHTS};
  position: fixed;
  height: 100vh;
  width: ${NAVIGATOR_WIDTH}px;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const Button = styled.div`
  background: ${({ selected }: { selected?: boolean }) =>
    selected ? ELECTROMAGNETIC : BLUE_NIGHTS};
  color: ${LYNX_WHITE};
  padding: ${PADDING}px;
  cursor: pointer;
  &:hover {
    background: ${ELECTROMAGNETIC};
    color: white;
  }
`;
