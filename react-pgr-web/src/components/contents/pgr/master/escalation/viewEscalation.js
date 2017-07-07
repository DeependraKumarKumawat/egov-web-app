import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, DropdownButton, Table ,ListGroup, ListGroupItem} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {brown500, red500,white,orange800} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DataTable from '../../../../common/Table';
import Api from '../../../../../api/api';


const $ = require('jquery');
$.DataTable = require('datatables.net');
const dt = require('datatables.net-bs');

const buttons = require('datatables.net-buttons-bs');

require('datatables.net-buttons/js/buttons.colVis.js'); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js'); // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js'); // Flash file export
require('datatables.net-buttons/js/buttons.print.js'); // Print view button

var flag = 0;
const styles = {
  headerStyle : {
    color: 'rgb(90, 62, 27)',
    fontSize : 19
  },
  marginStyle:{
    margin: '15px'
  },
  paddingStyle:{
    padding: '15px'
  },
  errorStyle: {
    color: red500
  },
  underlineStyle: {
    borderColor: brown500
  },
  underlineFocusStyle: {
    borderColor: brown500
  },
  floatingLabelStyle: {
    color: brown500
  },
  floatingLabelFocusStyle: {
    color: brown500
  },
  customWidth: {
    width:100
  },
  checkbox: {
    marginTop: 37
  }
};


const getNameById = function(object, id, property = "") {
  if (id == "" || id == null) {
        return "";
    }
    for (var i = 0; i < object.length; i++) {
        if (property == "") {
            if (object[i].id == id) {
                return object[i].name;
            }
        } else {
            if (object[i].hasOwnProperty(property)) {
                if (object[i].id == id) {
                    return object[i][property];
                }
            } else {
                return "";
            }
        }
    }
    return "";
}

const getNameByServiceCode = function(object, serviceCode, property = "") {
  if (serviceCode == "" || serviceCode == null) {
        return "";
    }
    for (var i = 0; i < object.length; i++) {
        if (property == "") {
            if (object[i].serviceCode == serviceCode) {
                return object[i].serviceName;
            }
        } else {
            if (object[i].hasOwnProperty(property)) {
                if (object[i].serviceCode == serviceCode) {
                    return object[i][property];
                }
            } else {
                return "";
            }
        }
    }
    return "";
}

class ViewEscalation extends Component {
    constructor(props) {
      super(props)
      this.state = {
              positionSource:[],
              grievanceTypeSource:[],
              positionDataSourceConfig : {
                text: 'name',
                value: 'id',
              },
              serviceDataSourceConfig: {
                text: 'serviceName',
                value: 'id',
              },
              isSearchClicked: false,
              searchResult: [],
            };
    }

    componentWillMount() {
      let{initForm} = this.props;
      initForm()

       
       $('#searchTable').DataTable({
             dom: 'lBfrtip',
             buttons: [],
              bDestroy: true,
              language: {
                 "emptyTable": "No Records"
              }
        });

    }

    componentDidMount() {
      let self = this;
      Api.commonApiPost("/hr-masters/positions/_search").then(function(response) {
        console.log(response);
          self.setState({
            positionSource: response.Position
          })
      }, function(err) {
        self.setState({
            positionSource: []
          })
      });

      Api.commonApiPost("/pgr/services/v1/_search", {type: "all"}).then(function(response) {
          console.log(response);
          self.setState({
            grievanceTypeSource: response.complaintTypes
          })
      }, function(err) {
        self.setState({
            grievanceTypeSource: []
          })
      });

    }

   componentDidUpdate() {
       $('#searchTable').DataTable({
         dom: 'lBfrtip',
         buttons: [],
          bDestroy: true,
          language: {
             "emptyTable": "No Records"
          }
     });
  }


    componentWillUnmount(){
       $('#searchTable')
       .DataTable()
       .destroy(true);
    }

  submitForm = (e) => {

      let{setLoadingStatus} = this.props;
      setLoadingStatus('loading');
    
      e.preventDefault();

       let self = this;

    let searchSetFrom = {
		  fromPosition: this.props.viewEscalation.position,
		  serviceCode:this.props.viewEscalation.grievanceType
	  };
	  
	   let searchSetTo = {
		  toPosition: this.props.viewEscalation.position,
		  serviceCode:this.props.viewEscalation.grievanceType
	  };

       Api.commonApiPost("/pgr-master/escalation-hierarchy/v1/_search", searchSetFrom).then(function(response) {
		   setLoadingStatus('hide');
			flag = 1;
			for(let i=0; i<response.escalationHierarchies.length;i++){
				   self.setState({
						searchResult: [
							...self.state.searchResult,
							response.escalationHierarchies[i]
						],
						isSearchClicked: true
					  });
			}
      
        }, function(err) {
            console.log(err);
        });
		
		Api.commonApiPost("/pgr-master/escalation-hierarchy/v1/_search", searchSetTo).then(function(response) {
      setLoadingStatus('hide');
			flag = 1;
			for(let i=0; i<response.escalationHierarchies.length;i++){
				   self.setState({
						searchResult: [
							...self.state.searchResult,
							response.escalationHierarchies[i]
						],
						isSearchClicked: true
					  });
			}
		  }, function(err) {
            console.log(err);
        });
   
  }

