import { NextPageContext } from 'next';
import React from 'react'

interface State {
	startTime : number;
	time: string;
	timerID : NodeJS.Timer | undefined;
	running: boolean;
	inInspection: boolean;
}

export class Timer extends React.Component<{}, State> {

	timerID !: NodeJS.Timer | undefined;
	startTime : number = 0;

	constructor(props: {}) {
		super(props);
		this.state = {
			startTime: Date.now(), 
			time: '00.000',
			timerID: undefined,
			running: false,
			inInspection: false
		}
		this.startTime = Date.now();
		this.timerID = undefined;
	}

	getInitialProps({ req }: NextPageContext) {
		
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		return <button className={`${this.state.inInspection ? 'text-green-400' : ''} text-9xl font-dseg7`} onClick={this.startStop.bind(this)}>{this.state.time}</button>
	}

	tick() {
			if(this.state.running) {
				this.setState((state, props) => ({ startTime: state.startTime, time: this.formatTime(Date.now() - state.startTime) , timerID: state.timerID, running: state.running,inInspection: state.inInspection}));
			}
	}

	startStop() {
		if(this.state.running) {
			clearInterval(this.state.timerID);
		}
		else {
			this.timerID = setInterval(this.tick.bind(this), 1);
		}
		
		this.setState((state, props) => ({ startTime: Date.now(), time: this.formatTime(Date.now() - state.startTime), timerID: this.timerID, running: !state.running, inInspection: state.inInspection}));
	}

	formatTime(pMilliseconds : number) {
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}