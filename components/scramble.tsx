import { NextPageContext } from 'next';
import React from 'react';
import $ from 'jquery';
import { stat } from 'fs';
import type  { Solve } from '../types/solve';

interface Props {
	canHide: boolean;
	moves: Array<string>;
}

interface State {
	hidden: boolean
}

export class Scramble extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
		this.state = {
			hidden: props.canHide
		}
	}

	render() {
		return (
			<div className='text-center'>
				{this.props.canHide ? <button onClick={this.toggleVisibility.bind(this)} className='font-fira'>{this.state.hidden ? String.fromCharCode(8594) : String.fromCharCode(8592)}</button> : ''}
				<p className={ this.state.hidden ? 'hidden ' : 'inline-block ' + 'ml-4 font-fira text-base md:text-md'}>{this.props.moves.map(x => x.padEnd(2, '\xa0')).join(' ')}</p>
			</div>
		);
	}

	toggleVisibility() {
		this.setState((state, props) => ({ hidden: !state.hidden}));
	}
}