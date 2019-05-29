import React from 'react';
import './App.css';
import { SimpleButton, TLState, PCLState, PedestrianCrossingController, SimplePedestrianCrossingLights, SimpleTrafficLights } from './tl.js';

let pcc1 = new PedestrianCrossingController();
let sb1 = new SimpleButton('sb1');
pcc1.addPedestrianInput(sb1);
let spcl1 = new SimplePedestrianCrossingLights('spcl1');
pcc1.addPedestrianCrossingLight(spcl1);
let stl1 = new SimpleTrafficLights('stl1');
pcc1.addTrafficLight(stl1);

function App() {
  pcc1.run();

  return (
    <div className="bg-gray-100 w-48 mt-4 h-full mx-auto">
      <div className="flex">
        <div className="mr-12 relative w-12">
          <div className="absolute bottom-0 left-0">
            <div className="bg-black w-12 p-2 rounded">
              <div className={(spcl1.state === PCLState.Red ? 'bg-red-500' : 'bg-red-900') + " w-8 h-8 mb-2 rounded-full"}></div>
              <div className={(spcl1.state === PCLState.Green ? 'bg-green-500' : 'bg-green-900') + " w-8 h-8 mt-2 rounded-full"}></div>
            </div>
            <div className="bg-gray-600 w-4 h-24 mx-auto">
            </div>
            <div className="bg-yellow-400 rounded mx-auto w-10 p-1 py-1">
              <div className="bg-red-900 rounded text-red-100 font-bold w-8 h-6 p-1" style={{ fontSize: '.4rem' }}>
                <div className="text-center">
                  {sb1.isPaused() && spcl1.state === PCLState.Red ? 'Signal kommt' : ''}
                </div>
              </div>
              <button
                className="border-black bg-yellow-400 hover:bg-yellow-500 border-2 rounded w-8 h-6 mx-auto"
                onClick={sb1.push}
              >
              </button>
            </div>
            <div className="bg-gray-600 w-4 h-32 mx-auto">
            </div>
          </div>
        </div>
        <span className="relative w-12">
          <div className="">
            <div className="bg-black rounded w-12 h-32 p-2 ">
              <div className={(stl1.state === TLState.Red || stl1.state === TLState.RedYellow ? 'bg-red-500' : 'bg-red-900') + " w-8 h-8 mb-2 rounded-full"}></div>
              <div className={(stl1.state === TLState.Yellow || stl1.state === TLState.RedYellow ? 'bg-yellow-500' : 'bg-yellow-900') + " w-8 h-8 my-2 rounded-full"}></div>
              <div className={(stl1.state === TLState.Green ? 'bg-green-500' : 'bg-green-900') + " w-8 h-8 mt-2 rounded-full"}></div>
            </div>
            <div className="bg-gray-600 w-4 h-64 mx-auto align-bottom">

            </div>
          </div>
        </span>
        <span className="relative w-12 ml-4">
          <div className="bg-gray-800 rounded w-8 text-right absolute px-2 bottom-0 text-white">
            {pcc1.timer}
          </div>
        </span>
      </div>
    </div >
  );
}

export default App;
