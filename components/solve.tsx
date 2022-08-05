import { NextPageContext } from 'next';
import React from 'react';
import { Solve } from '../models/solve'
import { ScrambleComponent } from './scramble';

interface Props {
	hidden: boolean;
	solve: Solve;
}

interface State {
	isCollapsed: boolean;
}



export class SolveComponent extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = { isCollapsed: true };
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
	}

	render() {
		return (
				<div className={`${this.props.hidden ? 'hidden' : ''}`}>
					<button className={`font-fira hover:text-yellow-500 transition-all`} onClick={this.toggleCollapsed.bind(this)}>
						{ `${this.props.solve.getFormattedTime()} ${this.state.isCollapsed ? String.fromCharCode(8594) : String.fromCharCode(8592)}`  }
					</button><ScrambleComponent moves={this.props.solve.scramble} hidden={this.state.isCollapsed}/>
				</div>
		)
	}

	toggleCollapsed() {
		this.setState((state, props) => ({ isCollapsed: !state.isCollapsed }));
	}

	formatTime(pMilliseconds : number) {

	}
}