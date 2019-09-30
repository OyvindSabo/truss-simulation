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
        x: 10,
        y: 0,
        z: 10,
      },
      {
        id: '4',
        name: '4',
        x: 0,
        y: 0,
        z: 10,
      },
      {
        id: '5',
        name: '5',
        x: 0,
        y: 10,
        z: 0,
      },
      {
        id: '6',
        name: '6',
        x: 10,
        y: 10,
        z: 0,
      },
      {
        id: '7',
        name: '7',
        x: 10,
        y: 10,
        z: 10,
      },
      {
        id: '8',
        name: '8',
        x: 0,
        y: 10,
        z: 10,
      },
      {
        id: '9',
        name: '9',
        x: 0,
        y: 20,
        z: 0,
      },
      {
        id: '10',
        name: '10',
        x: 10,
        y: 20,
        z: 0,
      },
      {
        id: '11',
        name: '11',
        x: 10,
        y: 20,
        z: 10,
      },
      {
        id: '12',
        name: '12',
        x: 0,
        y: 20,
        z: 10,
      },
      {
        id: '13',
        name: '13',
        x: 20,
        y: 10,
        z: 0,
      },
      {
        id: '14',
        name: '14',
        x: 20,
        y: 10,
        z: 10,
      },
      {
        id: '15',
        name: '15',
        x: 20,
        y: 20,
        z: 10,
      },
      {
        id: '16',
        name: '16',
        x: 20,
        y: 20,
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
        id: '15',
        name: '15',
        sourceId: '1',
        targetId: '5',
        radius: 0.1,
      },
      {
        id: '16',
        name: '16',
        sourceId: '1',
        targetId: '6',
        radius: 0.1,
      },
      {
        id: '18',
        name: '18',
        sourceId: '1',
        targetId: '8',
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
        id: '26',
        name: '26',
        sourceId: '2',
        targetId: '6',
        radius: 0.1,
      },
      {
        id: '34',
        name: '34',
        sourceId: '3',
        targetId: '4',
        radius: 0.1,
      },
      {
        id: '36',
        name: '36',
        sourceId: '3',
        targetId: '6',
        radius: 0.1,
      },
      {
        id: '38',
        name: '38',
        sourceId: '3',
        targetId: '8',
        radius: 0.1,
      },
      {
        id: '48',
        name: '48',
        sourceId: '4',
        targetId: '8',
        radius: 0.1,
      },
      {
        id: '37',
        name: '37',
        sourceId: '3',
        targetId: '7',
        radius: 0.1,
      },
      {
        id: '56',
        name: '56',
        sourceId: '5',
        targetId: '6',
        radius: 0.1,
      },
      {
        id: '58',
        name: '58',
        sourceId: '5',
        targetId: '8',
        radius: 0.1,
      },
      {
        id: '59',
        name: '59',
        sourceId: '5',
        targetId: '9',
        radius: 0.1,
      },
      {
        id: '67',
        name: '67',
        sourceId: '6',
        targetId: '7',
        radius: 0.1,
      },
      {
        id: '68',
        name: '68',
        sourceId: '6',
        targetId: '8',
        radius: 0.1,
      },
      {
        id: '69',
        name: '69',
        sourceId: '6',
        targetId: '9',
        radius: 0.1,
      },
      {
        id: '610',
        name: '610',
        sourceId: '6',
        targetId: '10',
        radius: 0.1,
      },
      {
        id: '611',
        name: '611',
        sourceId: '6',
        targetId: '11',
        radius: 0.1,
      },
      {
        id: '613',
        name: '613',
        sourceId: '6',
        targetId: '13',
        radius: 0.1,
      },
      {
        id: '616',
        name: '616',
        sourceId: '6',
        targetId: '16',
        radius: 0.1,
      },
      {
        id: '78',
        name: '78',
        sourceId: '7',
        targetId: '8',
        radius: 0.1,
      },
      {
        id: '711',
        name: '711',
        sourceId: '7',
        targetId: '11',
        radius: 0.1,
      },
      {
        id: '89',
        name: '89',
        sourceId: '8',
        targetId: '9',
        radius: 0.1,
      },
      {
        id: '811',
        name: '811',
        sourceId: '8',
        targetId: '11',
        radius: 0.1,
      },
      {
        id: '812',
        name: '812',
        sourceId: '8',
        targetId: '12',
        radius: 0.1,
      },
      {
        id: '910',
        name: '910',
        sourceId: '9',
        targetId: '10',
        radius: 0.1,
      },
      {
        id: '912',
        name: '912',
        sourceId: '9',
        targetId: '12',
        radius: 0.1,
      },
      {
        id: '1011',
        name: '1011',
        sourceId: '10',
        targetId: '11',
        radius: 0.1,
      },
      {
        id: '1016',
        name: '1016',
        sourceId: '10',
        targetId: '16',
        radius: 0.1,
      },
      {
        id: '1112',
        name: '1112',
        sourceId: '11',
        targetId: '12',
        radius: 0.1,
      },
      {
        id: '1114',
        name: '1114',
        sourceId: '11',
        targetId: '14',
        radius: 0.1,
      },
      {
        id: '1115',
        name: '1115',
        sourceId: '11',
        targetId: '15',
        radius: 0.1,
      },
      {
        id: '1116',
        name: '1116',
        sourceId: '11',
        targetId: '16',
        radius: 0.1,
      },
      {
        id: '1314',
        name: '1314',
        sourceId: '13',
        targetId: '14',
        radius: 0.1,
      },
      {
        id: '1316',
        name: '1316',
        sourceId: '13',
        targetId: '16',
        radius: 0.1,
      },
      {
        id: '146',
        name: '146',
        sourceId: '14',
        targetId: '6',
        radius: 0.1,
      },
      {
        id: '147',
        name: '147',
        sourceId: '14',
        targetId: '7',
        radius: 0.1,
      },
      {
        id: '1415',
        name: '1415',
        sourceId: '14',
        targetId: '15',
        radius: 0.1,
      },
      {
        id: '1416',
        name: '1416',
        sourceId: '14',
        targetId: '16',
        radius: 0.1,
      },
      {
        id: '1516',
        name: '1516',
        sourceId: '15',
        targetId: '16',
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
