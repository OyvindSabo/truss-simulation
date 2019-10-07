import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './views/home/Home';
import Structures from './views/structures/Structures';
import Structure from './views/structure/Structure';
import Experiments from './views/experiments/Experiments';
import Experiment from './views/experiment/Experiment';
import Navigator from './components/navigator/Navigator';
import { createBrowserHistory } from 'history';
import MainContainer from './components/mainContainer/MainContainer';
import View from './components/view/View';
import { Router } from 'react-router-dom';
import Monitoring from './views/monitoring/Monitoring';
import { state } from './state';
import { loadStructures } from './services/structures/structures';
import { loadSelectedStructureId } from './services/structure/structure';

const history = createBrowserHistory();
const views = [
  {
    path: '/',
    label: 'HOME',
    component: Home,
  },
  {
    path: '/structures/',
    label: 'STRUCTURES',
    component: Structures,
  },
  {
    path: '/structures/:structureId/',
    label: 'ACTIVE STRUCTURE',
    component: Structure,
  },
  {
    path: '/experiments/',
    label: 'EXPERIMENTS',
    component: Experiments,
  },
  {
    path: '/experiments/:experimentId/',
    label: 'ACTIVE EXPERIMENT',
    component: Experiment,
  },
  {
    path: '/monitoring/:monitoringId/',
    label: 'MONITORING',
    component: Monitoring,
  },
];
state.setStructures(loadStructures());
state.setSelectedStructureId(loadSelectedStructureId());
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
