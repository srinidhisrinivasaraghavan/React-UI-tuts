import {FETCH_ROLES,CREATE_ROLE} from '../actions/index';

const INITIAL_STATE={allRoles:[]};

export default function(state =INITIAL_STATE,action){
	switch(action.type){
		case FETCH_ROLES:{
       		return { ...state, allRoles: action.payload.data.result };
		}
		case CREATE_ROLE:{
       		return { ...state, allRoles: action.payload.data.result };
		}
		default:return state;
	}
}