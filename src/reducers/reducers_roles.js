import {FETCH_ROLES,CREATE_ROLE} from '../actions/index';

const INITIAL_STATE={all:[]};

export default function(state =INITIAL_STATE,action){
	switch(action.type){
		case FETCH_ROLES:{
       		return { ...state, all: action.payload.data.result };
		}
		case CREATE_ROLE:{
       		return { ...state, all: action.payload.data.result };
		}
		default:return state;
	}
}