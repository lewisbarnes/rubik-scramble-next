import React from 'react';
import { inspect } from 'util';
interface Props {
	stopCallback : Function;
}

interface State {
	startTime : number;
	endTime: number;
	time: number;
	lastTime: number;
	bestTime: number;
	running: boolean;
	dnf: boolean;
	inInspection: boolean;
	keydown: boolean;
	userInput: string;
	validInput: boolean;
	handler: Function;
}

class TimerComponent extends React.Component<Props, State> {

	timerID !: NodeJS.Timer | undefined;
	private timerRef : React.RefObject<HTMLParagraphElement>;

	constructor(props: Props) {
		super(props);
		this.state = {
			startTime: Date.now(),
			endTime: Date.now() + 15000,
			time: 0,
			lastTime: 0,
			bestTime: 0,
			running: false,
			dnf: false,
			inInspection: false,
			keydown: false,
			userInput: '',
			validInput: true,
			handler: props.stopCallback.bind(this)
		}
		props;
		this.timerID = undefined;
		this.timerRef = React.createRef<HTMLParagraphElement>();
	}

	async componentDidMount() {
		document.addEventListener('keydown', this.handleKeydown.bind(this), false);
		
		this.timerRef.current?.addEventListener('click', this.startStop.bind(this), false);
		this.timerRef = React.createRef<HTMLParagraphElement>();
		document.addEventListener('keyup', this.handleKeyup.bind(this), false);
	}


	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeydown.bind(this));
		document.removeEventListener('keyup', this.handleKeyup.bind(this));
		this.timerRef.current?.removeEventListener('click', this.startStop.bind(this), false);
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div className='select-none'>
				<p ref={this.timerRef} className={`${this.state.inInspection ? 'text-green-600' : ''} ${this.state.dnf ? 'text-red-800' : ''} ${this.state.validInput ? '' : 'text-red-800'} text-8xl font-dseg7`}>
					{ this.state.dnf ? 'DNF' : this.state.running ? this.formatTime(this.state.time) : this.state.userInput.length > 0 ? this.formatTime(this.timeToMillisecondsFromString(this.state.userInput.padStart(7,'0'))) : this.formatTime(this.state.time) }
				</p>
			</div>
		);
	}

	tick() {
		if(this.state.running == true) {
			let time = (this.state.inInspection ? this.state.endTime : Date.now()) - (!this.state.inInspection ? this.state.startTime : Date.now());
			let inInspection = this.state.inInspection;
			let running =  this.state.running == true;
			let dnf = this.state.dnf;
			if(inInspection && time <= 0) {
				dnf = true;
				running = false;
				inInspection = false;
				clearInterval(this.timerID);
			}
			
			this.setState((state, props) => (
				{ 
					startTime: state.startTime, 
					endTime: state.endTime, 
					time: time,
					lastTime: state.lastTime,
					running: running,
					dnf: dnf,
					inInspection: inInspection, 
					keydown: state.keydown,
					userInput: state.userInput,
					validInput: state.validInput,
				}
			));
		}

	}

	handleKeydown(event: KeyboardEvent) {
		let userInput = this.state.userInput;
		let validInput = this.state.validInput;
		if(this.state.keydown) { return; }
		else if(event.key == ' ') {
			userInput = '';
			this.startStop();
		} else if(event.key == 'Backspace') {
			userInput = userInput.substring(0,userInput.length-1);
			validInput = this.validateInput(userInput.padStart(7,'0'));
		}
		else if(event.key == 'Enter') {
			validInput = this.validateInput(userInput.padStart(7,'0'));
			if(validInput) {
				this.props.stopCallback(this.timeToMillisecondsFromString(userInput.padStart(7,'0')),'manual-input');
				userInput = '';
			}
		}
		else if(isFinite(parseInt(event.key))  && userInput.length != 7) {
			userInput += event.key;
			validInput = this.validateInput(userInput.padStart(7,'0'));
		}
		this.setState((state, props) => (
			{
				startTime: state.startTime,
				endTime: state.endTime, 
				time: state.time,
				lastTime: state.lastTime,
				bestTime: state.bestTime,
				running: state.running,
				dnf: state.dnf,
				inInspection: state.inInspection,
				keydown: true,
				userInput: userInput,
				validInput: validInput,
			}
		));
	}

	handleKeyup() {
		this.setState((state, _props) => (
			{
				startTime: state.startTime,
				endTime: state.endTime, 
				time: state.time,
				lastTime: state.lastTime,
				bestTime: state.bestTime,
				running: state.running,
				dnf: state.dnf,
				inInspection: state.inInspection,
				keydown: false,
				userInput: state.userInput,
				validInput: state.validInput,
			}
		));
	}

	validateInput(input: string) {
		return /[0-5]{1}[0-9]{1}[0-5]{1}[0-9]{1}[0-9]{3}/.test(input)
	}

	startStop() {
		let startTime = this.state.startTime;
		let endTime = this.state.endTime;
		let running = this.state.running;
		let dnf = this.state.dnf;
		let inInspection =  this.state.inInspection;
		let lastTime = this.state.lastTime;
		let bestTime = this.state.bestTime;
		if(!running) {
			if(!inInspection) {
				startTime = Date.now();
				endTime = Date.now() + 15000 ;
				inInspection = true;
			}
			running = true;
			this.timerID = setInterval(this.tick.bind(this), 100);
		} else {
			if(inInspection) {
				if(dnf) {
					dnf = false;
					inInspection = true;
					startTime = Date.now();
					endTime = Date.now() + 15000 ;
					running = true;
				}
				else {
					inInspection = false;
					startTime = Date.now();
				}
			} else {
				running = false;
				lastTime = this.state.time;
				bestTime = bestTime > 0 ? lastTime < bestTime ? lastTime : bestTime : lastTime;
				this.props.stopCallback.bind(this)(lastTime,'timer');
			}
		}
		this.setState((state, _props) => (
			{
				startTime: startTime,
				endTime: endTime, 
				time: state.time,
				lastTime: lastTime,
				bestTime: bestTime,
				running: running,
				dnf: dnf,
				inInspection: inInspection,
				keydown: state.keydown,
				userInput: '',
				validInput: state.validInput,
			}
		));
	}

	timeToMillisecondsFromString(timeString: string) {
		let mins = parseInt(timeString.slice(0,2),10) * (60 * 1000);
		let secs = parseInt(timeString.slice(2,4),10) * 1000;
		let millis = parseInt(timeString.slice(4),10);
		return mins + secs + millis;
	}

	formatTime(pMilliseconds : number) {8
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}

export default TimerComponent;