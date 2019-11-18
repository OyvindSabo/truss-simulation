import React from 'react';
import styled from 'styled-components';
import { EXPERIMENT_EDITOR_HEADER_HEIGHT } from '../../../constants/config/sizes';
import { BORDER_WIDTH, MARGIN } from '../../../constants/theme/styles';
import { HINT_OF_PENSIVE } from '../../../constants/theme/colors';
import CenterVertically from '../../../components/center/CenterVertically';

export const ExperimentEditorHeaderContainer = styled.div`
  height: ${EXPERIMENT_EDITOR_HEADER_HEIGHT}px;
  border-bottom: ${BORDER_WIDTH}px solid ${HINT_OF_PENSIVE};
`;

export const ExperimentEditorHeaderContent = styled.div`
  height: 100%;
  margin-left: ${MARGIN}px;
`;

interface ExperimentEditorHeaderProps {
  children: any;
}
export const ExperimentEditorHeader = ({
  children,
}: ExperimentEditorHeaderProps) => (
  <ExperimentEditorHeaderContainer>
    <ExperimentEditorHeaderContent>
      <CenterVertically>{children}</CenterVertically>
    </ExperimentEditorHeaderContent>
  </ExperimentEditorHeaderContainer>
);
