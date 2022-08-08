import React from 'react';
import type  { Solve } from '../models/solve';
import { SolveCollection } from '../models/solveCollection';
import RubikAPI from '../utils/rubikAPI';
import { formatTime, averageTime } from '../utils/time';

interface State {
	solveData: SolveCollection;
}

interface Props {
	footprint: string;
	data: Array<Solve>;
}

export class SolveTable extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = {solveData:  new SolveCollection(this.props.data)};
	}
	render() {
		return (
				<div className='table overflow-auto max-w-full'>
					<div className="table-header-group">
						<div className='table-row'>
							<div className='table-cell px-4 text-right'>solve</div>
							<div className='table-cell px-4 text-right'>time</div>
							<div className='table-cell px-4 text-right'>ao5</div>
							<div className='table-cell px-4 text-right'>ao12</div>
						</div>
					</div>

					{
						this.state.solveData.solves.length > 0 ? this.state.solveData.solves.map((x,i) => {
							return (
							<div key={i.toString()} className='table-row'>
								<div className='table-cell px-4 text-right'>{this.state.solveData.solves.length-i}</div>
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{x.getFormattedTime()}</div>
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{x.getFormattedAO5()}</div>
								<div className='table-cell px-4 whitespace-pre-wrap text-right'>{x.getFormattedAO12()}</div>

							</div>);
						}) : ''
					}
				</div>
		)
	}
}