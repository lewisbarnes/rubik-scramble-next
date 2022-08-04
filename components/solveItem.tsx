import { NextPageContext } from 'next';
import React from 'react';
import type  { Solve } from '../types/solve';
import { Scramble } from './scramble';

interface Props {
	hidden: boolean;
	solve: Solve;
}

interface State {
	isCollapsed: boolean;
}



export class SolveItem extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = { isCollapsed: true };
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
	}

	render() {
		return (
				<div className={`${this.props.hidden ? 'hidden' : ''}`}>
					<button className={`font-fira hover:text-yellow-500 transition-all`} onClick={this.toggleCollapsed.bind(this)}>{ `${this.formatTime(this.props.solve.time)} ${this.state.isCollapsed ? String.fromCharCode(8594) : String.fromCharCode(8592)}`  }</button><Scramble moves={this.props.solve.scramble} hidden={this.state.isCollapsed}/>
				</div>
		)
	}

	toggleCollapsed() {
		this.setState((state, props) => ({ isCollapsed: !state.isCollapsed }));
	}

	formatTime(pMilliseconds : number) {
		let timeString: string = '';
		timeString += Math.floor(((pMilliseconds / 1000) / 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) / 60)).toString().padStart(2,'0')}:` : '';
		timeString +=  Math.floor(((pMilliseconds / 1000) % 60)) >= 1 ? `${Math.floor(((pMilliseconds / 1000) % 60)).toString().padStart(2,'0')}.` : '00.';
		timeString += `${Math.floor((pMilliseconds % 1000)).toString().padStart(3,'0')}`;
		return timeString;
	}
}