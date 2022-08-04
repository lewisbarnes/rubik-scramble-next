import { NextPageContext } from 'next';
import React from 'react';
import type  { Solve } from '../types/solve';
import { Scramble } from './scramble';
import { SolveItem } from './solveItem';

interface Props {
	solves: Array<Solve>;
}

interface State {
	currentSolves: Array<Solve>;
	isCollapsed: boolean;
}

export class SolveList extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = { currentSolves: props.solves, isCollapsed: true };
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if(prevProps.solves != this.state.currentSolves) {
			this.setState((state, props) => ({ currentSolves: this.props.solves, isCollapsed: state.isCollapsed }));
		}
	}

	render() {
		return (
			<div className='p-8'>
				<div className='pt-8'>
					<p className='font-fira'>last: {this.formatTime(this.state.currentSolves.length > 0 ? this.state.currentSolves[this.state.currentSolves.length -1].time : 0)}</p>
					<p className='font-fira'>best: {this.formatTime(this.state.currentSolves.length > 0 ? this.state.currentSolves.slice().sort((a, b) => { return a.time <= b.time ? -1 : 1})[0].time : 0)}</p>
					<p className='font-fira'>ao5: {this.state.currentSolves.length >= 5 ? this.formatTime(this.average(5)) : this.formatTime(0)}</p>
					<p className='font-fira'>ao12: {this.state.currentSolves.length >= 12 ? this.formatTime(this.average(12)) : this.formatTime(0)}</p>
				</div>
				<button onClick={this.toggleCollapsed.bind(this)} className='font-fira hover:text-yellow-500'>{`history ${this.state.isCollapsed ? String.fromCharCode(8594) : String.fromCharCode(8592)}`}</button>
				{this.state.currentSolves.length == 0 ? <p className={`${this.state.isCollapsed ? 'hidden' : ''} font-fira font-extralight`}>No Solves</p> :  this.state.currentSolves.reverse().map((solve, i) => {
					return (
						<SolveItem solve={solve} hidden={this.state.isCollapsed}/>
					);
				}
				)}
			</div>
		)
	}

	toggleCollapsed() {
		this.setState((state, props) => ({ currentSolves: state.currentSolves, isCollapsed: !state.isCollapsed }));
	}

	average(times: number) {
		this.state.currentSolves;
		let lastN = this.state.currentSolves.slice(-times).sort((a, b) => { return a.time <= b.time ? -1 : 1; });
		let bestNum = Math.ceil(lastN.length * 0.05);
		let bestN = lastN.slice(bestNum-1,(lastN.length-1)-bestNum);
		let average = 0;
		average = bestN.reduce((a, b) => { return a + b.time; }, average) / bestN.length;
		return average;
	}

	formatTime(pMilliseconds : number) {
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}