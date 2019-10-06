import styled from 'styled-components';
import { BLUE_NIGHTS, ELECTROMAGNETIC } from '../../constants/colors';
import { NAVIGATOR_WIDTH } from '../../constants/sizes';
import { PADDING } from '../../constants/styles';

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
  padding: ${PADDING}px;
`;
