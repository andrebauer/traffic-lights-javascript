/*
 * PedestrianCrossingController
 */
export let TLState = {
    Red: 'Red',
    Green: 'Green',
    Yellow: 'Yellow',
    RedYellow: 'Red-Yellow',
    Off: 'Off',
    Flash: 'Flash'
}

export let PCLState = {
    Red: 'Red',
    Green: 'Green',
    Off: 'Off'
}

export let PedestrianCrossingControllerState = {
    CarsCrossing: 'Cars Crossing ',
    TransitionCarsToPedestrains: 'Transition Cars to Pedestrains',
    PedestriansCrossing: 'Pedestrians Crossing',
    TransitionPedestriansToCars: 'Transition Pedestrians to Cars'
}

let timer = {
    default: 5,
    pedestrian: 15
}

export class PedestrianCrossingController {

    constructor() {
        this.state = PedestrianCrossingControllerState.CarsCrossing;
        this.timer = timer.default;
        this.pedestrianInput = null;
        this.trafficLight = null;
        this.pedestrianCrossingLight = null;
    }

    addPedestrianCrossingLight(pedestrianCrossingLight) {
        this.pedestrianCrossingLight = pedestrianCrossingLight
    }

    addPedestrianInput(pedestrianInput) {
        this.pedestrianInput = pedestrianInput;
    }

    addTrafficLight(trafficLight) {
        this.trafficLight = trafficLight;
    }

    run() {
        switch (this.state) {
            case PedestrianCrossingControllerState.CarsCrossing:
                if (this.pedestrianInput.isSet()) {
                    this.pedestrianInput.waitForSignal();
                    this.timer = timer.default;
                } else if (this.pedestrianInput.isWaitingForSignal()) {
                    if (this.timer === 0) {
                        this.state = PedestrianCrossingControllerState.TransitionCarsToPedestrains;
                    } else {
                        this.timer--;
                    }
                }
                break;

            case PedestrianCrossingControllerState.TransitionCarsToPedestrains:
                switch (this.trafficLight.state) {
                    case TLState.Green:
                        this.trafficLight.turn(TLState.Yellow);
                        this.timer = timer.default;
                        break;

                    case TLState.Yellow:
                        if (this.timer === 0) {
                            this.trafficLight.turn(TLState.Red);
                            this.timer = timer.default;
                        } else {
                            this.timer--;
                        }
                        break;

                    case TLState.Red:
                        if (this.timer === 0) {
                            this.pedestrianCrossingLight.turn(PCLState.Green)
                            this.pedestrianInput.pause();
                            this.state = PedestrianCrossingControllerState.PedestriansCrossing;
                            this.timer = timer.pedestrian;
                        } else {
                            this.timer--;
                        }
                        break;
                }

                break;

            case PedestrianCrossingControllerState.PedestriansCrossing:
                if (this.timer === 0) {
                    this.state = PedestrianCrossingControllerState.TransitionPedestriansToCars;
                } else {
                    this.timer--;
                }
                break;

            case PedestrianCrossingControllerState.TransitionPedestriansToCars:
                if (this.pedestrianCrossingLight.state === PCLState.Green) {
                    this.pedestrianCrossingLight.turn(PCLState.Red);
                    this.timer = timer.default;
                    this.pedestrianInput.resume();
                } else {
                    if (this.trafficLight.state === TLState.Red) {
                        if (this.timer === 0) {
                            this.trafficLight.turn(TLState.RedYellow);
                            this.timer = timer.default;
                        } else {
                            this.timer--;
                        }
                    } else if (this.trafficLight.state === TLState.RedYellow) {
                        if (this.timer === 0) {
                            this.trafficLight.turn(TLState.Green);
                            this.state = PedestrianCrossingControllerState.CarsCrossing;
                        } else {
                            this.timer--;
                        }
                    }
                }
                break;
        }
    }
}