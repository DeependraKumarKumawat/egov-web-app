import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class UiNumberField extends Component {
	constructor(props) {
       super(props);
   	}

	renderNumberBox = (item) => {
		switch (this.props.ui) {
			case 'google': 
				return (
					<TextField 
						fullWidth={true} 
						type="number"
						floatingLabelText={item.label + (item.isRequired ? " *" : "")} 
						value={eval(item.jsonpath)}
						disabled={item.isDisabled}
						errorText={this.props.fieldErrors[eval(item.jsonpath)]}
						onChange={(e) => this.props.handler(e, eval(item.jsonpath), item.isRequired ? true : false, '', item.requiredErrMsg, item.patternErrMsg)} />
				);
		}
	}

	render () {
		return (
	      <div>
	        {this.renderNumberBox(this.props.item)}
	      </div>
	    );
	}
}