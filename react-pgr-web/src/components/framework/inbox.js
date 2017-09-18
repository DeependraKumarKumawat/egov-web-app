import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Table, DropdownButton, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {brown500, red500,white,orange800} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {translate} from '../common/common';
import Api from '../../api/api';

const $ = require('jquery');

var flag = 0;
const styles = {
  errorStyle: {
    color: red500
  },
  underlineStyle: {
   
  },
  underlineFocusStyle: {
  
  },
  floatingLabelStyle: {
    color: "#354f57"
  },
  floatingLabelFocusStyle: {
    color:"#354f57"
  },
  customWidth: {
    width:100
  },
  bold: {
    margin:'15px 0'
  },
   checkbox: {
    marginBottom: 0,
    marginTop:15
  },
  uploadButton: {
   verticalAlign: 'middle',
 },
 uploadInput: {
   cursor: 'pointer',
   position: 'absolute',
   top: 0,
   bottom: 0,
   right: 0,
   left: 0,
   width: '100%',
   opacity: 0,
 },
 floatButtonMargin: {
   marginLeft: 20,
   fontSize:12,
   width:30,
   height:30
 },
 iconFont: {
   fontSize:17,
   cursor:'pointer'
 },
 radioButton: {
    marginBottom:0,
  },
actionWidth: {
  width:160
},
reducePadding: {
  paddingTop:4,
  paddingBottom:0
},
noPadding: {
  paddingBottom:0,
  paddingTop:0
},
noMargin: {
  marginBottom: 0
},
textRight: {
  textAlign:'right'
},
chip: {
  marginTop:4
}
};



function getPosition(objArray, id){
  
  if(id == '' || id == null) {
    return false;
  }

  for(var i = 0; i<objArray.length;i++){
    if(objArray[i].id == id){
      return objArray[i].assignments[0].position;
    }
  }
}


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

const getNameByCode = function(object, code, property = "") { 
  if (code == "" || code == null) {
        return "";
    }
    for (var i = 0; i < object.length; i++) {
        if (property == "") {
            if (object[i].code == code) {
                return object[i].name;
            }
        } else {
            if (object[i].hasOwnProperty(property)) {
                if (object[i].code == code) {
                    return object[i][property];
                }
            } else {
                return "";
            }
        }
    }
    return "";
}

class Workflow extends Component {
  constructor(props) {
       super(props);
       this.state = {
      resultList:[],
      unitType:[{code:"FLAT", name:'Flat'},{code:"ROOM", name:'Room'}],
      floorNumber:[{code:1, name:'Basement-3'},{code:2, name:'Basement-2'},{code:3, name:'Basement-1'},{code:4, name:'Ground Floor'}],
      gaurdianRelation: [{code:'FATHER', name:'Father'}, {code:'HUSBAND', name:'Husband'}, {code:'MOTHER', name:'Mother'}, {code:'OTHERS', name:'Others'} ],
        gender:[{code:'MALE', name:'Male'}, {code:'FEMALE', name:'Female'}, {code:'OTHERS', name:'Others'}],
      ownerType:[{code:'Ex_Service_man', name:'Ex-Service man'}, {code:'Freedom_Fighter', name:'Freedom Fighter'}, {code:'Freedom_fighers_wife', name:"Freedom figher's wife"}],
      propertytypes: [],
      propertysubtypes: [],
      apartments:[],
      departments:[],
      floortypes:[],
      rooftypes:[],
      walltypes:[],
      woodtypes:[],
      structureclasses:[],
      occupancies:[],
      ward:[],
      locality:[],
      zone:[],
      block:[],
      street:[],
      revanue:[],
      election:[],
      usages:[],
      creationReason:[{code:'NEWPROPERTY', name:'New Property'}, {code:'SUBDIVISION', name:'Bifurcation'}],
      demands: [],
      revenueBoundary: [],
      adminBoundary:[],
      locationBoundary:[],
        buttons : [],
        employee : [],
        designation:[],
        workflowDepartment: [],
        process: [],
        forward: false,
          specialNotice: {},
          hasNotice: false,
          taxHeads: [],
       }
      
   }

  componentWillMount() {
    localStorage.setItem('propertyId',  this.props.match.params.searchParam)
  }

