import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {fetchEntity,fetchCompanies, fetchRoles,editEntity} from '../actions/index';
import Panel from './steps_panel';
import Header from './header';

class EntityEdit extends Component{
	componentWillMount(){
		this.props.fetchEntity(this.props.params.id);
		this.props.fetchCompanies().then(()=>{this.props.fetchRoles();});
	}
	static contextTypes ={                                 
		router :React.PropTypes.object //gets this from parent
	};
	onSubmit(props){
		console.log(props);
		this.props.editEntity(props,this.props.params.id) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//entity has been edited. Navigate user to index
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
		if(!this.props.entity){
			return<div>Loading</div>
		}
        const { fields: {firstName, lastName, address, email, username, companyName, role}, handleSubmit} =this.props; //ES6
		return(
                <div className="col-md-12 col-lg-12">
                <Header heading='Edit Legal Entity' linkTo='/entities' buttonGlyph='glyphicon glyphicon-chevron-left' buttonText='Back'/>
                <div className='col-md-12'>
                <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">First Name:</label>
                        <div className="col-sm-10 col-md-6">
                            <input type='text' className='form-control' placeholder='First Name' {...firstName}/>
                        </div>
                        <div className='text-help'>
                            {firstName.touched?firstName.error:''}
                        </div>
                    </div>
            
                    <div className={`form-group ${lastName.touched && lastName.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Last Name:</label>
                        <div className="col-sm-10 col-md-6">
                            <input type='text' className='form-control' placeholder='Last Name' {...lastName}/>
                        </div>
                        <div className='text-help'>
                            {lastName.touched?lastName.error:''}
                        </div>
                    </div>
            
                    <div className={`form-group ${address.touched && address.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Address:</label>
                        <div className="col-sm-10 col-md-6">
                            <input type='text' className='form-control' placeholder='Address' {...address}/>
                        </div>
                        <div className='text-help'>
                            {address.touched?address.error:''}
                        </div>
                    </div>
            
                    <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Email:</label>
                        <div className="col-sm-10 col-md-6">
                            <input type='text' className='form-control' placeholder='Email' {...email}/>
                        </div>
                        <div className='text-help'>
                            {email.touched?email.error:''}
                        </div>
                    </div>
            
                    <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Username:</label>
                        <div className="col-sm-10 col-md-6">
                            <input type='text' className='form-control' placeholder='Username' {...username}/>
                        </div>
                        <div className='text-help'>
                            {username.touched?username.error:''}
                        </div>
                    </div>
            
                    <div className={`form-group ${companyName.touched && companyName.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Company Name:</label>
                        <div className="col-sm-10 col-md-6">
                            <select className='form-control' {...companyName} >
                                <option>Select Company</option>
                                {this.renderCompanyOptions()}
                            </select>
                        </div>
                        <div className='text-help'>
                            {companyName.touched?companyName.error:''}
                        </div>
                     </div>
            
                    <div className={`form-group ${role.touched && role.invalid ? 'has-danger' : '' }`}>
                        <label className="col-md-2 control-label">Role Name:</label>
                        <div className="col-sm-10 col-md-6">
                            <select className='form-control' {...role} >
                                <option>Select Role</option>
                                {this.renderRoleOptions()}
                            </select>
                        </div>
                        <div className='text-help'>
                            {role.touched?role.error:''}
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className='col-md-offset-2'>
                            <button type='submit' className='btn-outline-primary btn-sm'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
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
	return {entity:state.entities.entity, companies :state.companies.all, roles:state.roles.allRoles, initialValues: state.entities.entity};
}


export default reduxForm({
	form :'CompaniesEditForm',
	fields :['firstName', 'lastName', 'address', 'email', 'username', 'companyName', 'role'],
    validate
},mapStateToProps,{editEntity,fetchCompanies, fetchRoles,fetchEntity})(EntityEdit);