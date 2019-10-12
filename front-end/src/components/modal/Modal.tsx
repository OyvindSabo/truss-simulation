import React from 'react';
import { ModalBackground, ModalBox } from './atoms';
import { OnClick } from '../../types';

interface ModalProps {
  active: boolean;
  children: JSX.Element[];
  onOutsideClick: OnClick;
}
const Modal = ({ active, children, onOutsideClick }: ModalProps) => (
  <ModalBackground active={active} onClick={onOutsideClick}>
    <ModalBox active={active} onClick={event => event.stopPropagation()}>
      {children}
    </ModalBox>
  </ModalBackground>
);

export default Modal;
