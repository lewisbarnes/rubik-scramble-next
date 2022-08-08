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
			<div className='hover:select-all whitespace-pre-wrap text-center md:text-start'>
				<div className={ `${this.props.hidden ? 'hidden ' : ''} font-fira text-base dark:text-white md:text-md mb-2`}>{(this.props.moves.split(' ').map(x => x.padEnd(3, ' ')).join('').trimEnd())}</div>
			</div>
		);
	}
}