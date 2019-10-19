import React from 'react';
import Center from '../center/Center';
import { SelectionMarker, OptionButton, SwitchContainer } from './atoms';

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
  const selectedLabel = firstOptionSelected
    ? options.first.label
    : options.second.label;
  return (
    <SwitchContainer>
      <OptionButton onClick={() => onClick(true)}>
        <Center>{options.first.label}</Center>
      </OptionButton>
      <OptionButton onClick={() => onClick(false)}>
        <Center>{options.second.label}</Center>
      </OptionButton>
      <SelectionMarker firstOptionSelected={firstOptionSelected}>
        <Center>{selectedLabel}</Center>
      </SelectionMarker>
    </SwitchContainer>
  );
};

export default Switch;
