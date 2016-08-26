import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchCompanies} from '../actions/index';
import Header from './header';
import Row from './table_row';
import TableRow from './table_row_cols';

class CompaniesIndex extends Component{
	componentWillMount(){
		this.props.fetchCompanies();
	}
	renderCompanies(){
		return(
			this.props.companies.map ((company)=>{
				return(
					<TableRow key={company._id} th={company.companyName} td={company.address} />
				);
			}
		));
	}
	render(){
			if(!this.props.companies){
				return<div>Loading</div>
			}
			return (
				<div className="col-md-12 col-lg-12"> 
					<Header heading='List of companies' linkTo='companies/new' buttonGlyph='glyphicon glyphicon-plus-sign' buttonText='Add a company'/>
					<table className ='table table-bordered'>
						<thead>
							<tr>
								<th>Company Name</th>
								<th>Address</th>
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
	return {companies :state.companies.all};
}

//dispatch from action creater
function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchCompanies:fetchCompanies},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CompaniesIndex);