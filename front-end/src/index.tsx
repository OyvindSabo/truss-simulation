import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './views/home/Home';
import Structures from './views/structures/Structures';
import Structure from './views/structure/Structure';
import Experiments from './views/experiments/Experiments';
import Experiment from './Experiment';
import Navigator from './components/navigator/Navigator';
import { createBrowserHistory } from 'history';
import MainContainer from './components/mainContainer/MainContainer';
import View from './components/view/View';
import { Router } from 'react-router-dom';

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
];
const Index = () => {
  return (
    <MainContainer>
      <Router history={history}>
        <Navigator views={views} />;
        <View views={views} history={history} />
      </Router>
    </MainContainer>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
