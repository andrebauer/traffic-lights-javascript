import React from 'react';
import { PedestrianCrossingController } from './controller/pedestrian-crossing-controller.js';
import { SimpleButton } from './input/simple-button.js'
import { SimplePedestrianCrossingLights, SimpleTrafficLights } from './viewmodel/simple-lights.js';
import { PedestrianCrossingLight, TrafficLight, Timer } from './components/TrafficLights.jsx';

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
