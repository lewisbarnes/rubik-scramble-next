import React from 'react';

interface Props {
	children: React.ReactNode;
}

export class NavMenu extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {

	}
	
	componentDidUpdate(prevProps: Props) {

	}

	render() {
		return(
			<ul className='flex justify-between text-center m-4 font-fira'>
				{this.props.children}
			</ul>
		);
	}
}