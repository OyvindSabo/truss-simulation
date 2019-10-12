import styled from 'styled-components';
import { HINT_OF_PENSIVE } from '../../constants/colors';
import { PADDING } from '../../constants/styles';
import { MODAL_WIDTH } from '../../constants/sizes';

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
