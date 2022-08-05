
import React from 'react';
import { Solve } from '../models/solve';
import { SolveComponent } from './solve';
import formatTime from '../utils/time';
import { getSolves } from '../utils/apiHelper';

interface State {
	currentSolves: Array<Solve>;
}

export class TimeStatsComponent extends React.Component<{}, State> {

	isLoading: boolean;

	constructor(props: {}, state: State) {
		super(props);
		this.isLoading = true;
		this.state = {currentSolves: new Array<Solve>()};
	}

	async componentDidMount() {
		this.setState({currentSolves: await getSolves()})
		this.isLoading = false;
	}

	render() {
		return (
			<div className='max-h-full mt-2 w-11/12 md:w-5/12 overflow-y-auto'>
				{
				this.isLoading ? 'Loading Stats...' :
				<div>
					<p className='font-fira'>last: {this.state.currentSolves.length > 0 ? this.state.currentSolves[this.state.currentSolves.length -1].getFormattedTime() : formatTime(0)}</p>
					<p className='font-fira'>best: {this.state.currentSolves.length > 0 ? this.state.currentSolves.slice().sort((a, b) => { return a.time <= b.time ? -1 : 1})[0].getFormattedTime() : formatTime(0)}</p>
					<p className='font-fira'>ao5: {this.state.currentSolves.length >= 5 ? formatTime(this.average(5)) : formatTime(0)}</p>
					<p className='font-fira'>ao12: {this.state.currentSolves.length >= 12 ? formatTime(this.average(12)) : formatTime(0)}</p>
				</div>
				}
			</div>
		)
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

	async addSolve(solve: Solve) {
		this.state.currentSolves.push(solve);
		this.setState({currentSolves: this.state.currentSolves });
		await fetch('/api/solves', { method: 'POST', body: JSON.stringify(solve)});
	}
}