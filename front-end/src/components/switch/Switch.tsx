import React from 'react';
import { BUTTON_WIDTH, BUTTON_HEIGHT } from '../../constants/config/sizes';
import Center from '../center/Center';
import { PROTOSS_PYLON } from '../../constants/theme/colors';
import { TRANSITION } from '../../constants/theme/styles';

interface SwitchProps<value> {
  options: {
    first: { label: string; value: value };
    second: { label: string; value: value };
  };
  firstOptionSelected: boolean;
  onClick: (fitstOptionIsSelected: boolean) => void;
}
const Switch = ({
  options,
  firstOptionSelected,
  onClick,
}: SwitchProps<any>) => {
  return (
    <div
      style={{ width: `${2 * BUTTON_WIDTH}px`, height: `${BUTTON_HEIGHT}px` }}
    >
      <div
        style={{
          width: `${BUTTON_WIDTH}px`,
          height: '100%',
          boxSizing: 'border-box',
          background: `${PROTOSS_PYLON}`,
          position: 'absolute',
          transform: `translate(${
            firstOptionSelected ? 0 : BUTTON_WIDTH
          }px, 0)`,
          transition: `${TRANSITION}s`,
        }}
      ></div>
      <div
        onClick={() => onClick(true)}
        style={{
          width: `${BUTTON_WIDTH}px`,
          height: `${BUTTON_HEIGHT}px`,
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Center>{options.first.label}</Center>
      </div>
      <div
        onClick={() => onClick(false)}
        style={{
          width: `${BUTTON_WIDTH}px`,
          height: `${BUTTON_HEIGHT}px`,
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Center>{options.second.label}</Center>
      </div>
    </div>
  );
};

export default Switch;
