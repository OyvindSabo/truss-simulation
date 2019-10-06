import React from 'react';
import { Router, Route } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { ViewContainer } from './atoms';

interface ViewProps extends RouterProps {
  views: {
    path: string;
    component: React.FunctionComponent;
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

export default View;
