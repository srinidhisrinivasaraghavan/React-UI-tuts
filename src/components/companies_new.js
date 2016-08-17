import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {createCompany} from '../actions/index';

class CompaniesNew extends Component{
	static contextTypes ={
		router :React.PropTypes.object //gets this from parent
	};

	onSubmit(props){
		this.props.createCompany(props) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//blog post has been created. Navigate user to index
			this.context.router.push('/companies');
		});
	}
	render(){
		const { fields: {companyName}, handleSubmit} =this.props; //ES6
		//const title = this.props.title //ES5
		return(<div className="col-md-12 col-lg-12">
			<h4>Create a new company<Link className='btn-outline-primary btn-sm pull-right' to='/companies'><span className='glyphicon glyphicon-chevron-left' aria-hidden="true"></span>Back</Link></h4>
			<hr />
			<form className="col-md-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className={`col-md-12 form-group ${companyName.touched && companyName.invalid ? 'has-danger' :'' }`} >
					<input type='text' className='form-control' placeholder='Company Name'  {...companyName}/>
					<div className='text-help'>
						{companyName.touched?companyName.error:''}
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
	if(!values.companyName){
		errors.companyName="Enter a name";
	}
	return errors;
}

//reduxForm(config,mapStateToProps,mapDispatchToProps)
//reduxform injects these config on props
export default reduxForm({
	form :'CompaniesNewForm',
	fields :['companyName'],
	validate
},null,{createCompany})(CompaniesNew);