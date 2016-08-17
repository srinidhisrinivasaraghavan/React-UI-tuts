import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {createEntity, fetchCompanies, fetchRoles} from '../actions/index';

class EntitiesNew extends Component{
	componentWillMount(){
		this.props.fetchCompanies();
		this.props.fetchRoles();
	}
	static contextTypes ={                                 
		router :React.PropTypes.object //gets this from parent
	};

	onSubmit(props){
		this.props.createEntity(props) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//blog post has been created. Navigate user to index
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
		const { fields: {firstName, lastName, address, email, username, companyName, role, skipContract}, handleSubmit} =this.props; //ES6
		//const title = this.props.title //ES5
		return(<div className="col-md-12 col-lg-12">
			<h4>Create a new Legal Entity<Link className='btn-outline-primary btn-sm pull-right' to='/entities'><span className='glyphicon glyphicon-chevron-left' aria-hidden="true"></span>Back</Link></h4>
			<hr />
			<form className="col-md-8" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className={`col-md-12 form-group ${firstName.touched && firstName.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='First Name'  {...firstName}/>
						<div className='text-help'>
							{firstName.touched?firstName.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${lastName.touched && lastName.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Last Name'  {...lastName}/>
						<div className='text-help'>
							{lastName.touched?lastName.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${address.touched && address.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Address'  {...address}/>
						<div className='text-help'>
							{address.touched?address.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${email.touched && email.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Email'  {...email}/>
						<div className='text-help'>
							{email.touched?email.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${username.touched && username.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Username'  {...username}/>
						<div className='text-help'>
							{username.touched?username.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${companyName.touched && companyName.invalid ? 'has-danger' :'' }`} >
					 <select className='form-control' {...companyName}>
             			<option>Select Company</option>
              			{this.renderCompanyOptions()}
            		</select>
            		<div className='text-help'>
							{companyName.touched?companyName.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${role.touched && role.invalid ? 'has-danger' :'' }`} >
					 <select className='form-control' {...role}>
             			<option>Select Role</option>
              			{this.renderRoleOptions()}
            		</select>
            		<div className='text-help'>
							{role.touched?role.error:''}
						</div>
				</div>
				<div className={`col-md-12 form-group ${skipContract.touched && skipContract.invalid ? 'has-danger' :'' }`} >
					<input type='checkbox' className=''  {...skipContract}/> <label>Skip Contract</label>
						<br />
						<br />
						<button type='submit col-md-2' className='btn-outline-primary btn-sm'>Create</button>
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

function mapStateToProps(state){
	return {companies :state.companies.all, roles:state.roles.all};
}

//reduxForm(config,mapStateToProps,mapDispatchToProps)
//reduxform injects these config on props
export default reduxForm({
	form :'CompaniesNewForm',
	fields :['firstName', 'lastName', 'address', 'email', 'username', 'companyName', 'role', 'skipContract'],
	validate
},mapStateToProps,{createEntity,fetchCompanies, fetchRoles})(EntitiesNew);