import { NextPageContext } from 'next';
import React from 'react';
import $ from 'jquery';
import { stat } from 'fs';
import type  { Solve } from '../types/solve';

interface Props {
	moves: Array<string>;
	hidden: boolean;
}

interface State {
}

export class Scramble extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
	}

	render() {
		return (
			<div className='text-center hover:select-all'>
				<p className={ `${this.props.hidden ? 'hidden ' : ''} mb-1 ml-2 font-fira text-base md:text-md`}><span></span>{this.props.moves.map(x => x.padEnd(2, '\xa0')).join(' ')}</p>
			</div>
		);
	}
}