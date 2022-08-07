import React from 'react';

interface Props {
	children: React.ReactNode;
}

class ToastContainer extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
	}

	render() {
		return(
			<div className='absolute inset-4 max-h-fit max-w-fit p-4'>
				{this.props.children}
			</div>
		);
	}
}

export default ToastContainer;