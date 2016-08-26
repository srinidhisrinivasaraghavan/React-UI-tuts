import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import omit from 'lodash/omit';

import {createCompany,companyNameExists} from '../actions/index';
import Header from './header';

class CompaniesNew extends Component{
	static contextTypes ={
		router :React.PropTypes.object //gets this from parent
	};

	onSubmit(props){
		console.log('submit');
		this.props.createCompany(props) //this returns the promise from action , when successfull navigate
		.then(()=>{
			//company has been created. Navigate user to index
			this.context.router.push('/companies');
		});
	}
	render(){
		const { asyncValidating, fields: {companyName, address}, handleSubmit} =this.props;
		return(
			<div className="col-md-12 col-lg-12">
				<Header heading='Add new Company' linkTo='/companies' buttonGlyph='glyphicon glyphicon-chevron-left' buttonText='Back'/>
				<form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className={`col-md-12 form-group ${companyName.touched && companyName.invalid ? 'has-danger' :'' }`} >
                        <label className="col-md-2 control-label">Company Name*</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Company Name'  {...companyName}/>
							{asyncValidating === 'companyName' && <i /* spinning cog *//>}
						</div>
						<div className='text-help col-md-4'>
							{companyName.touched?companyName.error:''}
						</div>
					</div>
					<div className={`col-md-12 form-group ${address.touched && address.invalid ? 'has-danger' :'' }`} >
                        <label className="col-md-2 control-label">Address*</label>
                        <div className="col-sm-10 col-md-6">
							<input type='text' className='form-control' placeholder='Address'  {...address}/>
						</div>
						<div className='text-help col-md-4'>
							{address.touched?address.error:''}
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
	if(!values.companyName){
		errors.companyName="Enter a name";
	}
	if(!values.address){
		errors.address="Enter address";
	}
	return errors;
}
var asyncValidate = function(values /*, dispatch*/ )  {
	return new Promise((resolve, reject) => {
		var  response= companyNameExists(values.companyName);
		response.payload.then((res)=>{
      		if (res.data.result==true) {
        		reject({ companyName: 'Company name exists!' })
     		}
     		else {
        		resolve();
      		}
  		});
	});
}

//reduxForm(config,mapStateToProps,mapDispatchToProps)
//reduxform injects these config on props
export default reduxForm({
	form :'CompaniesNewForm',
	fields :['companyName', 'address'],
	asyncValidate,
  	asyncBlurFields: [ 'companyName' ],
	validate
},null,{createCompany,companyNameExists})(CompaniesNew);