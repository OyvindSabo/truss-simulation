import styled from 'styled-components';
import { ELECTROMAGNETIC } from '../../constants/theme/colors';
import { TRANSITION } from '../../constants/theme/styles';

const DarkBoxShadow = styled.div`
  display: inline-block;
  box-shadow: 0 0 10px ${ELECTROMAGNETIC};
  &:hover {
    box-shadow: 0 0 10px 5px ${ELECTROMAGNETIC};
  }
  transition: ${TRANSITION}s;
`;

export default DarkBoxShadow;
