import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCompanies} from '../actions/index';
import { Link } from 'react-router';

class CompaniesIndex extends Component{
	componentWillMount(){
		this.props.fetchCompanies();
	}
	renderCompanies(){
		return(
			this.props.companies.map ((company)=>{
				return(
					<tr key={company._id}>
						<td>
							{company.companyName}
						</td>
					</tr>
				);
			}
		));
	}
	render(){
			if(!this.props.companies){
				return<div>Loading</div>
			}
		return (
			//TODO: Need to display posts
		<div className="col-md-12 col-lg-12"> 
			<h4>List of companies
				<Link to="companiesnew" className="pull-right btn btn-sm btn-outline-primary">
					Add a company <span className='glyphicon glyphicon-plus-sign' aria-hidden="true"></span>
				</Link>
			</h4>
			<hr />
			<table className ='table table-bordered'>
				<thead>
					<tr>
						<th>Company Name</th>
					</tr>
				</thead>
				<tbody>
					{this.renderCompanies()}
				</tbody>
			</table>
		</div>
		);
	}
} 

//state from reducer
function mapStateToProps(state){
	console.log("state",state.companies.all);
	return {companies :state.companies.all};
}

//dispatch from action creater
function mapDispatchToProps(dispatch){
	//console.log('fetchPost',fetchPosts);
	return bindActionCreators({fetchCompanies:fetchCompanies},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(CompaniesIndex);

//export default connect(mapStateToProps,{fetchPosts})(PostsIndex); //ES6