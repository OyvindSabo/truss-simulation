import styled from 'styled-components';
import { TOP_BAR_HEIGHT } from '../../constants/config/sizes';
import { PADDING } from '../../constants/theme/styles';
import { TOP_BAR_COLOR } from '../../constants/config/colors';

export const TopBarContainer = styled.div`
  height: ${TOP_BAR_HEIGHT}px;
  padding: 0 ${PADDING}px 0 ${PADDING}px;
  background: ${TOP_BAR_COLOR};
`;
