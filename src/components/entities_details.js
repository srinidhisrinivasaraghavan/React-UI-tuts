import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntity,fetchCompanies, fetchRoles,createEntity} from '../actions/index';

import {Link} from 'react-router';

import {reduxForm} from 'redux-form';

class EntityDetails extends Component{
	componentWillMount(){
		this.props.fetchEntity(this.props.params.id);
		this.props.fetchCompanies();
		this.props.fetchRoles();
	}
	static contextTypes ={                                 
		router :React.PropTypes.object //gets this from parent
	};
	onSubmit(props){
		//this.props.EditEntity(props) //this returns the promise from action , when successfull navigate
		//.then(()=>{
			//blog post has been created. Navigate user to index
		//	this.context.router.push('/entities');
		//});
	}
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
		const { fields: {firstName, lastName, address, email, username, companyName, role, skipContract}, handleSubmit} =this.props; //ES6
		//const title = this.props.title //ES5
		if(!this.props.entity){
			return<div>Loading</div>
		}
		return(
			<div className="col-md-12 col-lg-12">
			<h4>Details Legal Entity<Link className='btn-outline-primary btn-sm pull-right' to='/entities'><span className='glyphicon glyphicon-chevron-left' aria-hidden="true"></span>Back</Link></h4>
			<hr />
			<div className="col-md-4">
			<div className="panel panel-default ">
      <div className="panel-heading">Step 1</div>
      <div className="panel-body">
      		<p>Status</p>
      		<p>Date</p>
      		<p>Description</p>
      		</div>
      </div>
    </div>
    <div className=" col-md-4">
    <div className="panel panel-default ">
      <div className="panel-heading">Step 2</div>
      <div className="panel-body"><p>Status</p>
      		<p>Date</p>
      		<p>Description</p></div>
    </div></div>
    <div className=" col-md-4">
    <div className="panel panel-default">
      <div className="panel-heading">Step 3</div>
      <div className="panel-body"><p>Status</p>
      		<p>Date</p>
      		<p>Description</p></div>
    </div></div>
			<div className='col-md-6'>
			<table className='table table-condensed table-bordered'>
				<tbody>
					<tr>
						<th>Account Activated:</th>
						<td>{this.props.entity.accountActivated? 'Yes' :'No'}</td>
					</tr>
					<tr>
						<th>Skipped Email Confirmation:</th>
						<td>{this.props.entity.skipContract ? 'Yes' :'No'}</td>
					</tr>
					<tr>
						<th>Contract Status</th>
						<td>{this.props.entity.contract.status}</td>
					</tr>
					<tr>
						<th>PDF Version Signed</th>
						<td>{this.props.entity.contract.pdfVersion}</td>
					</tr>
				</tbody>
			</table>
			</div>
			<div className='col-md-12'>
			<h4>Edit Legal Entity</h4>
			<hr />
			<form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' :'' }`} >
					<label className="col-md-2 control-label">First Name:</label>
					<div className="col-sm-10 col-md-6">
						<input type='text' className='form-control' placeholder='First Name' value={this.props.entity.firstName}  {...firstName}/>
					</div>
					<div className='text-help'>
						{firstName.touched?firstName.error:''}
					</div>
				</div>
				<div className={`form-group ${lastName.touched && lastName.invalid ? 'has-danger' :'' }`} >
					<label className="col-md-2 control-label">Last Name:</label>
					<div className="col-sm-10 col-md-6">
						<input type='text' className='form-control' placeholder='Last Name' value={this.props.entity.lastName}  {...lastName}/>
					</div>
						<div className='text-help'>
							{lastName.touched?lastName.error:''}
						</div>
				</div>
				<div className={`form-group ${address.touched && address.invalid ? 'has-danger' :'' }`} >
					<label className="col-md-2 control-label">Address:</label>
					<div className="col-sm-10 col-md-6">
					<input type='text' className='form-control' placeholder='Address' value={this.props.entity.address}  {...address}/>
						</div>
						<div className='text-help'>
							{address.touched?address.error:''}
						</div>
				</div>
				<div className={`form-group ${email.touched && email.invalid ? 'has-danger' :'' }`} >
					<label className="col-md-2 control-label">Email:</label>
					<div className="col-sm-10 col-md-6">
					<input type='text' disabled className='form-control' placeholder='Email' value={this.props.entity.email}  {...email}/>
						</div><div className='text-help'>
							{email.touched?email.error:''}
						</div>
				</div>
				<div className={`form-group ${username.touched && username.invalid ? 'has-danger' :'' }`} >
					<label className="col-md-2 control-label">Username:</label>
					<div className="col-sm-10 col-md-6">
					<input type='text' className='form-control' placeholder='Username' value={this.props.entity.username}  {...username}/>
						</div><div className='text-help'>
							{username.touched?username.error:''}
						</div>
				</div>
				<div className={`form-group ${companyName.touched && companyName.invalid ? 'has-danger' :'' }`} >
					 <label className="col-md-2 control-label">Company Name:</label>
					<div className="col-sm-10 col-md-6">
					 <select className='form-control' {...companyName} value={this.props.entity.companyName}>
             			<option>Select Company</option>
              			{this.renderCompanyOptions()}
            		</select>
            		</div><div className='text-help'>
							{companyName.touched?companyName.error:''}
						</div>
				</div>
				<div className={`form-group ${role.touched && role.invalid ? 'has-danger' :'' }`} >
					 <label className="col-md-2 control-label">Role Name:</label>
					<div className="col-sm-10 col-md-6">
					 <select className='form-control' {...role} value={this.props.entity.role}>
             			<option>Select Role</option>
              			{this.renderRoleOptions()}
            		</select>
            		</div><div className='text-help'>
							{role.touched?role.error:''}
					</div>
					<br />
					<br />
					<button type='submit col-md-2' className='btn-outline-primary btn-sm'>Save</button>
				</div>
			</form>
			</div></div>

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