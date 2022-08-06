import React from 'react';

interface Props {
	children: React.ReactNode;
}

class NavMenuComponent extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	render() {
		return(
			<div className='font-fira max-h-full flex flex-col md:flex-row flex-wrap px-28 space-x-2'>
				{this.props.children}
			</div>
		);
	}
}

export default NavMenuComponent;