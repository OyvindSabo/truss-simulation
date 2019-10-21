import styled from 'styled-components';
import { ButtonType } from './types';
import {
  PROTOSS_PYLON,
  NASTURCIAN_FLOWER,
  VANADYL_BLUE,
  HARLEY_DAVIDSON_ORANGE,
  HINT_OF_PENSIVE,
  LYNX_WHITE,
} from '../../constants/theme/colors';
import { PADDING, TRANSITION } from '../../constants/theme/styles';

const buttonColor = new Map([
  [ButtonType.Primary, PROTOSS_PYLON],
  [ButtonType.Danger, NASTURCIAN_FLOWER],
]);

const highlightedButtonColor = new Map([
  [ButtonType.Primary, VANADYL_BLUE],
  [ButtonType.Danger, HARLEY_DAVIDSON_ORANGE],
]);

interface ButtonProps {
  buttonType: ButtonType;
  children: any;
}
const Button = styled.div<ButtonProps>`
  padding: ${PADDING}px;
  display: inline-block;
  box-sizing: border-box;
  background: ${({ buttonType }) =>
    buttonColor.get(buttonType) || HINT_OF_PENSIVE};
  transition: ${TRANSITION}s;
  cursor: pointer;
  color: ${LYNX_WHITE};
  &:hover {
    background: ${({ buttonType }) =>
      highlightedButtonColor.get(buttonType) || HINT_OF_PENSIVE};
  }
`;

export default Button;
