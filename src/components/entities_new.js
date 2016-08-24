import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import axios from 'axios';
import validator from 'validator';
import { Link } from 'react-router';

import {createEntity, fetchCompanies, fetchRoles,emailExists} from '../actions/index';
import Header from './header';

class EntitiesNew extends Component{
	 constructor(props){
        super(props); // prints out whatever is inside props
    }

	componentWillMount(){
		this.props.fetchCompanies().then(()=>{this.props.fetchRoles();});
		
	}
	static contextTypes ={                                 
		router :React.PropTypes.object //gets this from parent
	};
	onSubmit(props){
		this.props.createEntity(props) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//entity has been created. Navigate user to index
			this.context.router.push('/entities');
		});
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
		const { asyncValidating, fields:   {firstName, lastName, address, email, username, companyName, role, skipContract}, handleSubmit} =this.props;
		return(
			<div className="col-md-12 col-lg-12">
				<Header heading='Create a new Legal Entity' linkTo='/entities' buttonGlyph='glyphicon glyphicon-chevron-left' buttonText='Back'/>
				<form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className={`col-md-12 form-group ${firstName.touched && firstName.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">First Name:</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='First Name'  {...firstName}/>
						</div>
						<div className='text-help'>
							{firstName.touched?firstName.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${lastName.touched && lastName.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Last Name:</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Last Name'  {...lastName}/>
						</div>
						<div className='text-help'>
							{lastName.touched?lastName.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${address.touched && address.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Address:</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Address'  {...address}/>
						</div>
						<div className='text-help'>
							{address.touched?address.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${email.touched && email.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Email:</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Email' {...email}/>
							{asyncValidating === 'email' && <i /* spinning cog *//>}
						</div>
						<div className='text-help'>
							{email.touched ? email.error === 'Enter email' ? email.error : email.error === undefined ? '' :  <Link to={"entities/" + email.error} className='btn-outline-primary btn-sm'>
								This Email Id is taken. View Entity
							</Link> : ''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${username.touched && username.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Username:</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Username'  {...username}/>
						</div>
						<div className='text-help'>
							{username.touched?username.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${companyName.touched && companyName.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Company Name:</label>
                        <div className="col-sm-10 col-md-6">
					 		<select className='form-control' {...companyName}>
             					<option>Select Company</option>
              					{this.renderCompanyOptions()}
            				</select>
            			</div>
            			<div className='text-help'>
							{companyName.touched?companyName.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${role.touched && role.invalid ? 'has-danger' :'' }`} >
						<label className="col-md-2 control-label">Role:</label>
                        <div className="col-sm-10 col-md-6">
						 	<select className='form-control' {...role}>
             					<option>Select Role</option>
              					{this.renderRoleOptions()}
            				</select>
            			</div>
            			<div className='text-help'>
							{role.touched?role.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${skipContract.touched && skipContract.invalid ? 'has-danger' :'' }`} >
                        <div className="col-sm-10 col-md-offset-2 col-md-6">
							<input type='checkbox' className=''  {...skipContract}/> <label>Skip Contract</label>
						</div>
						<br />
						<br />
						<div className='col-md-offset-2 col-md-1'>
							<button type='submit' className='btn-outline-primary btn-sm'>Create</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

//If errors object has a key that matches any input, then that field is invalid, Therefore the form is also invalid
function validate(values){
	const errors={};
	if(!values.firstName){
		errors.firstName="Enter first name";
	}
	if(!values.lastName){
		errors.lastName="Enter second name";
	}
	if(!values.address){
		errors.address="Enter address";
	}
	if(!values.email){
		errors.email="Enter email";
	}
	else if(!(validator.isEmail(values.email)))
	{
		errors.email="Enter a valid email";
	}
	if(!values.username){
		errors.username="Enter username";
	}
	if(values.companyName==='Select Company'){
		errors.companyName="Enter company name";
	}
	if(values.role==='Select Role'){
		errors.role="Enter role";
	}
	return errors;
}


var asyncValidate = function(values /*, dispatch */)  {
	return new Promise((resolve, reject) => {
		var  response= emailExists(values.email);
		response.payload.then((res)=>{
			console.log(res);
      		if (res.data.result.isExist==true) {
        		reject({ email:  ''+res.data.result.docId })
     		}
     		else {
        		resolve();
      		}
  		});
	});
}

function mapStateToProps(state){
	//console.log(state.entities.isExist);
	return {companies :state.companies.all, roles:state.roles.allRoles , Exists:state.entities.isExist };
}
//reduxForm(config,mapStateToProps,mapDispatchToProps)
//reduxform injects these config on props
export default reduxForm({
	form :'CompaniesNewForm',
	fields :['firstName', 'lastName', 'address', 'email', 'username', 'companyName', 'role', 'skipContract'],
	asyncValidate,
  	asyncBlurFields: [ 'email' ],
	validate
	},
	mapStateToProps,{createEntity,fetchCompanies, fetchRoles, emailExists})(EntitiesNew);