    render() {
		
		let self = this;
		
		console.log(this.state.searchResult);

      let {
        isFormValid,
        viewEscalation,
        fieldErrors,
        handleChange,
        handleAutoCompleteKeyUp
      } = this.props;

      let {submitForm} = this;

      let {isSearchClicked, searchResult} = this.state;

      const renderBody = function() {
      	  if(searchResult && searchResult.length)
      		return searchResult.map(function(val, i) {
      			return (
      				<tr key={i}>
      					<td>{getNameByServiceCode(self.state.grievanceTypeSource, val.serviceCode)}</td>
      					<td>{getNameById(self.state.positionSource, val.fromPosition)}</td>
      					<td>{getNameById(self.state.positionSource, val.toPosition)}</td>
      				</tr>
      			)
      		})
      }

      const viewTable = function() {
      	  if(isSearchClicked)
      		return (
   	        <Card>
   	          <CardHeader title={<strong style = {{color:"#5a3e1b"}} > Search Result </strong>}/>
   	          <CardText>
   		        <Table id="searchTable" style={{color:"black",fontWeight: "normal"}} bordered responsive>
   		         <thead style={{backgroundColor:"#f2851f",color:"white"}}>
   		            <tr>
                    <th>Grievance Type</th>
                    <th>From Position</th>
                    <th>To Position</th>
   		            </tr>
   		          </thead>
   		          <tbody>
   		          	{renderBody()}
   		          </tbody>
   		        </Table>
   		       </CardText>
   		    </Card>
   		)
      }

      return(<div className="viewEscalation">
      <form autoComplete="off" onSubmit={(e) => {submitForm(e)}}>
          <Card  style={styles.marginStyle}>
              <CardHeader style={{paddingBottom:0}} title={< div style = {styles.headerStyle} > Search Escalation < /div>} />
              <CardText>
                  <Card>
                      <CardText>
                          <Grid>
                              <Row>
                                  <Col xs={12} md={6}>
                                        <AutoComplete
                                          hintText="Grievance Type"
                                          fullWidth={true}
                                          filter={function filter(searchText, key) {
                                                    return key.toLowerCase().includes(searchText.toLowerCase());
                                                 }}
                                          dataSource={this.state.grievanceTypeSource}
                                          dataSourceConfig={this.state.serviceDataSourceConfig}
                                          onKeyUp={(e) => {handleAutoCompleteKeyUp(e, "grievanceType")}}
                                          value={viewEscalation.grievanceType ? viewEscalation.grievanceType : ""}
                                          onNewRequest={(chosenRequest, index) => {
                  	                        var e = {
                  	                          target: {
                  	                            value: chosenRequest.serviceCode
                  	                          }
                  	                        };
                  	                        handleChange(e, "grievanceType", true, "");
                  	                       }}
                                        />
                                  </Col>
                                  <Col xs={12} md={6}>
                                        <AutoComplete
                                          hintText="Position"
                                          fullWidth={true}
                                          filter={function filter(searchText, key) {
                                                    return key.toLowerCase().includes(searchText.toLowerCase());
                                                 }}
                                          dataSource={this.state.positionSource}
                                          dataSourceConfig={this.state.positionDataSourceConfig}
                                          onKeyUp={(e) => {handleAutoCompleteKeyUp(e, "position")}}
                                          value={viewEscalation.position ? viewEscalation.position : ""}
                                          onNewRequest={(chosenRequest, index) => {
                  	                        var e = {
                  	                          target: {
                  	                            value: chosenRequest.id
                  	                          }
                  	                        };
                  	                        handleChange(e, "position", true, "");
                  	                       }}
                                        />
                                  </Col>
                              </Row>
                          </Grid>
                      </CardText>
                  </Card>
                  <div style={{textAlign:'center'}}>

                      <RaisedButton style={{margin:'15px 5px'}} type="submit" disabled={!isFormValid} label="Search" primary={true}/>

                  </div>
                  {viewTable()}
              </CardText>
          </Card>
          </form>
      </div>)
    }
}


const mapStateToProps = state => {
  return ({viewEscalation : state.form.form, fieldErrors: state.form.fieldErrors, isFormValid: state.form.isFormValid});
}

const mapDispatchToProps = dispatch => ({
  initForm: () => {
    dispatch({
      type: "RESET_STATE",
      validationData: {
        required: {
          current: [],
          required: ["position", "grievanceType"]
        },
        pattern: {
          current: [],
          required: []
        }
      }
    });
  },

  handleChange: (e, property, isRequired, pattern) => {
    console.log("handlechange"+e+property+isRequired+pattern);
    dispatch({
      type: "HANDLE_CHANGE",
      property,
      value: e.target.value,
      isRequired,
      pattern
    });
  },

  handleAutoCompleteKeyUp : (e, type) => {
    dispatch({
      type: "HANDLE_CHANGE",
      property: type,
      value: e.target.value,
      isRequired : true,
      pattern: ''
    });
  },

   setLoadingStatus: (loadingStatus) => {
      dispatch({type: "SET_LOADING_STATUS", loadingStatus});
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ViewEscalation);
