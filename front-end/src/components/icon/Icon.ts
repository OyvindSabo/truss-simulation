import styled from 'styled-components';
import { ICON_SIZE } from '../../constants/config/sizes';

interface IconProps {
  icon: string;
  color: string;
  onClick?: () => void;
}
const Icon = styled.div<IconProps>`
  display: inline-block;
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  mask-image: url(${({ icon }) => icon});
  mask-size: ${ICON_SIZE}px ${ICON_SIZE}px;
  background: ${({ color }) => color};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
`;

export default Icon;
