import React from "react";

interface Props {
	children: React.ReactNode;
}
export class ModalComponent extends React.Component<Props> {

	render() {
		return(
			<div className='fixed top-1/2 left-1/2 dark:bg-black'>
				{this.props.children}
			</div>
		)
	}
}