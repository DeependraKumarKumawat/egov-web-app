import React, {Component} from 'react';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Api from '../../../api/api';
import jp from "jsonpath";
import _ from 'lodash';



class UiAutoComplete extends Component {
	constructor(props) {
       super(props);
			 this.state={
				 dropDownData:[]
			 }
   	}

  initData(props) {
   		let {item, setDropDownData, useTimestamp}=props;
		// console.log(this.props.item);
		if(item.hasOwnProperty("url") && item.url && item.url.search("\\|")>-1 && item.url.search("{")==-1)
		{
			let splitArray=item.url.split("?");
			let context="";
			let id={};
			// id[splitArray[1].split("&")[1].split("=")[0]]=e.target.value;
			for (var j = 0; j < splitArray[0].split("/").length; j++) {
				if(j==(splitArray[0].split("/").length-1)){
						context+=splitArray[0].split("/")[j];
				}else{
					context+=splitArray[0].split("/")[j]+"/";
				}
			}


			let queryStringObject=splitArray[1].split("|")[0].split("&");
			for (var i = 0; i < queryStringObject.length; i++) {
				if (i) {
					id[queryStringObject[i].split("=")[0]]=queryStringObject[i].split("=")[1];
				}
			}

			var response=Api.commonApiPost(context, id, {}, "", useTimestamp || false).then(function(response) {

				if(response) {
					let keys=jp.query(response,splitArray[1].split("|")[1]);
					let values=jp.query(response,splitArray[1].split("|")[2]);
					let dropDownData=[];
					for (var k = 0; k < keys.length; k++) {
							let obj={};
							obj["key"]=keys[k] && keys[k].toString();
							obj["value"]=values[k];
							if (item.hasOwnProperty("isKeyValuePair") && item.isKeyValuePair) {
								obj["value"]=keys[k]+"-"+values[k]
							}
							dropDownData.push(obj);
					}
					setDropDownData(item.jsonPath, dropDownData);
				}
			},function(err) {
					console.log(err);
			});
		}
		else if (item.hasOwnProperty("defaultValue") && typeof(item.defaultValue)=="object") {
			setDropDownData(item.jsonPath,item.defaultValue);
		}
   }

  // componentWillReceiveProps(nextProps, nextState) {
  //  		if(!_.isEqual(nextProps, this.props)) {
  //  			this.initData(nextProps);
  //  		}
  //  	}

	componentDidMount() {
		this.initData(this.props);
	}



	 renderAutoComplete =(item) => {
		let {dropDownData}=this.props;
    const dataSourceConfig = {
        text: 'value',
        value: 'key',
    };

		// console.log(dropDownData.hasOwnProperty(item.jsonpath) && dropDownData[item.jsonpath].replace(".", "\."));
		// console.log(dropDownData);
		// console.log(dropDownData[item.jsonPath] );
		// console.log(dropDownData.hasOwnProperty(item.jsonPath));
		switch (this.props.ui) {
			case 'google':
				// let {dropDownData}=this.state;
				return (
          <div >
          <AutoComplete
          	 floatingLabelStyle={{"color": item.isDisabled ? "#A9A9A9" : "#696969", "fontSize": "20px"}}
			 inputStyle={{"color": "#5F5C57"}}
          	 floatingLabelFixed={true}
             style={{"display": (item.hide ? 'none' : 'inline-block')}}
             errorStyle={{"float":"left"}}
             dataSource={dropDownData.hasOwnProperty(item.jsonPath)?dropDownData[item.jsonPath]:[]}
             dataSourceConfig={dataSourceConfig}
             floatingLabelText={<span>{item.label} <span style={{"color": "#FF0000"}}>{item.isRequired ? " *" : ""}</span></span>} 
             fullWidth={true}
             value={this.props.getVal(item.jsonPath)}
             disabled={item.isDisabled}
             errorText={this.props.fieldErrors[item.jsonPath]}
             onNewRequest={(value,index) =>{
              this.props.handler({target: {value: value.key}}, item.jsonPath, item.isRequired ? true : false, '', item.requiredErrMsg, item.patternErrMsg)
              if(this.props.autoComHandler && item.autoCompleteDependancy) {
              	this.props.autoComHandler(item.autoCompleteDependancy, item.jsonPath)
              }

            }}
           />
        {/*
          <SelectField
   						style={{"display": (item.hide ? 'none' : 'inline-block')}}
   						errorStyle={{"float":"left"}}
   						fullWidth={true}
   						floatingLabelText={item.label + (item.isRequired ? " *" : "")}
   						value={this.props.getVal(item.jsonPath)}
   						onChange={(event, key, value) =>{
   							this.props.handler({target: {value: value}}, item.jsonPath, item.isRequired ? true : false, '', item.requiredErrMsg, item.patternErrMsg)
   						}}
   						disabled={item.isDisabled}
   						errorText={this.props.fieldErrors[item.jsonPath]}
   						maxHeight={200}>
   				            {dropDownData.hasOwnProperty(item.jsonPath) && dropDownData[item.jsonPath].map((dd, index) => (
   				                <MenuItem value={dd.key} key={index} primaryText={dd.value} />
   				            ))}
   		            </SelectField>
          */}
          </div>

				);
		}
	}

	render () {
		return (
	      <div>
	        {this.renderAutoComplete(this.props.item)}
	      </div>
	    );
	}
}

const mapStateToProps = state => ({dropDownData:state.framework.dropDownData});

const mapDispatchToProps = dispatch => ({
  setDropDownData:(fieldName,dropDownData)=>{
    dispatch({type:"SET_DROPDWON_DATA",fieldName,dropDownData})
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(UiAutoComplete);
