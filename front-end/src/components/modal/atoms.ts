import styled from 'styled-components';
import { PADDING } from '../../constants/theme/styles';
import { HINT_OF_PENSIVE } from '../../constants/theme/colors';
import { MODAL_WIDTH } from '../../constants/config/sizes';

export const ModalBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  ${({ active }: { active: boolean }) => !active && 'display: none'}
  ${({ active }: { active: boolean }) => !active && 'pointer-events: none'};
`;

export const ModalBox = styled.div`
  position: fixed;
  background: white;
  padding: ${PADDING}px;
  outline: 1px solid ${HINT_OF_PENSIVE};
  margin: auto;
  width: ${MODAL_WIDTH}px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ active }: { active: boolean }) => !active && 'disblay: none'}
  ${({ active }: { active: boolean }) => !active && 'pointer-events: none'};
`;
