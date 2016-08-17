import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoles} from '../actions/index';
import { Link } from 'react-router';

class RolesIndex extends Component{
	componentWillMount(){
		this.props.fetchRoles();
	}
	renderRoles(){

		return(
			this.props.roles.map ((role)=>{
				return(
					<tr key={role._id}>
						<td>
							{role.roleName}
						</td>
					</tr>
				);
			}
		));
	}
	render(){
			if(!this.props.roles){
				return<div>Loading</div>
			}
		return (
			//TODO: Need to display posts
		<div className="col-md-12 col-lg-12">
			<h4>Roles
				<Link to="rolesnew" className="pull-right btn btn-sm btn-outline-primary">
					Add a role <span className='glyphicon glyphicon-plus-sign' aria-hidden="true"></span>
				</Link>
			</h4>
			<hr />
			<table className ='table table-bordered'>
				<thead>
					<tr>
						<th>Role Name</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRoles()}
				</tbody>
			</table>
		</div>
		);
	}
} 

//state from reducer
function mapStateToProps(state){
	console.log("state",state.roles.all);
	return {roles :state.roles.all};
}

//dispatch from action creater
function mapDispatchToProps(dispatch){
	//console.log('fetchPost',fetchPosts);
	return bindActionCreators({fetchRoles:fetchRoles},dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(RolesIndex);

//export default connect(mapStateToProps,{fetchPosts})(PostsIndex); //ES6