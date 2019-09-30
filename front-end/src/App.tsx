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
        x: 10,
        y: 0,
        z: 0,
      },
      {
        id: '3',
        name: '3',
        x: 5,
        y: 10,
        z: 0,
      },
      {
        id: '4',
        name: '4',
        x: 5,
        y: 0,
        z: 10,
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
        id: '13',
        name: '13',
        sourceId: '1',
        targetId: '3',
        radius: 0.1,
      },
      {
        id: '14',
        name: '14',
        sourceId: '1',
        targetId: '4',
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
        id: '24',
        name: '24',
        sourceId: '2',
        targetId: '4',
        radius: 0.1,
      },
      {
        id: '34',
        name: '34',
        sourceId: '3',
        targetId: '4',
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
