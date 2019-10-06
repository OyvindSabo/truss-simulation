import styled from 'styled-components';
import { BLUE_NIGHTS } from '../../constants/colors';
import { NAVIGATOR_WIDTH } from '../../constants/sizes';

export const NavigatorContainer = styled.div`
  background: ${BLUE_NIGHTS};
  position: fixed;
  height: 100vh;
  width: ${NAVIGATOR_WIDTH}px;
  left: 0;
  top: 0;
  z-index: 1;
`;
