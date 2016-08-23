import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';

import {fetchEntites, sendEmail, contractSigned} from '../actions/index';
import Header from './header';

class EntitesIndex extends Component{
	static contextTypes ={
		router :React.PropTypes.object //gets this from parent
	};
	componentWillMount(){
		this.props.fetchEntites();
	}
	renderEntities(){
		return(
			this.props.entities.map ((entity)=>{
				return(
					<tr key={entity._id}>
						<td>
							<Link to={"/entities/edit/"+entity._id}>
								<span className='glyphicon glyphicon-edit' aria-hidden="true"></span>
							</Link>
						</td>
						<td>
							<Link to={"entities/"+entity._id} >
								<span className='glyphicon glyphicon-file' aria-hidden="true"></span>
							</Link>
						</td>
						<td>
							{entity.contract.firstName}
						</td>
						<td>
							{entity.contract.companyName}
						</td>
						<td>
							{entity.role}
						</td>
						<td className={`${entity.contract.status==='SENT_PENDING' ? 'warning' :entity.contract.status==='SENT_SIGNED' ? 'success' :'danger' }`}>
							{entity.contract.status}
						</td>
						<td>
							<button 
								className={`btn btn-sm ${entity.contract.status==='SENT_PENDING' ? 'btn-outline-warning' :entity.contract.status==='SENT_SIGNED' ? 'disabled' :'btn-outline-success' }`}
								onClick={(e) => {
												if(e.target.className.indexOf('disabled') == -1){ 
													this.props.sendEmail(entity._id).then(()=>{
																	this.props.fetchEntites();
										}); }}
									}
								>
								{`${entity.contract.status==='SENT_PENDING' ? 'Resend Email' :'Send Email' }`}  
							</button>
						</td>
						<td>
							<button 
								className={`btn btn-sm ${entity.contract.status==='SENT_SIGNED' ? 'disabled' :'btn-outline-info' }`}
								onClick={(e) => {
												if(e.target.className.indexOf('disabled') == -1){
													this.props.contractSigned(entity._id).then(()=>
													{
														this.props.fetchEntites();
													});
												 }}
										}
								>
								Contract Signed Manually
							</button>
						</td>
					</tr>
				);
			}
		));
	}
	render(){
			if(!this.props.entities){
				return<div>Loading</div>
			}
		return (
				<div className="col-md-12 col-lg-12">
				<Header heading='Legal Entites and Status' linkTo='entities/new' buttonGlyph='glyphicon glyphicon-plus-sign' buttonText='Add a Legal Entity'/>
					<table className ='table table-bordered'>
						<thead>
							<tr>
								<th>Edit</th>
								<th>More</th>
								<th>Name</th>
								<th>Company</th>
								<th>Role</th>
								<th>Contract Status</th>
								<th>Send Email </th>
								<th>Contract Signed Manually</th>
							</tr>
						</thead>
						<tbody>
							{this.renderEntities()}
						</tbody>
					</table>
				</div>
		);
	}
} 

//state from reducer
function mapStateToProps(state){
	return {entities :state.entities.all};
}

//dispatch from action creater
function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchEntites:fetchEntites, sendEmail:sendEmail, contractSigned:contractSigned},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(EntitesIndex);