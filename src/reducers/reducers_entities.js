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
       		return { ...state, entity: action.payload.data };
		}
		default:return state;
	}
}