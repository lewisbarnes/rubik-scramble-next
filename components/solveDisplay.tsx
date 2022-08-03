import { NextPageContext } from 'next';
import React from 'react';
import $ from 'jquery';
import { stat } from 'fs';
import type  { Solve } from '../types/solve';
import { Scramble } from './scramble';

interface Props {
	solves: Array<Solve>;
}

interface State {
	currentSolves: Array<Solve>;
	hidden: boolean;
}

export class SolveDisplay extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = { currentSolves: props.solves, hidden: true };
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if(prevProps.solves != this.state.currentSolves) {
			this.setState((state, props) => ({ currentSolves: this.props.solves, hidden: state.hidden }));
		}
	}

	render() {
		return (
			<div className='p-8'>
				<button onClick={this.toggleVisibility.bind(this)} className='font-fira'>{this.state.hidden ? String.fromCharCode(8595) : String.fromCharCode(8593)}</button>
				{this.state.currentSolves.length == 0 ? <p className={`${this.state.hidden ? 'hidden' : 'block'} font-fira`}>No Solves</p> :  this.state.currentSolves.map((solve,i) => {
					return (
								<div key={i} className={ this.state.hidden ? 'hidden ' : 'block ' }>
									<Scramble moves={solve.scramble} canHide={true} />
									<p className='text-white font-fira'>{ this.formatTime(solve.time) }</p>
								</div>
							);
				}
				)}
			</div>
		)
	}

	toggleVisibility() {
		this.setState((state, props) => ({ currentSolves: state.currentSolves, hidden: !state.hidden }));
	}

	formatTime(pMilliseconds : number) {
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}