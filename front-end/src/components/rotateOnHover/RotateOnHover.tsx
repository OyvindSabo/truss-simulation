import styled from 'styled-components';
import { TRANSITION } from '../../constants/styles';

const RotateOnHover = styled.div`
  height: 100%;
  transition: ${TRANSITION}s;
  &:hover {
    transform: rotate(90deg);
  }
`;

export default RotateOnHover;
