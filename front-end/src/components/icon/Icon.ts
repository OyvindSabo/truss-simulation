import styled from 'styled-components';
import { ICON_SIZE } from '../../constants/config/sizes';

interface IconProps {
  icon: string;
  color: string;
}
const Icon = styled.div<IconProps>`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  mask-image: url(${({ icon }) => icon});
  mask-size: ${ICON_SIZE}px ${ICON_SIZE}px;
  background: ${({ color }) => color};
`;

export default Icon;
