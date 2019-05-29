import React from 'react';
import './App.css';
import { TLState, PCLState, PedestrianCrossingController } from './controller/pedestrian-crossing-controller.js';
import { SimpleButton } from './input/simple-button.js'
import { SimplePedestrianCrossingLights, SimpleTrafficLights } from './viewmodel/simple-lights.js';

let pcc1 = new PedestrianCrossingController();
let sb1 = new SimpleButton('sb1');
pcc1.addPedestrianInput(sb1);
let spcl1 = new SimplePedestrianCrossingLights('spcl1');
pcc1.addPedestrianCrossingLight(spcl1);
let stl1 = new SimpleTrafficLights('stl1');
pcc1.addTrafficLight(stl1);

function Light(props) {
  return (<div className={`${props.condition} w-8 h-8 ${props.margins} rounded-full`}></div>);
}

function PedestrianCrossingSignals(props) {
  return (
    <div className="bg-black w-12 p-2 rounded">
      <Light margins='mb-2' condition={props.model.state === PCLState.Red ? 'bg-red-500' : 'bg-red-900'} />
      <Light margins='mt-2' condition={props.model.state === PCLState.Green ? 'bg-green-500' : 'bg-green-900'} />
    </div>);
}

function PedestrianInputDisplay(props) {
  return (<div className="bg-red-900 rounded text-red-100 font-bold w-8 h-6 p-1" style={{ fontSize: '.4rem' }}>
    <div className="text-center">
      {props.model.isWaitingForSignal() ? 'Signal kommt' : ''}
    </div>
  </div>)
}

function PedestrianInputButton(props) {
  return (
    <button
      className="border-black bg-yellow-400 hover:bg-yellow-500 border-2 rounded w-8 h-6 mx-auto"
      onClick={props.model.push}
    >
    </button>)
}

function PedestrianInput(props) {
  return (
    <div className="bg-yellow-400 rounded mx-auto w-10 p-1 py-1">
      <PedestrianInputDisplay model={props.model} />
      <PedestrianInputButton model={props.model} />
    </div>)
}

function Stick(props) {
  return (
    <div className={`bg-gray-600 w-4 h-${props.height} mx-auto`} >
    </div>);
}

function PedestrianCrossingLight(props) {
  return (
    <div className="absolute bottom-0 left-0">
      <PedestrianCrossingSignals model={props.model} />
      <Stick height='24' />
      <PedestrianInput model={props.input} />
      <Stick height='32' />
    </div>
  )
}

function TrafficSignal(props) {
  return (
    <div className="bg-black rounded w-12 h-32 p-2 ">
      <Light margins='mb-2' condition={props.model.state === TLState.Red || props.model.state === TLState.RedYellow ? 'bg-red-500' : 'bg-red-900'} />
      <Light margins='mb-2 mt-2' condition={props.model.state === TLState.Yellow || props.model.state === TLState.RedYellow ? 'bg-yellow-500' : 'bg-yellow-900'} />
      <Light margins='mb-t' condition={props.model.state === TLState.Green ? 'bg-green-500' : 'bg-green-900'} />
    </div>
  );
}

function TrafficLight(props) {
  return (
    <div >
      <TrafficSignal model={props.model} />
      <Stick height='64' />
    </div>
  );
}

function Timer(props) {
  return (
    <span className="bg-gray-800 rounded w-8 text-right absolute px-2 bottom-0 text-white">
      {props.model}
    </span>
  );
}

function App() {
  pcc1.run();

  return (
    <div className="bg-gray-100 w-48 mt-4 h-full mx-auto">
      <div className="flex">
        <div className="mr-12 relative w-12" >
          <PedestrianCrossingLight model={spcl1} input={sb1} />
        </div>
        <div className="relative w-12">
          <TrafficLight model={stl1} />
        </div>
        <div className="relative w-12 ml-4">
          <Timer model={pcc1.timer} />
        </div>
      </div>
    </div >
  );
}

export default App;
