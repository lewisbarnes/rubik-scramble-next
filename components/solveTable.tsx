import React from 'react';
import type  { Solve } from '../models/solve';
import { getSolves } from '../utils/apiHelper';
import formatTime from '../utils/time';

interface Props {
}

interface State {
	currentSolves: Array<Solve>;
}

export class SolveTable extends React.Component<{}, State> {

	isLoading: boolean;

	constructor(props: {}, state: State) {
		super(props);
		this.state = {currentSolves: new Array<Solve>};
		this.isLoading = true;
	}

	async componentDidMount() {
		this.setState({currentSolves: await getSolves()});
		this.isLoading = false;
	}

	render() {
		return (
			this.isLoading ? 'loading solves...' :
				<div className='table overflow-auto max-w-full'>
					<div className="table-header-group">
						<div className='table-row'>
							<div className='table-cell px-4 text-right'>solve</div>
							<div className='table-cell px-4 text-right'>time</div>
							<div className='table-cell px-4 text-right'>ao5</div>
							<div className='table-cell px-4 text-right'>ao12</div>

							{/*<div className='table-cell px-4'>Scramble</div>*/}

						</div>
					</div>

					{
						this.state.currentSolves.length > 0 ? this.state.currentSolves.reverse().map((x,i) => {
							return (
							<div className='table-row'>
								<div className='table-cell px-4 text-right'>{this.state.currentSolves.length-i}</div>
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{formatTime(x.time)}</div>
								{/*<div className='table-cell px-4 text-left whitespace-pre-wrap'>{x.scramble.slice(0,-1).split(' ').map((x) =>  { return x.trim().padEnd(4, ' '); })}</div>*/}
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{formatTime(x.averageOfFive ? x.averageOfFive : 0)}</div>
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{formatTime(x.averageOfTwelve ? x.averageOfTwelve : 0)}</div>

							</div>);
						}) : ''
					}
				</div>
		)
	}
}