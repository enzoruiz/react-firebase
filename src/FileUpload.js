import React from 'react'

export default class FileUpload extends React.Component {
	

	render() {
		return (
			<div>
				<input type="file" onChange={this.props.onUpload} />
				<br/>
			</div>
		)
	}
}