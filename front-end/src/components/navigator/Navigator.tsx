import React from 'react';
import { NavigatorContainer, Button } from './atoms';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

interface NavigatorProps extends RouteComponentProps {
  views: {
    path: string;
    component: React.FunctionComponent;
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
        onClick={() => {
          console.log('history.location.pathname: ', history.location.pathname);
          console.log('path: ', path);
          console.log(history.location.pathname === path);
          history.push(path);
        }}
      >
        {label}
      </Button>
    ))}
  </NavigatorContainer>
);

export default withRouter(Navigator);
