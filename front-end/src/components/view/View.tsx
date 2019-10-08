import React from 'react';
import { Router, Route, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ViewContainer } from './atoms';

interface ViewProps extends RouteComponentProps {
  views: {
    path: string;
    getPath: () => string;
    component: React.FunctionComponent | any;
    label: string;
    exact: boolean;
    strict: boolean;
  }[];
}
const View: React.FunctionComponent<ViewProps> = ({ history, views }) => (
  <ViewContainer>
    <Router history={history}>
      {views.map(({ path, component, exact, strict }, key) => (
        <Route
          key={key}
          exact={exact}
          strict={strict}
          path={path}
          component={component}
        />
      ))}
    </Router>
  </ViewContainer>
);

export default withRouter(View);
