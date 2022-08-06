
import React from 'react';
import { Solve } from '../models/solve';
import { SolveComponent } from './solve';
import { formatTime, averageTime } from '../utils/time';
import { getSolves } from '../utils/apiHelper';
import { SolveCollection } from '../models/solveCollection';

interface Props {
	Data: Array<Solve>;
}

interface State {
	solveData: SolveCollection;
}

export class TimeStatsComponent extends React.Component<Props,State> {

	constructor(props: Props) {
		super(props);
		this.state = {solveData:  new SolveCollection(this.props.Data)};
	}

	componentDidMount() {
		this.setState({solveData: new SolveCollection(this.props.Data)});
	}

	render() {
		return (
			<div className='max-h-full mt-2 w-11/12 md:w-5/12 overflow-y-auto'>
				{
					<div>
						<p className='font-fira'>last: {formatTime(this.state.solveData.lastTime)}</p>
						<p className='font-fira'>best: {formatTime(this.state.solveData.bestTime)}</p>
						<p className='font-fira'>ao5: {formatTime(this.state.solveData.currentAOFive)}</p>
						<p className='font-fira'>ao12: {formatTime(this.state.solveData.currentAOTwelve)}</p>
					</div>
				}
			</div>
		)
	}


	async add(solve : Solve) {
		this.setState({solveData: await this.state.solveData.addSolve(solve, true)});
	}
}