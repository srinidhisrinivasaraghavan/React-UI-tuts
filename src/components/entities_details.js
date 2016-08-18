import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {fetchEntity,fetchCompanies, fetchRoles,createEntity} from '../actions/index';
import Panel from './steps_panel';
import TableRow from './table_row_cols';
import Header from './header';
import {NOT_SENT,SENT_PENDING,SENT_SIGNED,CREATED,CONTRACT_NOT_EMAILED,CONTRACT_EMAILED,CONTRACT_NOT_SIGNED,CONTRACT_SIGNED} from '../config/constants';

class EntityDetails extends Component{
	componentWillMount(){
		this.props.fetchEntity(this.props.params.id);
		this.props.fetchCompanies();
		this.props.fetchRoles();
	}
	static contextTypes ={                                 
		router :React.PropTypes.object //gets this from parent
	};
	renderCompanyOptions(){
		if(!this.props.companies){
			return(<option></option>);
		}
		return(this.props.companies.map ((company)=>{
				return(<option key={company._id} value={company.companyName}>{company.companyName}</option>);
		}));
	}
	renderRoleOptions(){
		if(!this.props.roles){
			return(<option></option>);
		}
		return(this.props.roles.map ((role)=>{
				return(<option key={role._id} value={role.roleName}>{role.roleName}</option>);
		}));
	}
	render(){
		const { fields: {firstName, lastName, address, email, username, companyName, role, skipContract}, handleSubmit} =this.props; 
		if(!this.props.entity){
			return<div>Loading</div>
		}
		return(
			<div className="col-md-12 col-lg-12">
			<Header heading='Details Legal Entity' linkTo='/entities' buttonGlyph='glyphicon glyphicon-chevron-left' buttonText='Back'/>
			<Panel
				statusTag ='Account ' 
				status={CREATED}
				date={this.props.entity.contract.dateCreated} 
				title="The entity has been created. Email to confirm account and sign contract is not sent" 
				step='Step1: Account Creation  ' 
				panelType='panel-success'
				isDoneGlyph='glyphicon glyphicon-ok'/
			>

			<Panel 
				status={`${this.props.entity.contract.status===NOT_SENT ? CONTRACT_NOT_EMAILED: CONTRACT_EMAILED }`}
				date={this.props.entity.contract.dateSent} 
				title="Email has been send. Entity has to accept the contract and confirm." 
				step='Step2: Send Contract  ' 
				panelType={`${this.props.entity.contract.status==='NOT_SENT' ? 'panel-danger' :'panel-success' }`}
				isDoneGlyph={`${this.props.entity.contract.status==='NOT_SENT' ? 'glyphicon glyphicon-remove' :'glyphicon glyphicon-ok' }`}/
			>
			
			<Panel 
				status={`${this.props.entity.contract.status===NOT_SENT ? CONTRACT_NOT_EMAILED  : this.props.entity.contract.status===SENT_PENDING ? CONTRACT_NOT_SIGNED : CONTRACT_SIGNED }`} 
				date={this.props.entity.contract.dateConfirmed} 
				title="Entity has signed and confirmed the contract" 
				step='Step3: Contract Signed   ' 
				panelType={`${this.props.entity.contract.status==='SENT_SIGNED' ? 'panel-success' :'panel-danger' }`}
				isDoneGlyph={`${this.props.entity.contract.status==='SENT_SIGNED' ? 'glyphicon glyphicon-ok' :'glyphicon glyphicon-remove' }`}/
			>

			<div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
				<table className='table table-condensed table-bordered'>
					<tbody>
						<TableRow th='First Name:' td={this.props.entity.firstName} />
						<TableRow th='Last Name:' td={this.props.entity.lastName} />
						<TableRow th='Address:' td={this.props.entity.address} />
						<TableRow th='Email:' td={this.props.entity.email} />
						<TableRow th='UserName:' td={this.props.entity.username} />
						<TableRow th='Account Activated:' td={this.props.entity.accountActivated? 'Yes' :'No'} />
					</tbody>
				</table>
			</div>

			<div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
			<table className='table table-condensed table-bordered'>
				<tbody>
					<TableRow th='Company:' td={this.props.entity.companyName} />
					<TableRow th='Role:' td={this.props.entity.role} />
					<TableRow th='Skipped Email Confirmation:' td={this.props.entity.skipContract ? 'Yes' :'No'} />
					<TableRow th='Contract Status' td={this.props.entity.contract.status} />
					<TableRow th='PDF Version Signed' td={this.props.entity.contract.pdfVersion} />
				</tbody>
			</table>
			</div>
			</div>

		);
	}	
	}
function mapStateToProps(state){
	return {entity:state.entities.entity,companies :state.companies.all, roles:state.roles.all};
}
export default reduxForm({
	form :'CompaniesNewForm',
	fields :['firstName', 'lastName', 'address', 'email', 'username', 'companyName', 'role', 'skipContract']
},mapStateToProps,{createEntity,fetchCompanies, fetchRoles,fetchEntity})(EntityDetails);