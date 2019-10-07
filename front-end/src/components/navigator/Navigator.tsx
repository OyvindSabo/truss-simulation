import React from 'react';
import { NavigatorContainer, Button } from './atoms';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

interface NavigatorProps extends RouteComponentProps {
  views: {
    path: string;
    component: React.FunctionComponent | any;
    label: string;
  }[];
}
const Navigator: React.FunctionComponent<NavigatorProps> = ({
  history,
  views,
}) => (
  <NavigatorContainer>
    {views.map(({ path, label }, key) => (
      <Button
        key={key}
        selected={history.location.pathname === path}
        onClick={() => history.push(path)}
      >
        {label}
      </Button>
    ))}
  </NavigatorContainer>
);

export default withRouter(Navigator);
