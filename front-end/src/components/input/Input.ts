import styled from 'styled-components';
import { PADDING, FONT_SIZE } from '../../constants/styles';
import { HINT_OF_PENSIVE } from '../../constants/colors';

const Input = styled.input`
  width: 100%;
  padding: ${PADDING}px;
  box-sizing: border-box;
  background: ${HINT_OF_PENSIVE};
  font-size: ${FONT_SIZE}px;
  border: none;
  outline: none;
`;

export default Input;
