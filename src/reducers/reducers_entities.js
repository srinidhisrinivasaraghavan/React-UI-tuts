import {FETCH_ENTITIES,CREATE_ENTITY,FETCH_ENTITY} from '../actions/index';

const INITIAL_STATE={all:[], entity:null};

export default function(state =INITIAL_STATE,action){
	switch(action.type){
		case FETCH_ENTITIES:{
       		return { ...state, all: action.payload.data.result };
		}
		case CREATE_ENTITY:{
       		return { ...state, all: action.payload.data.result };
		}
		case FETCH_ENTITY:{
			var entityUI = action.payload.data;
			entityUI.firstName = action.payload.data.contract.firstName;
			entityUI.lastName = action.payload.data.contract.lastName;	
			entityUI.companyName = action.payload.data.contract.companyName;
			entityUI.email = action.payload.data.contract.email;
       		return { ...state, entity: entityUI };
		}
		default:return state;
	}
}