import styled from 'styled-components';
import { MAIN_CONTAINER_BACKGROUND } from '../../constants/config/colors';

const MainContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: ${MAIN_CONTAINER_BACKGROUND};
`;

export default MainContainer;
