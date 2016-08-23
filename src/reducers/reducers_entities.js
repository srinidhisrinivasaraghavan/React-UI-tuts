import {FETCH_ENTITIES,CREATE_ENTITY,FETCH_ENTITY, EMAIL_EXISTS} from '../actions/index';

const INITIAL_STATE={all:[], entity:null, isExist:{isExist:false}};

export default function(state =INITIAL_STATE,action){
	switch(action.type){
		case FETCH_ENTITIES:{
       		return { ...state, all: action.payload.data.result };
		}
		case CREATE_ENTITY:{
       		return { ...state, all: action.payload.data.result };
		}
		case FETCH_ENTITY:{
			var result = action.payload.data.result;
			var entityUI = action.payload.data.result;
			entityUI.firstName = result.contract.firstName;
			entityUI.lastName = result.contract.lastName;	
			entityUI.companyName = result.contract.companyName;
			entityUI.email = result.contract.email;
       		return { ...state, entity: entityUI };
		}
		case EMAIL_EXISTS:{
			var result ={isExist :action.payload.data }
			return {...state ,isExist :result};
		}
		console.log('default');
		default:return state;
	}
}