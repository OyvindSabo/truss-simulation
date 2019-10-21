import React from 'react';
import styled from 'styled-components';
import { STRUCTURE_EDITOR_HEADER_HEIGHT } from '../../../constants/config/sizes';
import { BORDER_WIDTH, MARGIN } from '../../../constants/theme/styles';
import { HINT_OF_PENSIVE } from '../../../constants/theme/colors';
import CenterVertically from '../../../components/center/CenterVertically';

export const StructureEditorHeaderContainer = styled.div`
  height: ${STRUCTURE_EDITOR_HEADER_HEIGHT}px;
  border-bottom: ${BORDER_WIDTH}px solid ${HINT_OF_PENSIVE};
`;

export const StructureEditorHeaderContent = styled.div`
  height: 100%;
  margin-left: ${MARGIN}px;
`;

interface StructureEditorHeaderProps {
  children: any;
}
export const StructureEditorHeader = ({
  children,
}: StructureEditorHeaderProps) => (
  <StructureEditorHeaderContainer>
    <StructureEditorHeaderContent>
      <CenterVertically>{children}</CenterVertically>
    </StructureEditorHeaderContent>
  </StructureEditorHeaderContainer>
);
