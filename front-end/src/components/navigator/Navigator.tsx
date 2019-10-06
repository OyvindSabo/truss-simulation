import React from 'react';
import { NavigatorContainer } from './atoms';
import { Router, Link } from 'react-router-dom';
import { RouterProps } from 'react-router';

interface NavigatorProps extends RouterProps {
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
    <Router history={history}>
      <ul>
        {views.map(({ path, label }) => (
          <li>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </Router>
  </NavigatorContainer>
);

export default Navigator;
