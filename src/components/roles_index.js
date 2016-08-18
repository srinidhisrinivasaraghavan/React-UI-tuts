import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoles} from '../actions/index';
import Header from './header';
import Row from './table_row';

class RolesIndex extends Component{
	componentWillMount(){
		this.props.fetchRoles();
	}
	renderRoles(){

		return(
			this.props.roles.map ((role)=>{
				return(
					<Row key={role._id} value={role.roleName} />
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
			<Header heading='List of Roles' linkTo='roles/new' buttonGlyph='glyphicon glyphicon-plus-sign' buttonText='Add a role'/>
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