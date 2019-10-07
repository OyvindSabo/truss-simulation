import React from 'react';
import { Router, Route, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ViewContainer } from './atoms';

interface ViewProps extends RouteComponentProps {
  views: {
    path: string;
    component: React.FunctionComponent | any;
    label: string;
  }[];
}
const View: React.FunctionComponent<ViewProps> = ({ history, views }) => (
  <ViewContainer>
    <Router history={history}>
      {views.map(({ path, component }, key) => (
        <Route key={key} exact path={path} component={component} />
      ))}
    </Router>
  </ViewContainer>
);

export default withRouter(View);
