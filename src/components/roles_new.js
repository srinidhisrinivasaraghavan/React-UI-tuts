import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {createRole} from '../actions/index';

class RolesNew extends Component{
	static contextTypes ={
		router :React.PropTypes.object //gets this from parent
	};

	onSubmit(props){
		this.props.createRole(props) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//blog post has been created. Navigate user to index
			this.context.router.push('/roles');
		});
	}
	render(){
		const { fields: {roleName}, handleSubmit} =this.props; //ES6
		//const title = this.props.title //ES5
		return(<div className="col-md-12 col-lg-12">
			<h4>Create a new role<Link className='btn-outline-primary btn-sm pull-right' to='/roles'><span className='glyphicon glyphicon-chevron-left' aria-hidden="true"></span>Back</Link></h4>
			<hr />
			<form className="col-md-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className={`col-md-12 form-group ${roleName.touched && roleName.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Role Name'  {...roleName}/>
					<div className='text-help'>
						{roleName.touched?roleName.error:''}
					</div>
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
	if(!values.roleName){
		errors.roleName="Enter a name";
	}
	return errors;
}

//reduxForm(config,mapStateToProps,mapDispatchToProps)
//reduxform injects these config on props
export default reduxForm({
	form :'RolesNewForm',
	fields :['roleName'],
	validate
},null,{createRole})(RolesNew);