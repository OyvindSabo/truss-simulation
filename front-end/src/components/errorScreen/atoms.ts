import styled from 'styled-components';
import {
  ERROR_SCREEN_BACKGROUND,
  ERROR_SCREEN_ICON_COLOR,
  Error_SCREEN_TEXT_COLOR,
} from '../../constants/config/colors';
import { ERROR_SCREEN_ICON_SIZE } from '../../constants/config/sizes';
import thumbDownIcon from '../../assets/icons/thumb-down-icon.png';

export const ErrorScreenContainer = styled.div`
  position: fixed;
  background: ${ERROR_SCREEN_BACKGROUND};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
`;

export const ThumbDownIcon = styled.div`
  position: fixed;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 0);
  height: ${ERROR_SCREEN_ICON_SIZE}px;
  width: ${ERROR_SCREEN_ICON_SIZE}px;
  mask-image: url(${thumbDownIcon});
  mask-size: ${ERROR_SCREEN_ICON_SIZE}px ${ERROR_SCREEN_ICON_SIZE}px;
  background: ${ERROR_SCREEN_ICON_COLOR};
`;

export const ErrorText = styled.h1`
  position: fixed;
  width: 100%;
  text-align: center;
  color: ${Error_SCREEN_TEXT_COLOR};
  margin-bottom: 50vh;
  top: 50%;
`;
