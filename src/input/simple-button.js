/*
 *  SimpleButton
 */

let SimpleButtonState = {
    Pushed: 'Pushed',
    Resumed: 'Resumed',
    WaitForSignal: 'Wait for Signal',
    Paused: 'Paused'
}

export class SimpleButton {

    constructor(name) {
        this.state = SimpleButtonState.Resumed;
        this.name = name;
        this.push = this.push.bind(this)
    }

    isSet() {
        return this.state === SimpleButtonState.Pushed;
    }

    isPaused() {
        return this.state === SimpleButtonState.Paused;
    }

    isWaitingForSignal() {
        return this.state === SimpleButtonState.WaitForSignal;
    }

    waitforSignal() {
        this.state = SimpleButtonState.WaitForSignal;
        console.log(this);
    }

    pause() {
        this.state = SimpleButtonState.Paused;
        console.log(this);
    }

    resume() {
        this.state = SimpleButtonState.Resumed;
        console.log(this)
    }

    push() {
        if (this.state === SimpleButtonState.Resumed) {
            this.state = SimpleButtonState.Pushed;
            console.log(this);
        }
    }
}