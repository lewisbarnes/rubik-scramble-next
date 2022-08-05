import React from 'react';

interface Props {
	moves: string;
	hidden: boolean;
}

interface State {
}

export class ScrambleComponent extends React.Component<Props, State> {
	constructor(props: Props, state: State) {
		super(props);
	}

	render() {
		return (
			<div className='text-center hover:select-all'>
				<p className={ `${this.props.hidden ? 'hidden ' : ''} mb-1 ml-2 font-fira text-base dark:text-white md:text-md whitespace-pre-wrap`}>{this.props.moves.split(' ').map(x => x.padEnd(3, ' '))}</p>
			</div>
		);
	}
}