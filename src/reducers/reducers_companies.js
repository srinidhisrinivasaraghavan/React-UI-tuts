import {FETCH_COMPANIES,CREATE_COMPANY} from '../actions/index';

const INITIAL_STATE={all:[]};

export default function(state =INITIAL_STATE,action){
	switch(action.type){
		case FETCH_COMPANIES:{
       		return { ...state, all: action.payload.data.result };
		}
		case CREATE_COMPANY:{
       		return { ...state, all: action.payload.data.result };
		}
		default:return state;
	}
}