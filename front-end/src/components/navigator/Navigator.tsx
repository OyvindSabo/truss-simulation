import React from 'react';
import { NavigatorContainer, Button } from './atoms';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router';

interface NavigatorProps extends RouteComponentProps {
  views: {
    path: string;
    getPath: () => string;
    component: React.FunctionComponent | any;
    label: string;
    exact: boolean;
    strict: boolean;
  }[];
}
const Navigator: React.FunctionComponent<NavigatorProps> = ({
  history,
  views,
}) => (
  <NavigatorContainer>
    {views.map(({ path, getPath, label, exact, strict }, key) => {
      const match = matchPath(history.location.pathname, {
        path,
        exact,
        strict,
      });
      return (
        <Button
          key={key}
          selected={!!match && match.path === path}
          onClick={() => history.push(getPath())}
        >
          {label}
        </Button>
      );
    })}
  </NavigatorContainer>
);

export default withRouter(Navigator);
