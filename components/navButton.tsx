import React from 'react';

interface Props {
	label: string;
	active: boolean;
	callback: Function;
}

export class NavButton extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {

	}
	
	componentDidUpdate(prevProps: Props) {

	}

	render() {
		return(
			<li>
				<button className={`${this.props.active ? 'dark:bg-white bg-black text-white dark:text-black' : 'text-black dark:text-white bg-white dark:bg-black hover:text-yellow-500'} p-2 rounded-md`} onClick={this.props.callback.bind(this)}>{this.props.label}</button>
			</li>
		);
	}
}