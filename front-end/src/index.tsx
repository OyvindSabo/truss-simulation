import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './views/home/Home';
import Structures from './views/structures/Structures';
import StructureView from './views/structureView/StructureView';
import Experiments from './views/experiments/Experiments';
import ExperimentView from './views/experimentView/ExperimentView';
import Navigator from './components/navigator/Navigator';
import { createBrowserHistory } from 'history';
import MainContainer from './components/mainContainer/MainContainer';
import View from './components/view/View';
import { Router } from 'react-router-dom';
import Monitoring from './views/monitoring/Monitoring';
import { state } from './state';

const history = createBrowserHistory();
const views = [
  {
    path: '/',
    getPath: () => '/',
    label: 'HOME',
    component: Home,
    exact: true,
    strict: false,
  },
  {
    path: '/structures/',
    getPath: () => '/structures/',
    label: 'STRUCTURES',
    component: Structures,
    exact: true,
    strict: false,
  },
  {
    path: '/structures/:structureId/',
    getPath: () => `/structures/${state.getSelectedStructureId()}/`,
    label: 'ACTIVE STRUCTURE',
    component: StructureView,
    exact: true,
    strict: false,
  },
  {
    path: '/experiments/',
    getPath: () => '/experiments/',
    label: 'EXPERIMENTS',
    component: Experiments,
    exact: true,
    strict: false,
  },
  {
    path: '/experiments/:experimentId/',
    getPath: () => `/experiments/${state.getSelectedExperimentId()}/`,
    label: 'ACTIVE EXPERIMENT',
    component: ExperimentView,
    exact: true,
    strict: false,
  },
  {
    path: '/monitoring/:monitoringId/',
    getPath: () => `/monitoring/${state.getSelectedMonitorId()}/`,
    label: 'MONITORING',
    component: Monitoring,
    exact: true,
    strict: false,
  },
];
state.load();
const App = () => {
  return (
    <MainContainer>
      <Router history={history}>
        <Navigator views={views} />;
        <View views={views} />
      </Router>
    </MainContainer>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
