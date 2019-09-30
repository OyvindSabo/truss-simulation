import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpaceFrameVisualization from './components/spaceFrameVisualization/SpaceFrameVisualization';
import { SpaceFrameData } from './types';

const App: React.FC = () => {
  const spaceFrameData: SpaceFrameData = {
    nodes: [
      {
        id: '1',
        name: '1',
        x: 0,
        y: 0,
        z: 0,
      },
      {
        id: '2',
        name: '2',
        x: 1,
        y: 0,
        z: 0,
      },
      {
        id: '3',
        name: '3',
        x: 0.5,
        y: 1,
        z: 0,
      },
    ],
    struts: [
      {
        id: '12',
        name: '12',
        sourceId: '1',
        targetId: '2',
        radius: 0.1,
      },
      {
        id: '23',
        name: '23',
        sourceId: '2',
        targetId: '3',
        radius: 0.1,
      },
      {
        id: '31',
        name: '31',
        sourceId: '3',
        targetId: '1',
        radius: 0.1,
      },
    ],
  };
  return (
    <div className="App">
      <SpaceFrameVisualization spaceFrameData={spaceFrameData} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