  componentDidMount() {
    this.props.initForm();
    var currentThis = this;

    let {setLoadingStatus, toggleSnackbarAndSetText, workflow }=this.props;
        
    setLoadingStatus('loading');

    var query;

    console.log(this.props.match.params)

    if(this.props.match.params.id){
      query = {
        propertyId: this.props.match.params.id
      };
    } 

    
      Api.commonApiPost('pt-property/properties/_search', query,{}, false, true).then((res)=>{   
    setLoadingStatus('hide');
    if(res.hasOwnProperty('Errors')){
      toggleSnackbarAndSetText(true, "Server returned unexpected error. Please contact system administrator.")
    } else {
        var userRequest = JSON.parse(localStorage.getItem("userRequest"));
        if(res.hasOwnProperty('properties') && res.properties.length > 0) {

          var workflowDetails = res.properties[0].propertyDetail.workFlowDetails;
          if(workflowDetails) {
            workflow.workflowDepartment = workflowDetails.department || null;
            workflow.workflowDesignation = workflowDetails.designation || null;
            workflow.approver =workflowDetails.assignee || null;
            workflow.initiatorPosition =workflowDetails.initiatorPosition || null;
          }

          var processQuery = {
              id : res.properties[0].propertyDetail.stateId
            }
    
          Api.commonApiPost('egov-common-workflows/process/_search', processQuery,{}, false, true).then((res)=>{
            currentThis.setState({
              process: res.processInstance
            })    

            var designationsQuery = {
              businessKey:"Create Property",
              departmentRule:'',
              currentStatus:res.processInstance.status,
              amountRule:'',
              additionalRule:'',
              pendingAction:'',
              approvalDepartmentName:'',
              designation:''
            }                        
      
             Api.commonApiPost( 'egov-common-workflows/designations/_search',designationsQuery, {},false, false).then((res)=>{
                
              for(var i=0; i<res.length;i++){
                Api.commonApiPost('hr-masters/designations/_search', {name:res[i].name}).then((response)=>{
                  console.log(response)
                  response.Designation.unshift({id:-1, name:'None'});
                  currentThis.setState({
                      ...currentThis.state,
                      designation: [
                        ...currentThis.state.designation,
                        ...response.Designation
                      ]
                  })
                }).catch((err)=> {
                  currentThis.setState({designation: []})
                  console.log(err)
                })
              }
                      
                }).catch((err)=> {
                  currentThis.setState({
                  designation:[]
                  })
                  console.log(err)
                })
                
              res.processInstance.attributes.validActions.values.map((item)=>{
              if(item.name == 'Forward'){
                currentThis.setState({
                  forward: true
                });
              }
            })
            
            currentThis.setState({
              buttons: res.processInstance
            });
          }).catch((err)=> {
            console.log(res);
            currentThis.setState({
              buttons: []
            });
          })

          if(res.properties[0].boundary.revenueBoundary.id){
            var revenueQuery = {
              "Boundary.id" : res.properties[0].boundary.revenueBoundary.id,
              "Boundary.tenantId" : userRequest.tenantId
            }
            Api.commonApiGet('egov-location/boundarys', revenueQuery).then((res)=>{
              console.log(res);
              currentThis.setState({
                revenueBoundary : res.Boundary[0]
              })
            }).catch((err)=> {
              console.log(err);
            })
          }

          if(res.properties[0].boundary.locationBoundary.id){
            var locationQuery = {
              "Boundary.id" : res.properties[0].boundary.locationBoundary.id,
              "Boundary.tenantId" : userRequest.tenantId
            }

            Api.commonApiGet('egov-location/boundarys', locationQuery).then((res)=>{
              currentThis.setState({
                locationBoundary : res.Boundary[0]
              })
            }).catch((err)=> {
              console.log(err);
            })
          }

          if(res.properties[0].boundary.adminBoundary.id){
            var adminQuery = {
              "Boundary.id" : res.properties[0].boundary.adminBoundary.id,
              "Boundary.tenantId" : userRequest.tenantId
            }

            Api.commonApiGet('egov-location/boundarys', adminQuery).then((res)=>{
              currentThis.setState({
                adminBoundary : res.Boundary[0]
              })
            }).catch((err)=> {
              console.log(err);
            })
          }

          //get propertySubType
          var ptQuery = {
            parent: res.properties[0].propertyDetail.propertyType
          }
          Api.commonApiPost('pt-property/property/propertytypes/_search',ptQuery, {},false, true).then((res)=>{
                currentThis.setState({propertysubtypes:res.propertyTypes})
                console.log('Property Sub Type', res);
            }).catch((err)=> {
                currentThis.setState({
                  propertysubtypes:[]
                })
            }) 
        } 

        var units = [];
        var floors = res.properties[0].propertyDetail.floors;
        
        for(var i = 0; i<floors.length; i++){
          for(var j = 0; j<floors[i].units.length;j++){
            floors[i].units[j].floorNo = floors[i].floorNo;
            units.push(floors[i].units[j])
          }
        }

        res.properties[0].propertyDetail.floors = units;
        
        currentThis.setState({
          resultList: res.properties,
        })
          
        var tQuery = {
        businessService :'PT',
        consumerCode: res.properties[0].upicNumber || res.properties[0].propertyDetail.applicationNo
      }   
  
      Api.commonApiPost('billing-service/demand/_search', tQuery, {}).then((res)=>{
        currentThis.setState({demands : res.Demands})
      }).catch((err)=> {
        currentThis.setState({demands : []})
        console.log(err)
      })    
    }
  
      }).catch((err)=> {
      setLoadingStatus('hide');
      console.log(err)
      currentThis.setState({
          resultList:[]
        })
      })  
      
    Api.commonApiPost('pt-property/property/propertytypes/_search',{}, {},false, true).then((res)=>{
          currentThis.setState({propertytypes:res.propertyTypes})
      }).catch((err)=> {
          currentThis.setState({
            propertytypes:[]
          })
      }) 

    Api.commonApiPost('pt-property/property/departments/_search',{}, {},false, true).then((res)=>{
      currentThis.setState({
      departments:res.departments
      })
    }).catch((err)=> {
      console.log(err)
      console.log(err);
    })
      
    Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"LOCALITY", hierarchyTypeName:"LOCATION"}).then((res)=>{
          currentThis.setState({locality : res.Boundary})
        }).catch((err)=> {
           currentThis.setState({
            locality : []
          })
          console.log(err.message)
        })

        Api.commonApiPost('pt-property/property/apartment/_search',{}, {},false, true).then((res)=>{
          currentThis.setState({apartments:res.apartments})
        }).catch((err)=> {
           currentThis.setState({
            apartments:[]
          })
          console.log(err.message)
        }) 

        Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"ZONE", hierarchyTypeName:"REVENUE"}).then((res)=>{
          currentThis.setState({zone : res.Boundary})
        }).catch((err)=> {
           currentThis.setState({
            zone : []
          })
          console.log(err)
        })

        Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"WARD", hierarchyTypeName:"REVENUE"}).then((res)=>{
          currentThis.setState({ward : res.Boundary})
        }).catch((err)=> {
          currentThis.setState({
            ward : []
          })
          console.log(err)
        })

         Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"BLOCK", hierarchyTypeName:"REVENUE"}).then((res)=>{
          currentThis.setState({block : res.Boundary})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"STREET", hierarchyTypeName:"LOCATION"}).then((res)=>{
          currentThis.setState({street : res.Boundary})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"REVENUE", hierarchyTypeName:"REVENUE"}).then((res)=>{
          currentThis.setState({revanue : res.Boundary})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName', {boundaryTypeName:"WARD", hierarchyTypeName:"ADMINISTRATION"}).then((res)=>{
          currentThis.setState({election : res.Boundary})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('pt-property/property/structureclasses/_search').then((res)=>{
          currentThis.setState({structureclasses: res.structureClasses})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('pt-property/property/occuapancies/_search').then((res)=>{
          currentThis.setState({occupancies : res.occuapancyMasters})
        }).catch((err)=> {
          console.log(err)
        })

        Api.commonApiPost('pt-property/property/usages/_search').then((res)=>{
          currentThis.setState({usages : res.usageMasters})
        }).catch((err)=> {
          console.log(err)
        })

      Api.commonApiPost( 'egov-common-masters/departments/_search').then((res)=>{
          console.log(res);
          res.Department.unshift({id:-1, name:'None'});
          currentThis.setState({workflowDepartment: res.Department})
    }).catch((err)=> {
        currentThis.setState({
          workflowDepartment:[]
        })
        console.log(err)
      })

    var temp = this.state.floorNumber;
    
    for(var i=5;i<=34;i++){
      var label = 'th';
      if((i-4)==1){
        label = 'st';
      } else if ((i-4)==2){
        label = 'nd';
      } else if ((i-4)==3){
        label = 'rd';
      }
      var commonFloors = {
        code:i,
        name:(i-4)+label+" Floor"
      }
      temp.push(commonFloors);
    }             
    
    this.setState({
      floorNumber: temp
    })

}

  componentWillUnmount(){
  
  }


  componentWillUpdate() {

  }

  componentDidUpdate(prevProps, prevState) {
    
  }

 handleWorkFlowChange = (e, type) => {

    let currentThis = this;

    let query = {};

    let hasData = false;

    if(type == 'department' && e.target.value != '' && this.props.workflow.workflowDesignation) {
      console.log(type);
      query = {
        departmentId: e.target.value,
        designationId: this.props.workflow.workflowDesignation
      }
      hasData = true;

    } else if(type == 'designation' && e.target.value != '' && this.props.workflow.workflowDepartment) {
      console.log(type);
      query = {
        departmentId: this.props.workflow.workflowDepartment,
        designationId: e.target.value
      }
          hasData = true;
    } else {
         hasData = false;
    }

    if(hasData){
        Api.commonApiPost( '/hr-employee/employees/_search', query).then((res)=>{
          currentThis.setState({approver: res.Employee})
      }).catch((err)=> {
        currentThis.setState({
          approver:[]
        })
        console.log(err);
      })
    }
  } 

  updateInbox = (actionName, status) => {
            
    var currentThis = this;
    
    let {workflow, setLoadingStatus, toggleSnackbarAndSetText} = this.props;
   
    var data = this.state.resultList;

    setLoadingStatus('loading');
    
    var workFlowDetails = {
          "department": workflow.workflowDepartment || 'department',
          "designation":workflow.workflowDesignation || 'designation',
          "initiatorPosition": workflow.initiatorPosition || null,
          "assignee": null,
          "action": actionName,
          "status": status
        }
        
    if(actionName == 'Forward') {
     
        workFlowDetails.assignee = getPosition(this.state.approver, workflow.approver) || null;
        workFlowDetails.initiatorPosition = this.state.process.initiatorPosition || null;
         localStorage.setItem('inboxStatus', 'Forwarded')
      
    } else if(actionName == 'Approve') {

        workFlowDetails.assignee = this.state.process.initiatorPosition || null
        workFlowDetails.initiatorPosition = this.state.process.initiatorPosition || null;
        localStorage.setItem('inboxStatus', 'Approved')
      
    } else if(actionName == 'Reject') {
      
        workFlowDetails.assignee = this.state.process.initiatorPosition || null
        localStorage.setItem('inboxStatus', 'Rejected')
      
    } else if( actionName == 'Print Notice'){
     
      var body = {
        upicNo: data[0].upicNumber,
          tenantId: localStorage.getItem("tenantId") ? localStorage.getItem("tenantId") : 'default'
        } 

        Api.commonApiPost('pt-property/properties/specialnotice/_generate', {},body, false, true).then((res)=>{

              currentThis.setState({
                  specialNotice: res.notice,
                  hasNotice: true
              })

              var taxHeadsArray = [];  

              if(res.notice.hasOwnProperty('taxDetails') && res.notice.taxDetails.hasOwnProperty('headWiseTaxes')){
                  res.notice.taxDetails.headWiseTaxes.map((item, index)=>{
                      taxHeadsArray.push(item.taxName);
                  })
              }

             taxHeadsArray = taxHeadsArray.filter((item, index, array)=>{
                return index == array.indexOf(item);
             })

             var query = {
                service:'PT',
                code:taxHeadsArray
              }

              Api.commonApiPost('/billing-service/taxheads/_search', query, {}, false, true).then((res)=>{
                 currentThis.setState({
                   taxHeads:res.TaxHeadMasters
                 })
                 setTimeout(()=>{
                  currentThis.generatePDF();
                }, 100)
              }).catch((err)=> {
               currentThis.setState({
                   taxHeads:[]
                 })
              })
        
      }).catch((err)=> {
      currentThis.setState({
          specialNotice: {},
          hasNotice: false
        })
      setLoadingStatus('hide');
      toggleSnackbarAndSetText(true, err.message);
      })
      
      return false;
    }
    
    data[0].owners[0].tenantId = "default";
    data[0].vltUpicNumber = null;
    data[0].gisRefNo = null;
    data[0].oldUpicNumber = null;
    
      data[0].propertyDetail.workFlowDetails = workFlowDetails;
    
      setLoadingStatus('loading');
     
     var body = {
       "properties": data
     } 
    
      Api.commonApiPost('pt-property/properties/_update', {},body, false, true).then((res)=>{
         setLoadingStatus('hide');
         currentThis.props.history.push('/propertyTax/inbox-acknowledgement')
      }).catch((err)=> {
         console.log(err)
         setLoadingStatus('hide');
         toggleSnackbarAndSetText(true, err.message);
      })
  }

  generatePDF = () => {

    let {setLoadingStatus} = this.props;

  var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    var cdn = `
      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <!-- Optional theme -->
      <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">  
      <style>
        td {padding-top:15px !important;padding-bottom:15px !important;border-left:0px !important;border-right:0px !important;border-top:0px !important;border-bottom:0px !important;}
      </style>
      `;
    mywindow.document.write('<html><head><title> </title>');
    mywindow.document.write(cdn);
    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById('specialNotice').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

   setTimeout(function(){
      setLoadingStatus('hide');
      mywindow.print();
      mywindow.close();
    }, 1000);

    return true;
  }

  

  render() {

    const renderOption = function(list,listName="") {
        if(list)
        {
            return list.map((item)=>
            {
                return (<MenuItem key={item.id} value={item.id} primaryText={item.name}/>)
            })
        }
    }
    
   let { resultList } = this.state;
   
   var totalAmount=0;
   var taxCollected = 0;

   let {workflow, fieldErrors, handleChange} = this.props;
   let {handleWorkFlowChange} = this;
   let currentThis = this;
      
   return(
    <div className="Workflow">
    {resultList.length != 0 && resultList.map((item, index)=>{
      
    return (
                    <Grid fluid key={index}>
                          <br/>
              <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.ownerDetails')}</div>} />
                   <CardText>
                  <Col xs={12} md={12}>
                   <Table id="floorDetailsTable" style={{color:"black",fontWeight: "normal", marginBottom:0}} bordered responsive>
                    <thead>
                        <th>#</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.aadhaarNumber')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.phoneNumber')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.ownerName')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.gender')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.email')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.pan')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.guardian')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.primaryOwner')}</th>
                      <th>{translate('pt.create.groups.ownerDetails.fields.percentageOfOwnerShip')}</th>
                    </thead>
                    <tbody>
                       {item.owners.length !=0 && item.owners.map((owner, index)=> {
                          return(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td> {owner.aadhaarNumber ? owner.aadhaarNumber : translate('pt.search.searchProperty.fields.na')}</td>
                            <td> {owner.mobileNumber ? owner.mobileNumber : translate('pt.search.searchProperty.fields.na')}</td>
                            <td>{owner.name ? owner.name : translate('pt.search.searchProperty.fields.na')}</td>
                            <td> {owner.gender ? getNameByCode(currentThis.state.gender, owner.gender) : translate('pt.search.searchProperty.fields.na')}</td>
                            <td>{owner.emailId ? owner.emailId : translate('pt.search.searchProperty.fields.na')}</td>
                            <td>{owner.pan ? owner.pan : translate('pt.search.searchProperty.fields.na')}</td>
                            <td>{owner.fatherOrHusbandName ? owner.fatherOrHusbandName : translate('pt.search.searchProperty.fields.na')}</td>
                            <td>{owner.isPrimaryOwner ? 'Yes' : 'No'}</td>
                            <td>{owner.ownerShipPercentage ? owner.ownerShipPercentage : translate('pt.search.searchProperty.fields.na')}</td>
                          </tr>   
                          )
                        })}                   
                    </tbody>
                   </Table>
                  </Col>  
                 <div className="clearfix"></div>
                               </CardText>
                          </Card>
                          <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.propertyDetails')}</div>} />
                              <CardText>
                  <Col md={12} xs={12}>
                      <Row>
                         {item.channel == 'DATA_ENTRY' && <Col xs={12} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.oldPropertyNo')}</div>
                           {item.oldUpicNumber || translate('pt.search.searchProperty.fields.na')}
                        </Col>}
                        {item.channel == 'DATA_ENTRY' && <Col xs={12} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyNo')}</div>
                           {item.upicNumber || translate('pt.search.searchProperty.fields.na')}
                        </Col>}
                        <Col xs={12} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.propertyType')}</div>
                           {getNameByCode(this.state.propertytypes ,item.propertyDetail.propertyType) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                         <Col xs={4} md={3} style={styles.bold}>
                         <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.extentOfSite')}</div>
                          {item.propertyDetail.sitalArea || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                                         
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.registrationDocNo')}</div>
                          {item.propertyDetail.regdDocNo || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.creationReason')}</div>
                          {getNameByCode(this.state.creationReason, item.creationReason) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.AssessmentNumberOfParentProperty')}</div>
                           {translate('pt.search.searchProperty.fields.na')}
                        </Col>
                       <Col xs={4} md={3} style={styles.bold}>
                            <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.effectiveDate')}</div>
                            {item.occupancyDate ? item.occupancyDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                                       
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.appartment')}</div>
                          {getNameByCode(this.state.apartments, item.propertyDetail.apartment) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.registrationDocDate')}</div>
                          {item.propertyDetail.regdDocDate ? item.propertyDetail.regdDocDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.assessmentDate')}</div>
                          {item.assessmentDate ? item.assessmentDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                      </Row>
                  </Col>
                  <div className="clearfix"></div>
                              </CardText>
                          </Card>
        
              <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.propertyAddress.fields.addressDetails')}</div>} />
                              <CardText>
                
                  <Col md={12} xs={12}>
                    
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.doorNo')}</div>
                           {item.address.addressNumber}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.propertyAddress')}</div>
                            {item.address.addressNumber ? item.address.addressNumber+', ' : '' }
                          {item.address.addressLine1 ? getNameById(this.state.locality,item.address.addressLine1)+', ' : '' }
                          {item.address.addressLine2 ? item.address.addressLine2+', ':''}
                          {item.address.landmark ? item.address.landmark+', ' : ''}
                          {item.address.city ? item.address.city : ''}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.zoneNo')}</div>
                           {this.state.revenueBoundary.name || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.blockNo')}</div>
                           NA
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.electionWard')}</div>
                          {getNameById(this.state.election,item.boundary.adminBoundary.id) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        {false && <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('employee.Employee.fields.correspondenceAddress')}</div>
                           NA
                        </Col>}
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.wardNo')}</div>
                           NA
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.locality')}</div>
                            {getNameById(this.state.locality,item.address.addressLine1) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                      </Row>
                  
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.ebBlock')}</div>
                          NA
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                          <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.pin')}</div>
                            {item.address.pincode}
                        </Col>
                      </Row>
                  </Col>
                  <div className="clearfix"></div>
                              </CardText>
                          </Card>
        
              <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.assessmentDetails')}</div>} />
                              <CardText>
                  <Col md={12} xs={12}>
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.creationReason')}</div>
                           {getNameByCode(this.state.creationReason, item.creationReason)  || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.propertyType')}</div>
                           {getNameByCode(this.state.propertytypes ,item.propertyDetail.propertyType) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.propertySubType')}</div>
                           {getNameByCode(this.state.propertysubtypes ,item.propertyDetail.category) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.usageType')}</div>
                           {getNameByCode(this.state.usages ,item.propertyDetail.usage) || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                         <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.usageSubType')}</div>
                            {translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.extentOfSite')}</div>
                          {item.propertyDetail.sitalArea || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.assessmentDetails.fields.sequenceNo')}</div>
                           {item.sequenceNo || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.floorDetails.fields.buildingPermissionNumber')}</div>
                          {item.propertyDetail.bpaNo || translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.floorDetails.fields.buildingPermissionDate')}</div>
                          {item.propertyDetail.bpaDate ? item.propertyDetail.bpaDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                      </Row>
                     
                  </Col>
                  <div className="clearfix"></div>
                              </CardText>
                          </Card>
              <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.propertyFactors')}</div>} />
                              <CardText>
                  <Col md={12} xs={12}>
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyFactors.fields.toiletFactor')}</div>
                          {item.propertyDetail.hasOwnProperty('factors') ? (item.propertyDetail.factors !=null && item.propertyDetail.factors.length !=0 ? (item.propertyDetail.factors[0].value ||  translate('pt.search.searchProperty.fields.na') ) : translate('pt.search.searchProperty.fields.na') ) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyFactors.fields.roadFactor')}</div>
                          {item.propertyDetail.hasOwnProperty('factors') ? (item.propertyDetail.factors !=null && item.propertyDetail.factors.length !=0 ? (item.propertyDetail.factors[1].value ||  translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na') ) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyFactors.fields.liftFactor')}</div>
                          {item.propertyDetail.hasOwnProperty('factors') ? (item.propertyDetail.factors !=null && item.propertyDetail.factors.length !=0 ? (item.propertyDetail.factors[2].value ||  translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na') ) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyFactors.fields.parkingFactor')}</div>
                          {item.propertyDetail.hasOwnProperty('factors') ? (item.propertyDetail.factors !=null && item.propertyDetail.factors.length !=0 ? (item.propertyDetail.factors[3].value ||  translate('pt.search.searchProperty.fields.na')): translate('pt.search.searchProperty.fields.na') ) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                      </Row>
                  </Col>
                  <div className="clearfix"></div>
                              </CardText>
                          </Card>
              <Card className="uiCard">
                <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.floorDetails')}</div>} />
                <CardText>
                  <Col xs={12} md={12}>
                   <Table id="floorDetailsTable" style={{color:"black",fontWeight: "normal", marginBottom:0}} bordered responsive>
                                          <thead style={{backgroundColor:"#607b84",color:"white"}}>
                                            <tr>
                                              <th>#</th>
                        <th>{translate('pt.create.groups.floorDetails.fields.floorNumber')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.unitType')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.unitNumber')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.constructionClass')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.usageType')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.usageSubType')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.firmName')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.occupancy')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.occupantName')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.annualRent')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.manualArv')}</th>
                        <th>{translate('pt.create.groups.floorDetails.fields.constructionStartDate')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.constructionEndDate')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.effectiveFromDate')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.unstructuredLand')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.length')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.breadth')}</th>
                                              <th>{translate('pt.create.groups.floorDetails.fields.plinthArea')}</th>
                        <th>{translate('pt.create.groups.floorDetails.fields.occupancyCertificateNumber')}</th>
                        <th>{translate('pt.create.groups.propertyAddress.fields.buildingCost')}</th>
                        <th>{translate('pt.create.groups.propertyAddress.fields.landCost')}</th>
                        <th>{translate('pt.create.groups.propertyAddress.fields.carpetArea')}</th>
                        <th>{translate('pt.create.groups.propertyAddress.fields.assessableArea')}</th>
                        <th>{translate('pt.create.groups.propertyAddress.fields.exemptedArea')}</th>
                                              <th>{translate('pt.create.groups.assessmentDetails.fields.isLegal')}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {item.propertyDetail.floors.length !=0  && item.propertyDetail.floors.map(function(i, index){
                                              if(i){
                                                return (<tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{getNameByCode(currentThis.state.floorNumber, (parseInt(i.floorNo)+1)) || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{getNameByCode(currentThis.state.unitType, i.unitType) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{i.unitNo || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{getNameByCode(currentThis.state.structureclasses, i.structure) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{getNameByCode(currentThis.state.usages, i.usage) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{getNameByCode(currentThis.state.usages, i.usageSubType) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{i.firmName || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{getNameByCode(currentThis.state.occupancies,i.occupancyType) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{i.occupierName || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{i.annualRent || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{parseFloat(i.manualArv).toString() || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.constructionStartDate ?  i.constructionStartDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na') }</td>
                                                    <td>{i.constCompletionDate ? i.constCompletionDate.split(' ')[0] : translate('pt.search.searchProperty.fields.na') }</td>
                                                    <td>{i.occupancyDate ? i.occupancyDate.split(' ')[0]  : translate('pt.search.searchProperty.fields.na') }</td>
                                                    <td>{(i.isStructured == true ? 'Yes' : i.isStructured)|| translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{parseFloat(i.length) || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{parseFloat(i.width) || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.builtupArea || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.occupancyCertiNumber || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.buildingCost || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.landCost || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.carpetArea || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.assessableArea || translate('pt.search.searchProperty.fields.na')}</td>
                          <td>{i.exemptionArea || translate('pt.search.searchProperty.fields.na')}</td>
                                                    <td>{i.isAuthorised ? 'Yes' : 'No'}</td>  
                                                  </tr>) 
                                                }
                                            })}
                                          </tbody>
                                          </Table>
                      </Col>
                      <div className="clearfix"></div>
                              </CardText>
                          </Card>
                          {item.channel == 'DATA_ENTRY' &&
                <Card className="uiCard">
                  <CardHeader style={{paddingBottom:0}}  title={<div style={styles.headerStyle}>{translate('pt.create.groups.constructionDetails')}</div>} />
                                <CardText>
                    <Col md={12} xs={12}>
                      <Row>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.currentAssessmentDate')}</div>
                          {(item.propertyDetail.hasOwnProperty('assessmentDates') && item.propertyDetail.assessmentDates !=null) ? (item.propertyDetail.assessmentDates[1] != undefined ? (item.propertyDetail.assessmentDates[1].date || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na'))  : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.firstAssessmentDate')}</div>
                          {(item.propertyDetail.hasOwnProperty('assessmentDates') && item.propertyDetail.assessmentDates !=null)  ? (item.propertyDetail.assessmentDates[0] != undefined ? (item.propertyDetail.assessmentDates[0].date || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}                     
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.revisedAssessmentDate')}</div>
                           {(item.propertyDetail.hasOwnProperty('assessmentDates') && item.propertyDetail.assessmentDates !=null)  ? (item.propertyDetail.assessmentDates[2] != undefined ? (item.propertyDetail.assessmentDates[2].date || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na'))  : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.propertyAddress.fields.lastAssessmentDate')}</div>
                           {(item.propertyDetail.hasOwnProperty('assessmentDates') && item.propertyDetail.assessmentDates !=null)  ? (item.propertyDetail.assessmentDates[3] != undefined ? (item.propertyDetail.assessmentDates[3].date || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.certificateNumber')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.certificateNumber || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.certificateCompletionDate')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.certificateCompletionDate || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.certificateReceivedDate')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.certificateReceiveDate || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.agencyName')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.agencyName || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.licenseType')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.licenseType || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                        <Col xs={4} md={3} style={styles.bold}>
                           <div style={{fontWeight:500}}>{translate('pt.create.groups.constructionDetails.fields.licenseNumber')}</div>
                           {(item.propertyDetail.hasOwnProperty('builderDetails') && item.propertyDetail.builderDetails !=null) ? (item.propertyDetail.builderDetails.licenseNumber || translate('pt.search.searchProperty.fields.na')) : translate('pt.search.searchProperty.fields.na')}
                        </Col>
                      </Row> 
                    </Col>
                    <div className="clearfix"></div>
                                </CardText>
                            </Card>
                           }
                           {(this.state.buttons.hasOwnProperty('attributes') && (this.state.buttons.attributes.validActions.values.length > 0) && this.state.forward) &&  <Card className="uiCard">
                    <CardHeader style={styles.reducePadding}  title={<div style={{color:"#354f57", fontSize:18,margin:'8px 0'}}>Workflow</div>} />
                    <CardText style={styles.reducePadding}>
                                <Grid fluid>
                                    <Row>
                                        <Col xs={12} md={3} sm={6}>
                                              <SelectField  className="fullWidth selectOption"
                                                  floatingLabelText={<span>{translate('pt.create.groups.workflow.departmentName')}<span style={{"color": "#FF0000"}}> *</span></span>}
                                                  errorText={fieldErrors.workflowDepartment ? <span style={{position:"absolute", bottom:-41}}>{fieldErrors.workflowDepartment}</span>: ""}
                                                  value={workflow.workflowDepartment ? workflow.workflowDepartment :""}
                                                  onChange={(event, index, value) => {
                          (value == -1) ? value = '' : '';  
                                                    var e = {
                                                      target: {
                                                        value: value
                                                      }
                                                    };
                                                    handleWorkFlowChange(e, 'department');
                                                    handleChange(e, "workflowDepartment", true, "")}}
                                                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                                  underlineStyle={styles.underlineStyle}
                                                  underlineFocusStyle={styles.underlineFocusStyle}
                                                  floatingLabelStyle={{color:"rgba(0,0,0,0.5)"}}
                                                  >
                                                    {renderOption(this.state.workflowDepartment)}
                                              </SelectField>
                                        </Col>
                                        <Col xs={12} md={3} sm={6}>
                                              <SelectField  className="fullWidth selectOption"
                          floatingLabelText={<span>{translate('pt.create.groups.workflow.designationName')}<span style={{"color": "#FF0000"}}> *</span></span>}
                                                  errorText={fieldErrors.workflowDesignation ? <span style={{position:"absolute", bottom:-41}}>{fieldErrors.workflowDesignation}</span>: ""}
                                                  value={workflow.workflowDesignation ? workflow.workflowDesignation :""}
                                                  onChange={(event, index, value) => {
                            (value == -1) ? value = '' : '';
                                                    var e = {
                                                      target: {
                                                        value: value
                                                      }
                                                    };
                                                    handleWorkFlowChange(e, 'designation');
                                                    handleChange(e, "workflowDesignation", true, "")}}
                                                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                                  underlineStyle={styles.underlineStyle}
                                                  underlineFocusStyle={styles.underlineFocusStyle}
                                                  floatingLabelStyle={{color:"rgba(0,0,0,0.5)"}}
                                                  >
                                                   {renderOption(this.state.designation)}
                                              </SelectField>
                                        </Col>
                                        <Col xs={12} md={3} sm={6}>
                                              <SelectField  className="fullWidth selectOption"
                                                  floatingLabelText={<span>{translate('pt.create.groups.workflow.approverName')}<span style={{"color": "#FF0000"}}> *</span></span>}
                                                  errorText={fieldErrors.approver ? <span style={{position:"absolute", bottom:-41}}>{fieldErrors.approver}</span>: ""}
                                                  value={workflow.approver ? workflow.approver : ""}
                                                  onChange={(event, index, value) => {
                            (value == -1) ? value = '' : '';
                                                    var e = {
                                                      target: {
                                                        value: value
                                                      }
                                                    };
                                                    handleChange(e, "approver", true, "")}}
                                                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                                  underlineStyle={styles.underlineStyle}
                                                  underlineFocusStyle={styles.underlineFocusStyle}
                                                  floatingLabelStyle={{color:"rgba(0,0,0,0.5)"}}
                                                  >
                                                    {renderOption(this.state.approver)}
                                              </SelectField>
                                        </Col>
                                        <Col xs={12} md={3} sm={6}>
                                              <TextField  className="fullWidth"
                                                  floatingLabelText={translate('pt.create.groups.workflow.comment')}
                                                  errorText={fieldErrors.comments ? <span style={{position:"absolute", bottom:-13}}>{fieldErrors.comments}</span>: ""}
                                                  value={workflow.comments ? workflow.comments : ""}
                                                  onChange={(e) => {
                                                    handleChange(e, "comments", false, "")}}
                                                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                                  underlineStyle={styles.underlineStyle}
                                                  underlineFocusStyle={styles.underlineFocusStyle}
                                                  floatingLabelStyle={{color:"rgba(0,0,0,0.5)"}}
                                                  />     
                                        </Col>
                                    </Row>
                                </Grid>
                    </CardText>
        </Card> }
        <div style={{textAlign:'center'}}>
          {(this.state.buttons.hasOwnProperty('attributes') && this.state.buttons.attributes.validActions.values.length > 0) && this.state.buttons.attributes.validActions.values.map((item,index)=> {
          return(
            <RaisedButton key={index} type="button" primary={true} label={item.name} style={{margin:'0 5px'}} onClick={()=> {
              this.updateInbox(item.name, currentThis.state.buttons.status);
            }}/>
          )
        })}
        </div>
               
    </Grid>)
            })}
           
        </div>)
  }
}

const mapStateToProps = state => ({
   workflow:state.form.form,
     fieldErrors: state.frameworkForm.fieldErrors
});

const mapDispatchToProps = dispatch => ({
  initForm: () => {
    dispatch({
      type: "RESET_STATE",
      validationData: {
        required: {
          current: [],
          required: ['approver', 'workflowDesignation', 'workflowDepartment']
        },
        pattern: {
          current: [],
          required: []
        }
      }
    });
  },
   handleChange: (e, property, isRequired, pattern) => {
    dispatch({type: "HANDLE_CHANGE", property, value: e.target.value, isRequired, pattern});
  },
  
  setLoadingStatus: (loadingStatus) => {
     dispatch({type: "SET_LOADING_STATUS", loadingStatus});
   },
   toggleSnackbarAndSetText: (snackbarState, toastMsg) => {
     dispatch({type: "TOGGLE_SNACKBAR_AND_SET_TEXT", snackbarState, toastMsg});
   }
  
 });

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
