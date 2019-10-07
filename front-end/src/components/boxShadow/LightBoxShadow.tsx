import styled from 'styled-components';
import { HINT_OF_PENSIVE } from '../../constants/colors';
import { TRANSITION } from '../../constants/styles';

const LightBoxShadow = styled.div`
  display: inline-block;
  box-shadow: 0 0 10px ${HINT_OF_PENSIVE};
  &:hover {
    box-shadow: 0 0 10px 5px ${HINT_OF_PENSIVE};
  }
  transition: ${TRANSITION}s;
`;

export default LightBoxShadow;
