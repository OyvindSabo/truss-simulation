import React from 'react';
import { ErrorScreenContainer, ThumbDownIcon, ErrorText } from './atoms';

interface ErrorScreenProps {
  children: string | JSX.Element;
}
const ErrorScreen = ({ children }: ErrorScreenProps) => (
  <ErrorScreenContainer>
    <ThumbDownIcon />
    <ErrorText>{children}</ErrorText>
  </ErrorScreenContainer>
);

export default ErrorScreen;
