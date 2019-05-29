/*
 * SimplePedestrianCroosingLights and SimpleTrafficLights
 */

import { TLState, PCLState } from '../controller/pedestrian-crossing-controller.js'

export class SimplePedestrianCrossingLights {
    constructor(name) {
        this.name = name;
        this.state = PCLState.Red;
    }

    turn(state) {
        this.state = state;
        console.log(this)
    }
}

export class SimpleTrafficLights {
    constructor(name) {
        this.name = name;
        this.state = TLState.Green;
    }

    turn(state) {
        this.state = state;
        console.log(this);
    }
}