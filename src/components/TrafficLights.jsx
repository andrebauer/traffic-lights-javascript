import React from 'react';
import { TLState, PCLState } from '../controller/pedestrian-crossing-controller';

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

export function PedestrianCrossingLight(props) {
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

export function TrafficLight(props) {
    return (
        <div >
            <TrafficSignal model={props.model} />
            <Stick height='64' />
        </div>
    );
}

export function Timer(props) {
    return (
        <span className="bg-gray-800 rounded w-8 text-right absolute px-2 bottom-0 text-white">
            {props.model}
        </span>
    );
}
